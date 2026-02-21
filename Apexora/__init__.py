"""
Apexora Django Project Initialization
This file marks the Apexora directory as a Python package.
"""

# You can define project-level variables here if needed
__version__ = '1.0.0'
__author__ = 'Your Name'
__email__ = 'your.email@example.com'

# This allows other modules to import from Apexora package
default_app_config = 'Apexora.apps.ApexoraConfig'

# Optional: Import key components for easier access
# from .celery import app as celery_app  # If using Celery
# __all__ = ['celery_app']