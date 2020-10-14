from django import forms
from django.contrib.auth.models import User
from .models import Profile

class LoginForm(forms.Form):
    username = forms.CharField(max_length=20, widget=forms.TextInput(attrs={'class':'form-control','placeholder':'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','placeholder':'Password'}))

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat password', widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')    

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        return cd['password2']
        
    def clean_email(self):
       cd = self.cleaned_data
       email = cd['email']
       if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Email exists")
       return cd['email']

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('document', 'date_of_birth', 'employment_type', 'account_type')
    
    def clean_document(self):
        document = self.cleaned_data['document']

        try:
            #validate content type
            main, sub = document.content_type.split('/')
            if not (sub in ['pdf', 'doc', 'docx']):
                raise forms.ValidationError('Please use a pdf, or MS Word file.')

            #validate file size     # 4MB
            if len(document) > (3 * 1024000):
                raise forms.ValidationError('File size may not exceed 3MBs.')

        except AttributeError:
            """
            Handles case when we are updating the user profile
            and do not supply a new document
            """
            pass

class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email',)
