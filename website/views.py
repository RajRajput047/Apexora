

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactLead

import os
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import HttpResponse

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
    """Contact page view with form handling"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        # Validate form data
        if name and email and message:
            # Save to database using ContactLead model
            ContactLead.objects.create(
                name=name,
                email=email,
                message=message
            )
            
            messages.success(request, 'Thank you for contacting us! We will get back to you soon.')
            return redirect('contact')  # Changed from 'website:contact' to 'contact'
        else:
            messages.error(request, 'Please fill in all fields.')
    
    return render(request, 'website/contact.html')


def health_check(request):
    """Health check endpoint for Render"""
    return HttpResponse("OK", status=200)
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




# Custom error handlers
def custom_404(request, exception):
    """Custom 404 error page"""
    return render(request, 'website/404.html', status=404)

def custom_500(request):
    """Custom 500 error page"""
    return render(request, 'website/500.html', status=500)