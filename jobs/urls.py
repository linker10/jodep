from django.urls import path

from . import views

app_name = 'jobs'

urlpatterns = [
    path('', views.listes_travail, name="job_list"),   
]