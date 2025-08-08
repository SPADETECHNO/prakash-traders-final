// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const heroSlides = document.querySelectorAll('.hero__slide');
const heroDots = document.querySelectorAll('.hero__dot');
const heroNext = document.getElementById('hero-next');
const heroPrev = document.getElementById('hero-prev');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section[id]');

// Mobile Navigation
function showMenu() {
    if (navMenu) {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideMenu() {
    if (navMenu) {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Event listeners for mobile navigation
if (navToggle) {
    navToggle.addEventListener('click', showMenu);
}

if (navClose) {
    navClose.addEventListener('click', hideMenu);
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Hero Slider Functionality
let currentSlide = 0;
const totalSlides = heroSlides.length;
let slideInterval;

function showSlide(index) {
    // Remove active class from all slides and dots
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
    }
    if (heroDots[index]) {
        heroDots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetSlideInterval();
}

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Hero slider event listeners
if (heroNext) {
    heroNext.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
}

if (heroPrev) {
    heroPrev.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
}

// Dots navigation - Fixed implementation
heroDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(index);
    });
});

// Start the slider
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0); // Initialize first slide
    startSlideInterval();
});

// Pause slider on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
}

// Fixed Smooth Scrolling for Navigation Links
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hideMenu();
            }
        });
    });
}

// Active Navigation Link Highlighting
function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Header Background on Scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function createNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            font-family: 'Inter', sans-serif;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        .notification--success {
            background: #2ECC71;
            color: white;
        }
        .notification--error {
            background: #E74C3C;
            color: white;
        }
        .notification--info {
            background: #3498DB;
            color: white;
        }
        .notification__content {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            gap: 12px;
        }
        .notification__icon {
            font-size: 18px;
            font-weight: bold;
        }
        .notification__message {
            flex: 1;
            font-size: 14px;
        }
        .notification__close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification__close:hover {
            opacity: 0.8;
        }
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Fixed Contact Form Handling
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const phone = formData.get('phone')?.trim();
            const message = formData.get('message')?.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Scroll Animation for Elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .benefit-card, .about__content, .contact__content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('loaded');
        }
    });
}

// Product Cards Hover Effect Enhancement
function initProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Benefit Cards Hover Effect Enhancement
function initBenefitCards() {
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Intersection Observer for better scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.product-card, .benefit-card, .about__content, .contact__content');
    elementsToObserve.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

// Keyboard navigation for accessibility
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            hideMenu();
        }
        
        // Arrow keys for hero slider
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetSlideInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetSlideInterval();
        }
    });
}

// // Click to call/email functionality
// function initClickToContact() {
//     // Make phone numbers clickable
//     const phoneElements = document.querySelectorAll('p, span, div');
//     phoneElements.forEach(element => {
//         if (element.textContent.includes('+91 94281 04757') || element.textContent.includes('94281 04757')) {
//             element.style.cursor = 'pointer';
//             element.style.color = 'var(--orange-primary)';
//             element.addEventListener('click', () => {
//                 window.open('tel:+919428104757');
//             });
//         }
//     });

//     // Make email addresses clickable
//     const emailElements = document.querySelectorAll('p, span, div');
//     emailElements.forEach(element => {
//         if (element.textContent.includes('prakashtraderss@gmail.com')) {
//             element.style.cursor = 'pointer';
//             element.style.color = 'var(--orange-primary)';
//             element.addEventListener('click', () => {
//                 window.open('mailto:prakashtraderss@gmail.com');
//             });
//         }
//     });
// }

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create notification styles
    createNotificationStyles();
    
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initProductCards();
    initBenefitCards();
    initScrollAnimations();
    initKeyboardNavigation();
    initClickToContact();
    
    // Set initial states
    highlightNavLink();
    animateOnScroll();
    
    // Show first slide
    if (heroSlides.length > 0) {
        showSlide(0);
        startSlideInterval();
    }
    
    console.log('Prakash Traders website loaded successfully! 🚀');
});

// Apply throttled scroll events
window.addEventListener('scroll', throttle(() => {
    highlightNavLink();
    handleHeaderScroll();
    animateOnScroll();
}, 16)); // ~60fps

// Page load optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    animateOnScroll();
    highlightNavLink();
});