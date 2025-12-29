from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('blogs/'),
    path('blogs/<int:pk>'),
    path('blogs/add/'),
    path('blogs/update/<int:pk>'),
    path('blogs/delete/<int:pk>'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )