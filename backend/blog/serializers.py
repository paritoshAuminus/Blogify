from rest_framework import serializers
from .models import Blog, Comment, Like

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    comment_count = serializers.IntegerField(source='like_set.count', read_only=True)
    likes_count = serializers.IntegerField(source='comment_set.count', read_only=True)

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
    user = serializers.ReadOnlyField(source='user.username')
    blog = serializers.ReadOnlyField(source='blog.id')

    class Meta:
        model = Comment
        fields = '__all__'