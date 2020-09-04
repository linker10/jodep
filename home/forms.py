from django import forms

from .models import Personnel

# Create your forms here.

class PersonnelForm(forms.ModelForm):
    class Meta:
        model = Personnel
        fields = ('__all__')