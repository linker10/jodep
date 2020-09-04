from django import forms

# Create your forms here.

class JobSearchForm(forms.Form):
    category = forms.CharField(max_length=120)
    city = forms.CharField(max_length=120)