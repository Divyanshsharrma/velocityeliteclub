// Splash screen animation and main content transition
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    // Only run splash screen logic if elements exist (index.html only)
    if (splashScreen && mainContent) {
        // Prevent scrolling during splash screen
        document.body.classList.add('splash-active');
        
        // Handle splash screen fade out and transition
        function handleSplashScreenEnd() {
            // Start fade out
            splashScreen.classList.add('fade-out');
            
            // Show main content after fade starts
            setTimeout(() => {
                mainContent.classList.add('visible');
            }, 300);
            
            // Hide splash screen completely after fade and re-enable scrolling
            setTimeout(() => {
                splashScreen.style.display = 'none';
                document.body.classList.remove('splash-active');
            }, 1000);
        }
        
        // Show splash screen for 2.5 seconds then transition
        setTimeout(() => {
            handleSplashScreenEnd();
        }, 2500);
    }
});

// Scroll animations for feature sections
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const featureText = entry.target.querySelector('.feature-text');
                const featureImage = entry.target.querySelector('.feature-image');
                
                if (featureText) {
                    setTimeout(() => {
                        featureText.classList.add('animate');
                    }, 200);
                }
                
                if (featureImage) {
                    setTimeout(() => {
                        featureImage.classList.add('animate');
                    }, 400);
                }
            }
        });
    }, observerOptions);
    
    // Observe all feature sections
    const featureSections = document.querySelectorAll('.feature-section');
    featureSections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Smooth scrolling for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add a subtle animation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // You can add navigation logic here
        console.log('CTA button clicked');
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    // Only apply parallax if hero content exists (index.html only)
    if (heroContent && scrolled < window.innerHeight) {
        const speed = 0.5;
        heroContent.style.transform = `translateY(${scrolled * speed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add hover effect for footer links
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
    });
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Handle cross-page anchor navigation with smooth scrolling
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            // Smooth scroll to the target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Scroll Animations for New Sections
function handleNewSectionAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe about section elements
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) observer.observe(aboutText);
    if (aboutImage) observer.observe(aboutImage);
    
    // Observe facility cards
    const facilityCards = document.querySelectorAll('.facility-card');
    facilityCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });
    
    // Observe membership cards
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
    });
}

// Initialize new section animations
document.addEventListener('DOMContentLoaded', handleNewSectionAnimations);

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    }
});
