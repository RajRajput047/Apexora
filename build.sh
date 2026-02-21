#!/usr/bin/env bash
# Exit on error
set -o errexit

# Upgrade pip and setuptools FIRST (Important!)
python -m pip install --upgrade pip setuptools wheel

# Install other requirements
pip install -r requirements.txt

# Database migrations and static files
python manage.py collectstatic --noinput
python manage.py migrate