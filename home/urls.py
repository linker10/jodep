from django.urls import path

from . import views

app_name = 'home'

urlpatterns = [
    path('', views.index, name='index'),
    path('embaucher/', views.hire, name='hire'),
    path('embaucher/personnel', views.personal, name='personal'),
    path('travailler/', views.work, name='work'),
    path('centre-de-carriere/', views.career_center, name='career_center'),
]