from django.db import models
from django.utils import timezone


# Create your models here.

class Job(models.Model):
    dated = models.DateField(auto_now_add=True)
    description = models.TextField()
    duration = models.CharField(choices=(('temp', 'Temp'), ('perm', 'Perm'),), max_length=5)
    salary = models.FloatField()

    position_type = models.CharField(max_length=100)
    job_category = models.CharField(max_length=100)
    position_title = models.CharField(max_length=100)
    workplace = models.CharField(max_length=100)
    preferred_contact_method = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    created = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        self.created = timezone.now()
        return super(Job, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.first_name} {self.last_name}, email: {self.email}'

    class Meta:
        verbose_name_plural = 'jobs'