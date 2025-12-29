from rest_framework import serializers
from .models import Blog, Comment, Like

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Blog
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    blog = serializers.ReadOnlyField(source='blog.id')

    class Meta:
        model = Like
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    blog = serializers.ReadOnlyField(source='blog.id')

    class Meta:
        model = Comment
        fields = '__all__'