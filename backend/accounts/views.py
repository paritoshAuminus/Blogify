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
    requestemail= request.data.get('email')
    password = request.data.get('password')

    print('Email recieved', requestemail)
    if not username or not requestemail or not password:
        return Response({'message: Username, email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=requestemail).exists():
        return Response({'message': 'Email already in use.'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        username=username,  
        email=requestemail, 
        password=password
    )

    return Response({'message': 'User registered successfully.', 'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_201_CREATED)

# [GET] - request(headers: `Bearer ${token}`) - response(username, email)
@api_view(['GET'])
def getUser(request):
    user = request.user
    return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_200_OK)

# [POST] - request (body{username or email}) - response ({updated user})
@api_view(['POST'])
def update_user(request, pk):
    user = get_object_or_404(User, id=pk)

    if (request.user != user):
        return Response({'message': 'Forbidden! You are not allowed to update this user'}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(instance=user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({'id': user.id, 'username': user.username, 'email': user.email}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


