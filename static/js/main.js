document.addEventListener('DOMContentLoaded', function() {
    
    // ========== FORM HANDLING ==========
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted!');
        });
    }
    
    // ========== SIMPLE NUMBER ANIMATION - NO OBSERVER ==========
    // This will start after 1 second regardless of scroll position
    
    setTimeout(function() {
        console.log('Starting number animation...');
        
        const statNumbers = document.querySelectorAll('.stat-number');
        console.log('Found', statNumbers.length, 'stat numbers');
        
        if (statNumbers.length === 0) {
            console.log('No stat numbers found! Check your class names.');
            return;
        }
        
        statNumbers.forEach((stat, index) => {
            // Get target value from data attribute
            let target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            
            // Map old values to new ones if needed
            if (target === 37) target = 1300;
            if (target === 10) target = 22;
            if (target === 63) target = 3500;
            if (target === 89) target = 93;
            
            console.log(`Stat ${index + 1}: target = ${target}${suffix}`);
            
            let current = 0;
            const increment = Math.ceil(target / 50); // Divide into 50 steps
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    // Format with commas for thousands
                    stat.textContent = target.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = current.toLocaleString() + suffix;
                }
            }, 40); // Update every 40ms
        });
    }, 1000); // Start after 1 second
    
});