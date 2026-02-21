"""
Website Application Package Initialization
This file marks the website directory as a Python package.
"""

# Define the default app configuration
default_app_config = 'website.apps.WebsiteConfig'

# You can expose key models or functions at package level
# from .models import Project, TeamMember, Contact
# from .views import index, about, contact

# Package metadata
__version__ = '1.0.0'

# This allows Django to discover the app
name = "website"

# Optional: Import signals to ensure they're registered
# default_app_config = 'website.apps.WebsiteConfig'

# If you have signals, uncomment this:
# from . import signals