from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, ProfileForm, UserEditForm
from .models import Profile
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth import login, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.views.generic import View

# Create your views here

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.set_password(form.cleaned_data['password'])
            user.save()
            Profile.objects.create(user=user)
            request.session['username'] = user.username
            current_site = get_current_site(request)
            mail_subject = 'Please activate your account on {}'.format(current_site.domain)
            message = render_to_string('accounts/acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                        mail_subject, message, to=[to_email]
            )
            email.send()
            return render(request, 'accounts/confirm_registration.html')
    else:
        form = UserRegistrationForm()
    return render(request, "accounts/registre.html", {'form': form})
    
def resend_mail(request):
    username = request.session['username']
    user = User.objects.get(username=username)
    current_site = get_current_site(request)
    mail_subject = 'Please activate your account on {}'.format(current_site.domain)
    message = render_to_string('accounts/acc_active_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
    })
    to_email = user.email
    print(to_email, message)
    email = EmailMessage(
                mail_subject, message, to=[to_email]
    )
    email.send()

    return render(request, 'accounts/confirm_registration.html')

class Activate(View):
    def get(self, request, uidb64, token, backend='django.contrib.auth.backends.ModelBackend'):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')

            return redirect('home:index')
        else:
            return HttpResponse('Activation link is invalid!')

@login_required
def edit(request):
    saved = None
    if request.method == 'POST':
        user_form = UserEditForm(instance=request.user, data=request.POST)
        profile_form = ProfileForm(instance=request.user.profile, data=request.POST, files=request.FILES)
        saved = False
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            saved = True
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.profile)
    
    return render(request, 'accounts/edit.html', {'user_form': user_form, 'profile_form': profile_form, 'saved': saved})
    