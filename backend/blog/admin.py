from django.contrib import admin
from .models import Blog, Comment, Like

# Register your models here.
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'author']
    list_display_links = ['title']

admin.site.register(Comment)
admin.site.register(Like)