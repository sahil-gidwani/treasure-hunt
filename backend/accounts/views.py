from .serializer import MyTokenObtainPairSerializer, RegisterSerializer, LevelSerializer, ScoreSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import CustomUser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import pandas as pd
import plotly
import plotly.graph_objects as go
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class GetLevelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = LevelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SetLevelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        level = request.data.get('current_level')
        serializer = LevelSerializer(user, data={'current_level': level})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetScoreView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        score_serializer = ScoreSerializer(request.user)
        return Response(score_serializer.data)


class SetScoreView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        score = request.data.get('current_score')
        user = request.user
        if score > user.high_score:
            user.high_score = score
        user.current_score = score
        user.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET', ])
def DashboardView(request):
    users = CustomUser.objects.all().values()
    df = pd.DataFrame.from_records(users)

    # Compute average high score and total number of users
    avg_high_score = df['high_score'].mean()
    total_users = len(df)

    top_users = df.sort_values(by='high_score', ascending=False).head(
        10).reset_index(drop=True)

    # Compute age groups
    df['age_group'] = pd.cut(df['age'], bins=[0, 18, 25, 35, 50, 100],
                             labels=['0-18', '19-25', '26-35', '36-50', '50+'])

    # Compute counts by gender and age group
    gender_counts = df['gender'].value_counts()
    age_group_counts = df['age_group'].value_counts()

    # Create pie chart of gender distribution
    gender_pie_chart = go.Pie(labels=list(gender_counts.keys()),
                              values=list(gender_counts.values),
                              hole=.4)
    gender_pie_layout = go.Layout(title="Distribution of Gender")
    gender_pie_fig = go.Figure(
        data=[gender_pie_chart], layout=gender_pie_layout)
    gender_pie_fig_JSON = plotly.io.to_json(gender_pie_fig)

    # Create pie chart of age group distribution
    age_group_pie_chart = go.Pie(labels=list(age_group_counts.keys()),
                                 values=list(age_group_counts.values),
                                 hole=.4)
    age_group_pie_layout = go.Layout(title="Distribution of Age Groups")
    age_group_pie_fig = go.Figure(
        data=[age_group_pie_chart], layout=age_group_pie_layout)
    age_group_pie_fig_JSON = plotly.io.to_json(age_group_pie_fig)

    # Compute average high score by gender
    gender_scores = {}
    for _, row in df.iterrows():
        gender = row['gender']
        high_score = row['high_score']
        if gender not in gender_scores:
            gender_scores[gender] = [high_score]
        else:
            gender_scores[gender].append(high_score)
    gender_averages = {gender: sum(scores)/len(scores)
                       for gender, scores in gender_scores.items()}

    # Create bar chart
    bar_chart = go.Bar(x=list(gender_averages.keys()),
                       y=list(gender_averages.values()))
    bar_layout = go.Layout(title="Average High Score by Gender",
                           xaxis_title="Gender",
                           yaxis_title="Average High Score")
    bar_fig = go.Figure(data=[bar_chart], layout=bar_layout)
    bar_fig_JSON = plotly.io.to_json(bar_fig)

    # Create scatter plot of age and high score
    scatter_chart = go.Scatter(x=df['age'], y=df['high_score'],
                               mode='markers')
    scatter_layout = go.Layout(title="High Score vs Age",
                               xaxis_title="Age",
                               yaxis_title="High Score")
    scatter_fig = go.Figure(data=[scatter_chart], layout=scatter_layout)
    scatter_fig_JSON = plotly.io.to_json(scatter_fig)

    # Create heatmap
    heatmap_data = df[['age', 'high_score', 'gender']].copy()
    heatmap_data['gender'] = pd.Categorical(heatmap_data['gender']).codes
    heatmap_corr = heatmap_data.corr()
    heatmap = go.Heatmap(z=heatmap_corr.values,
                         x=heatmap_corr.columns,
                         y=heatmap_corr.columns,
                         colorscale='Viridis')
    heatmap_layout = go.Layout(
        title="Correlation between Age, Gender, and High Score")
    heatmap_fig = go.Figure(data=[heatmap], layout=heatmap_layout)
    heatmap_fig_JSON = plotly.io.to_json(heatmap_fig)

    content = {
        "avg_high_score": round(avg_high_score, 2),
        "total_users": total_users,
        "top_users": top_users.to_json(orient="records"),
        "gender_pie_fig": gender_pie_fig_JSON,
        "age_group_pie_fig": age_group_pie_fig_JSON,
        "bar_fig": bar_fig_JSON,
        "scatter_fig": scatter_fig_JSON,
        "heatmap_fig": heatmap_fig_JSON
    }
    return Response(content)
