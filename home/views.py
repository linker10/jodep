from django.shortcuts import render

from . import forms
# Create your views here.

def index(request):
    return render(request, 'home/index.html', {})

def hire(request):
    return render(request, 'home/embaucher.html', {})

def work(request):
    return render(request, 'home/travailler.html', {})

def career_center(request):
    return render(request, 'home/centre-de-carriere.html', {})

# Form to receive data
def personal(request):
    if request.method == 'POST':
        form = forms.PersonnelForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'home/personnel_done.html')
    else:
        form = forms.PersonnelForm

    return render(request, 'home/personnel.html', {'form': form})

