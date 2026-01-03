from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # public
    path('login/', TokenObtainPairView.as_view(), name='access'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('register/', views.registerview, name='register'),
    # authorized
    path('getuser/', views.getUser, name='getUser'),
    path('update_profile/<int:pk>/', views.update_user)
]
