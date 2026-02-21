"""
WSGI config for Apexora project.
Production-ready WSGI configuration for Render deployment.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

# Add the project directory to the Python path
# This ensures that the Apexora module can be found
project_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(project_dir))

# Set the Django settings module
# This tells Django which settings file to use
# For Render production, we use the regular settings
# The DEBUG setting will be controlled by environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Apexora.settings')

# Initialize Django WSGI application
from django.core.wsgi import get_wsgi_application

try:
    application = get_wsgi_application()
except Exception as e:
    # Log the error for debugging on Render
    print(f"Error initializing WSGI application: {e}", file=sys.stderr)
    raise

# Optional: Add health check endpoint for Render
def health_check(environ, start_response):
    """Simple health check endpoint for Render monitoring"""
    if environ.get('PATH_INFO') == '/health/':
        status = '200 OK'
        headers = [('Content-Type', 'text/plain')]
        start_response(status, headers)
        return [b'OK']
    return application(environ, start_response)

# Wrap the application with health check
application = health_check

# Optional: Add middleware for logging in production
class WSGILoggingMiddleware:
    """
    Simple WSGI middleware to log requests in production.
    Helpful for debugging on Render.
    """
    def __init__(self, app):
        self.app = app
    
    def __call__(self, environ, start_response):
        # Log the request path
        path = environ.get('PATH_INFO', '')
        method = environ.get('REQUEST_METHOD', '')
        
        # Only log non-static requests to avoid noise
        if not path.startswith('/static/') and not path.startswith('/media/'):
            print(f"WSGI Request: {method} {path}", file=sys.stderr)
        
        # Create a custom start_response to log status
        def custom_start_response(status, headers, exc_info=None):
            print(f"WSGI Response: {status} for {method} {path}", file=sys.stderr)
            return start_response(status, headers, exc_info)
        
        return self.app(environ, custom_start_response)

# Apply logging middleware in production
if os.getenv('DEBUG', 'False') != 'True':
    application = WSGILoggingMiddleware(application)

# For Render.com - this is the entry point
# Render will look for 'application' by default