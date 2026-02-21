"""
URL configuration for Apexora project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),
    
    # Website app URLs (home, about, contact)
    path('', include('website.urls')),
    
    # Favicon redirect (optional)
    path('favicon.ico', RedirectView.as_view(url='/static/images/favicon.ico')),
]

# Serve media files in development only
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
# Custom error handlers (optional)
handler404 = 'website.views.custom_404'
handler500 = 'website.views.custom_500'

