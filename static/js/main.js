document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add custom validation if needed
        });
    }
});

// Add this JavaScript for number animation
// Fixed animation that definitely works
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment for everything to load
    setTimeout(initCounterAnimation, 100);
});

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Set initial values
    statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-target');
        const suffix = stat.getAttribute('data-suffix') || '';
        stat.textContent = '0' + suffix;
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '';
                
                // Animate to target number
                animateValue(stat, 0, target, 2000, suffix);
                
                // Stop observing after animation starts
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% visible
    
    // Observe all stat numbers
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateValue(element, start, end, duration, suffix) {
    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        // Format number with commas for thousands
        const formattedValue = currentValue.toLocaleString();
        element.textContent = formattedValue + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}