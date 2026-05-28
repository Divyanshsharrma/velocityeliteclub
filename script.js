// Intro animation and main content transition
document.addEventListener('DOMContentLoaded', function() {
    const introContainer = document.getElementById('intro-container');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    
    // Set intro video to play only once
    introVideo.loop = false;
    
    // Handle video end and transition
    function handleVideoEnd() {
        // Wait 0.08 seconds after video ends before starting fade out
        setTimeout(() => {
            // Start fade out
            introContainer.classList.add('fade-out');
            
            // Show main content after fade starts
            setTimeout(() => {
                mainContent.classList.add('visible');
            }, 500);
            
            // Hide intro container completely after fade
            setTimeout(() => {
                introContainer.style.display = 'none';
            }, 1500);
        }, 80); // 0.08 second delay before fade out
    }
    
    // Fallback timer in case video doesn't load properly
    const fallbackTimer = setTimeout(() => {
        if (!introContainer.classList.contains('fade-out')) {
            handleVideoEnd();
        }
    }, 7000); // 7 seconds fallback (increased from 5)
    
    // Listen for video end
    introVideo.addEventListener('ended', handleVideoEnd);
    
    // Clear fallback timer if video ends naturally
    introVideo.addEventListener('ended', () => {
        clearTimeout(fallbackTimer);
    });
    
    // Handle video loading errors
    introVideo.addEventListener('error', () => {
        console.log('Video loading error, using fallback timer');
        clearTimeout(fallbackTimer);
        setTimeout(handleVideoEnd, 1000);
    });
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
