from django.db import models
from django.conf import settings

# Create your models here.

class CoverLetter(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cover_letter')
    cover_letter = models.TextField()
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}'s cover letter".format(self.user.username)

class Document_CV(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cv')
    document = models.FileField(upload_to='documents/%Y/%m/%d/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}'s cv".format(self.user.username)