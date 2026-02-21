"""
WSGI config for webdev_services project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from django.core.asgi import get_asgi_application

# Changed from 'webdev_services.settings' to 'Apexora.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Apexora.settings')

application = get_asgi_application()
