from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    body = models.TextField()
    author = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Like(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'blog')

    def __str__(self):
        return f'{self.user} - {self.blog}'

class Comment(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    text = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.text[:50]}'
    

