#!/usr/bin/env bash
# Exit on error
set -o errexit

# Show Python version for debugging
echo "Python version:"
python --version

# Show current directory
echo "Current directory: $(pwd)"

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate

echo "Build completed successfully!"