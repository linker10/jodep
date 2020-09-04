from django.urls import path

from . import views

app_name = 'manager'

urlpatterns = [
    path('', views.manager, name='manager'),
    path('biography/', views.biography, name='biography'),
    path('biography/file_upload/', views.documentupload, name='uploadpdf'),
    path('biography/architect/', views.architect, name='architect'),
    path('deactivate/', views.deactivate, name='deactivate'),
    path('deactivate/account/', views.deactivate_account, name='deactivate_confirm'),
]