from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('activate/<uidb64>/<token>/', views.Activate.as_view(), name='activate'),
    path('register/', views.register, name='register'),
    path('register/resend_mail/', views.resend_mail, name='resend_mail'),
    path('edit/', views.edit, name='edit'),
]