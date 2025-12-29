from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import BlogDetailView, BlogListView, ListComments, ListLikes
from . import views

urlpatterns = [
    # blogs----------------------------------------------------
    # public
    path('blogs/', BlogListView.as_view()),
    path('blogs/<int:pk>/', BlogDetailView.as_view()),
    # authenticated
    path('blogs/add/', views.create_blog),
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
    path('blogs/<int:pk>/likes/toggle/', views.toggle_likes)
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )