// Custom JavaScript for All Time Low E-commerce Site

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #111827, #1f2937)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.card-footer .btn-primary');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Adding...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.textContent = 'Added!';
                this.style.background = 'linear-gradient(135deg, #059669, #047857)';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.background = 'linear-gradient(135deg, #dc2626, #991b1b)';
                }, 2000);
            }, 1000);
        });
    });
    
    // Newsletter subscription
    const subscribeButton = document.querySelector('.input-group .btn-primary');
    const emailInput = document.querySelector('.input-group .form-control');
    
    if (subscribeButton && emailInput) {
        subscribeButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                const originalText = this.textContent;
                this.textContent = 'Subscribing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.disabled = false;
                    }, 3000);
                }, 1500);
            } else {
                emailInput.style.borderColor = '#dc2626';
                emailInput.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    emailInput.style.borderColor = '#e5e7eb';
                    emailInput.placeholder = 'Enter your email';
                }, 3000);
            }
        });
        
        // Allow Enter key to subscribe
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .section-heading, .about-section img');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.card-overlay .btn-primary');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create modal-like effect
            const card = this.closest('.product-card');
            const cardClone = card.cloneNode(true);
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            cardClone.style.cssText = `
                transform: scale(1.2);
                max-width: 400px;
                margin: 2rem;
            `;
            
            overlay.appendChild(cardClone);
            document.body.appendChild(overlay);
            
            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            // Close on click
            overlay.addEventListener('click', function() {
                this.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(this);
                }, 300);
            });
        });
    });
    
    // Mobile menu toggle enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.background = 'rgba(17, 24, 39, 0.95)';
                    navbarCollapse.style.borderRadius = '0 0 15px 15px';
                    navbarCollapse.style.marginTop = '10px';
                }
            }, 100);
        });
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'hero-bg.jpg',
        'band-photo.jpg',
        'carousel-1.jpg',
        'carousel-2.jpg',
        'carousel-3.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

