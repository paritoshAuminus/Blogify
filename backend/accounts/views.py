from django.shortcuts import render
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404

# [POST] - request(username, email, passowrd) - response(id, username, email)
@api_view(['POST'])
@permission_classes([AllowAny])
def registerview(request):
    username = request.data.get('username')
    email= request.data.get('email')
    password = request.data.get('password')


    if not username or not email or not password:
        return Response({'message: Username, email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already in use.'}, status=status.HTTP_401_UNAUTHORIZED)

    user = User.objects.create_user(
        username=username,  
        email=email, 
        password=password
    )

    return Response({'message': 'User registered successfully.', 'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_201_CREATED)

# [GET] - request(headers: `Bearer ${token}`) - response(username, email)
@api_view(['GET'])
def getUser(request):
    user = request.user
    return Response({'username': user.username, 'email': user.email}, status=status.HTTP_200_OK)
