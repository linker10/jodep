from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from .forms import CoverLetterForm, DocumentForm
from .models import CoverLetter, Document_CV

# Create your views here.

@login_required
def manager(request):
    user = request.user
    return render(request, 'manager/manager.html')

@login_required
def biography(request):
    saved = None
    if request.method == 'POST':
        form = CoverLetterForm(request.POST, prefix='coverletter')
        if form.is_valid():
            cover_letter, created = CoverLetter.objects.get_or_create(user=request.user)
            cover_letter_content = form.cleaned_data['cover_letter']
            cover_letter.cover_letter = cover_letter_content
            cover_letter.save()
            saved = True
    else:
        form = CoverLetterForm(prefix='coverletter')
        form2 = DocumentForm(prefix='document') 
        saved = False
    return render(request, 'manager/biography.html', {'form': form, 'form2': form2, 'saved': saved})

@login_required
def documentupload(request):
    saved = None
    if request.method == 'POST':
        form2 = DocumentForm(request.POST, request.FILES, prefix='document')
        if form2.is_valid():
            cv, created = Document_CV.objects.get_or_create(user=request.user)
            cv_document = form2.cleaned_data['document']
            cv.document = cv_document
            cv.save()
            saved = True
    else:
        form2 = DocumentForm(prefix='document')  
        saved = False    
    return render(request, 'manager/upload_done.html', {'form': form2, 'saved': saved})


@login_required
def architect(request):
    return render(request, 'manager/architect.html')

@login_required
def deactivate(request):
    return render(request, 'manager/deactivate.html')   

@login_required
def deactivate_account(request):
    user = request.user
    user.is_active = False
    user.save()

    return redirect('home:index') 