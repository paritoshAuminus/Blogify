from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Blog
from .serializers import BlogSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404

# [GET] - get a list of all blogs
class BlogListView(ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]


# [GET] - get one blog
class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]


# [POST] - request(blog data) - authentication(JWT) - response(Blog created)
@api_view(['POST'])
def createBlog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response({'message': 'Blog created successfully.'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# [POST] - request(blog data updated) - authentication(JWT) - response(Blog updated)
@api_view(['PATCH'])
def updateBlog(request, pk):    
    blog = get_object_or_404(Blog, id=pk)

    if blog.author != request.user:
        return Response({'message': 'Forbidden! You are not allowed to update this blog.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = BlogSerializer(blog, request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Blog updated successfully.'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# [DELETE] - request(delete blog) - authetication(JWT) - response(Blog deleted)
@api_view(['DELETE'])
def deleteBlog(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    
    if blog.author != request.user:
        return Response({'message': 'Forbidden! You are not allowed to delete this blog.'}, status=status.HTTP_403_FORBIDDEN)

    blog.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)