// Single DOMContentLoaded event with both functionalities
document.addEventListener('DOMContentLoaded', function() {
    // ==================== FORM HANDLING ====================
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation example
            let isValid = true;
            let errorMessage = '';
            
            // Check required fields
            for (let [key, value] of formData.entries()) {
                if (!value || value.trim() === '') {
                    isValid = false;
                    errorMessage = `Please fill in ${key}`;
                    break;
                }
            }
            
            // Email validation if email field exists
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }
            
            if (isValid) {
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                console.log('Form data:', data);
                form.reset(); // Optional: reset form after success
            } else {
                // Show error message
                showNotification(errorMessage, 'error');
            }
        });
    }
    
    // ==================== NUMBER ANIMATION ====================
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    // Only run animation if stats elements exist
    if (stats.length > 0) {
        // Set initial values to 0 with proper suffix
        stats.forEach(stat => {
            const target = stat.getAttribute('data-target');
            const suffix = getSuffix(stat);
            stat.textContent = '0' + suffix;
        });
        
        function animateNumbers() {
            if (animated) return;
            
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = getSuffix(stat);
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateNumber = () => {
                    current += step;
                    if (current < target) {
                        // Format number with commas for thousands
                        const formattedValue = Math.floor(current).toLocaleString();
                        stat.textContent = formattedValue + suffix;
                        requestAnimationFrame(updateNumber);
                    } else {
                        // Format final number with commas
                        const formattedTarget = target.toLocaleString();
                        stat.textContent = formattedTarget + suffix;
                    }
                };
                
                updateNumber();
            });
            
            animated = true;
        }
        
        // Helper function to determine suffix based on data-target or default
        function getSuffix(stat) {
            const target = stat.getAttribute('data-target');
            // Check if element has data-suffix attribute
            if (stat.hasAttribute('data-suffix')) {
                return stat.getAttribute('data-suffix');
            }
            // Fallback to old logic
            return target == '89' || target == '93' ? '%' : '+';
        }
        
        // Trigger animation when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    // Optional: unobserve after animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3, // Trigger when 30% visible
            rootMargin: '0px'
        });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        } else {
            // If no stats section, observe each stat card individually
            stats.forEach(stat => {
                observer.observe(stat.closest('.stat-card') || stat);
            });
        }
    }
    
    // ==================== HELPER FUNCTIONS ====================
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Add styles for notification
        const style = document.createElement('style');
        style.textContent = `
            .custom-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                max-width: 350px;
            }
            
            .custom-notification.success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            
            .custom-notification.error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            
            .custom-notification.info {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-icon {
                font-size: 20px;
                font-weight: bold;
            }
            
            .notification-message {
                font-size: 14px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // ==================== ADDITIONAL ENHANCEMENTS ====================
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            }
        });
    }
    
    // Add active class to current nav link
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});