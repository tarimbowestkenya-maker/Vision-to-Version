// ShowMeLive - Main JavaScript
// File: static/script.js

// ===== Handle Login/Get Started Clicks =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle all login/start sharing buttons
    const loginButtons = document.querySelectorAll('.login-btn, .primary-btn, .cta-button');
    
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If button already has an onclick attribute, let it work normally
            if (button.getAttribute('onclick')) return;
            
            e.preventDefault();
            window.location.href = '/dashboard';
        });
    });
    
    // FAQ Toggle functionality (since we haven't done this yet)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
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
});