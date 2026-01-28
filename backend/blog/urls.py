from django.urls import path
from .views import BlogDetailView, BlogListView, BlogListViewV2, ListComments, ListLikes
from . import views

urlpatterns = [
    # blogs----------------------------------------------------
    # public
    path('blogs/', BlogListView.as_view()),
    path('blogs/<int:pk>/', BlogDetailView.as_view()),
    # authenticated
    path('blogs/add/', views.create_blog),
    path('blogs/myblogs/', views.my_blogs),
    # authorized 
    path('blogs/update/<int:pk>/', views.update_blog),
    path('blogs/delete/<int:pk>/', views.delete_blog),
    # comments---------------------------------------------------
    # public
    path('blogs/<int:pk>/comments/', ListComments.as_view()),
    # authenticated
    path('blogs/<int:pk>/comments/add/', views.add_comment),
    # authorized
    path('blogs/<int:pk>/comments/<int:id>/', views.edit_comment),
    path('blogs/<int:pk>/comments/<int:id>/delete/', views.delete_comment),
    # likes------------------------------------------------------
    # public
    path('blogs/<int:pk>/likes/', ListLikes.as_view()),
    # authenticated
    path('blogs/<int:pk>/likes/toggle/', views.toggle_likes),

    # API VERSION 2 - PAGINATION ADDED
    path('blogs/v2/', BlogListViewV2.as_view()),
    path('blogs/myblogs/v2/', views.my_blogs_v2),
]