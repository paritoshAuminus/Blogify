from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import BlogDetailView, BlogListView
from . import views

urlpatterns = [
    # public
    path('blogs/', BlogListView.as_view()),
    path('blogs/<int:pk>', BlogDetailView.as_view()),
    # authenticated
    path('blogs/add/', views.createBlog),
    # authorized 
    path('blogs/update/<int:pk>', views.updateBlog),
    path('blogs/delete/<int:pk>', views.deleteBlog),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )