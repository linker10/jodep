from django.db import models
from django.conf import settings

# Create your models here.

class Profile(models.Model):    
    ACCOUNT_TYPES = (
        ('hirer', 'Hirer'),
        ('employee', 'Employee'),
        ('both', 'Both')
    )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    date_of_birth = models.DateField(blank=True, null=True)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPES)

    employment_type = models.CharField(max_length=120, null=True, blank=True)
    document = models.FileField(upload_to='documents/', null=True, blank=True)

    def __str__(self):
        return 'Profile ({})'.format(self.user.username)

