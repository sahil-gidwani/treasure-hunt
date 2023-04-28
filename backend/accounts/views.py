from .serializer import MyTokenObtainPairSerializer, RegisterSerializer, LevelSerializer, ScoreSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import CustomUser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


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
