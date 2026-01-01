from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Blog, Comment, Like
from .serializers import BlogSerializer, CommentSerializer, LikeSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404


# -----------------------------------------
# BLOG CRUD VIEWS
# -----------------------------------------

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


# [GET] - get one user's blogs (authenticated)
@api_view(['GET'])
def my_blogs(request):
    blogs = Blog.objects.all()
    myblogs = blogs.filter(author=request.user)
    serializer = BlogSerializer(myblogs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# [POST] - request(blog data) - authentication(JWT) - response(Blog created)
@api_view(['POST'])
def create_blog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response({'message': 'Blog created successfully.'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# [POST] - request(blog data updated) - authentication(JWT) - response(Blog updated)
@api_view(['PATCH'])
def update_blog(request, pk):    
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
def delete_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    
    if blog.author != request.user:
        return Response({'message': 'Forbidden! You are not allowed to delete this blog.'}, status=status.HTTP_403_FORBIDDEN)

    blog.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# -----------------------------------------
# COMMENTS CRUD VIEWS
# -----------------------------------------

# [GET] - List all comments for a blog
class ListComments(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        blog_id = self.kwargs['pk']
        return Comment.objects.filter(blog_id=blog_id)


# [POST] - Add comment to a blog
@api_view(['POST'])
def add_comment(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, blog=blog)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# [PUT] - Update comment
@api_view(['PUT'])
def edit_comment(request, pk, id):
    blog = get_object_or_404(Blog, id=pk)
    comment = get_object_or_404(Comment, id=id)
    
    if request.user != comment.user:
        return Response({'message': 'Forbidden! You are not allowed to edit this comment.'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = CommentSerializer(instance=comment, data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# [DELETE] - Delete a comment (by blog author)
@api_view(['DELETE'])
def delete_comment(request, pk, id):
    blog = get_object_or_404(Blog, id=pk)
    comment = get_object_or_404(Comment, id=id)

    if request.user != blog.author and request.user != comment.user:
        return Response({'message': 'Forbidden! You are not allowed to perform this operation.'}, status=status.HTTP_403_FORBIDDEN)
    
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# -----------------------------------------
# LIKES TOGGLE VIEWS
# -----------------------------------------

# [GET] - Get likes count for one blog
class ListLikes(ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        blog_id = self.kwargs['pk']
        return Like.objects.filter(blog_id=blog_id)


# [POST] - Toggle like for a blog
@api_view(['POST'])
def toggle_likes(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    serializer = LikeSerializer(data={})

    like = Like.objects.filter(blog=blog, user=request.user)

    if like:
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    

    if serializer.is_valid():
        serializer.save(user=request.user, blog=blog)
        return Response(status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


