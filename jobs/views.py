from django.shortcuts import render

from .models import Job
from .forms import JobSearchForm

# Create your views here.

def listes_travail(request):
    jobs = None
    if request.method == "POST":
        form = JobSearchForm(request.POST)
        if form.is_valid():
            category = form.cleaned_data['category']
            city = form.cleaned_data['city']
            jobs = Job.objects.filter(job_category=category, workplace=city)
    else:
        form = JobSearchForm(request.POST)
    return render(request, 'jobs/listes-travail.html', {'jobs': jobs, 'form': form})