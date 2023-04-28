from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.RegisterView.as_view(), name='auth_register'),
    path('get_level/', views.GetLevelView.as_view(), name='get_level'),
    path('set_level/', views.SetLevelView.as_view(), name='set_level'),
    path('get_score/', views.GetScoreView.as_view(), name='get_score'),
    path('set_score/', views.SetScoreView.as_view(), name='set_score'),
    path('dashboard/', views.DashboardView, name='dashboard'),
]
