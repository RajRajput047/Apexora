

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactLead

import os
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

def home(request):
    return render(request, 'website/home.html')

def services(request):
    return render(request, 'website/services.html')

def technologies(request):
    return render(request, 'website/technologies.html')

def portfolio(request):
    return render(request, 'website/portfolio.html')

def about(request):
    return render(request, 'website/about.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        if name and email and message:
            ContactLead.objects.create(name=name, email=email, message=message)
            messages.success(request, 'Thank you! We will get back to you soon.')
            return redirect('contact')
        else:
            messages.error(request, 'Please fill all fields.')
    return render(request, 'website/contact.html')


# Make sure you set OPENAI_API_KEY in your environment variables




@csrf_exempt
@require_POST
def chatbot_api(request):
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '').lower()
        
        if not user_message:
            bot_message = "Please ask something!"
        elif 'hello' in user_message or 'hi' in user_message:
            bot_message = "Hello! How can I help you with web development or data extraction?"
        elif 'services' in user_message:
            bot_message = "We offer web development, data extraction, and API development. Check our Services page!"
        else:
            bot_message = f"You said: '{user_message}'. For more help, visit our contact page."
        
        return JsonResponse({'bot_message': bot_message})
    except Exception as e:
        return JsonResponse({'bot_message': 'Sorry, something went wrong.'})
