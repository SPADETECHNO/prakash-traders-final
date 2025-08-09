// Product data for popup details
const productDetailsData = {
    'transparent-acrylic': {
        title: 'Transparent Acrylic Sheets',
        image: 'assets/products/Transparent_acrylic_sheet.jpeg',
        features: [
            'Crystal clear transparency (92% light transmission)',
            'UV resistant for outdoor applications',
            'Impact resistant - 10x stronger than glass',
            'Easy to fabricate and machine',
            'Lightweight yet durable',
            'Excellent weather resistance'
        ],
        specifications: {
            'Standard Sizes': '4ft x 8ft, 4ft x 6ft, 4ft x 3ft',
            'Thickness Range': '2mm to 25mm',
        }
    },
    'colored-acrylic': {
        title: 'Colored Acrylic Sheets',
        image: 'assets/products/coloured_acrylic_sheet.jpeg',
        features: [
            'Wide range of vibrant colors',
            'UV resistant color retention',
            'Impact resistant and durable',
            'Easy to cut and fabricate',
            'Smooth surface finish',
            'Weather resistant for outdoor use'
        ],
        specifications: {
            'Standard Sizes': '4ft x 8ft, 4ft x 6ft, 3ft x 4ft',
            'Thickness Range': '2mm to 25mm',
          
        }
    },
    'mirrored-acrylic': {
        title: 'Mirrored Acrylic Sheets',
        image: 'assets/products/mirror_acrylic.jpeg',
        features: [
            '95% reflectivity for crystal clear reflection',
            'Shatter-resistant and safe',
            '50% lighter than glass mirrors',
            'Easy to cut and fabricate',
            'Resistant to moisture and humidity',
            'Available in golden & silver color'
        ],
        specifications: {
            'Standard Sizes': '4ft x 8ft',
            'Thickness Range': '1mm to 6mm',
        }
    },
    'acrylic-pipes': {
        title: 'Acrylic Pipes',
        image: 'assets/products/acrylic_pipes.jpeg',
        features: [
            'Crystal clear transparency',
            'Excellent chemical resistance',
            'High impact strength',
            'Easy to machine and fabricate',
            'Smooth internal and external surfaces',
            'UV resistant for outdoor use'
        ],
        specifications: {
            'Outer Diameter': '70mm to 310mm, 360mm and 500mm',
            'Wall Thickness': '3mm to 8mm',
            'Standard Lengths': '600mm, 2m',
        }
    },
    'acrylic-fabrication': {
        title: 'Acrylic Fabrication',
        image: 'assets/products/acrylic_fabrication_1.jpeg',
        features: [
            'Custom design and fabrication',
            'Precision cutting and machining',
            'Professional polishing and finishing',
            'Complex geometric shapes',
            'Multi-layer assemblies',
            'Quality assurance and testing'
        ],
        specifications: {
            'design' : 'Custom designs available',
            'dimensions': 'available in various sizes and thicknesses',
        }
    },
    'pvc-foam': {
        title: 'PVC Foam Sheets',
        image: 'assets/products/foam_sheets.jpeg',
        features: [
            'Lightweight yet rigid structure',
            'Excellent printability for graphics',
            'Superior chemical resistance',
            'Easy to cut, route, and fabricate',
            'Weather resistant for outdoor use',
            'Cost-effective signage solution'
        ],
        specifications: {
            'Standard Sizes': '8ft x 4ft',
            'Thickness Range': '3mm to 8mm',
        }
    },
    'pc-compact': {
        title: 'PC Compact Sheets',
        image: 'assets/products/polycarbonate.jpeg',
        features: [
            '250x stronger than glass',
            '90% light transmission',
            '100% UV protection',
            'Temperature resistant -40°C to +120°C',
            'Self-extinguishing flame retardant',
            'Excellent weatherability'
        ],
        specifications: {
            'Standard Size': '8ft x 4ft',
            'Thickness Range': '2mm to 12mm',

        }
    },
    'pc-multiwall': {
        title: 'PC Multiwall Sheets',
        image: 'assets/products/PC_multiwall.jpeg',
        features: [
            'Excellent thermal insulation',
            'Lightweight and easy to handle',
            'High impact resistance',
            '10-year UV protection warranty',
            'Self-extinguishing properties',
            'Available in multiple colors'
        ],
        specifications: {
            'Standard Width': '2100mm (7ft)',
            'Length': 'Up to 12m',
            'Thickness': '4mm to 25mm',

        }
    },
    'pc-embossed': {
        title: 'PC Embossed Sheets',
        image: 'assets/products/embossed_polycarbonate.jpeg',
        features: [
            'Excellent light diffusion properties',
            'Privacy with light transmission',
            'Attractive textured surface',
            'High impact resistance',
            'UV protection and weatherability',
            'Easy to clean and maintain'
        ],
        specifications: {
            'Standard Size': '8ft x 4ft',
            'Thickness': '2mm to 8mm',
            
        }
    }
};

// Product Carousel Functionality
class ProductCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.slides = carouselElement.querySelectorAll('.carousel-slide');
        this.dots = carouselElement.querySelectorAll('.carousel-dot');
        this.prevBtn = carouselElement.querySelector('.carousel-prev');
        this.nextBtn = carouselElement.querySelector('.carousel-next');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.startAutoplay();
    }
    
    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
        this.restartAutoplay();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Product Modal Functionality
class ProductModal {
    constructor() {
        this.modal = document.getElementById('product-modal');
        this.overlay = document.getElementById('modal-overlay');
        this.closeBtn = document.getElementById('modal-close');
        this.title = document.getElementById('modal-title');
        this.image = document.getElementById('modal-image');
        this.features = document.getElementById('modal-features');
        this.specs = document.getElementById('modal-specs');
        // this.applications = document.getElementById('modal-applications');
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Close modal events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // Product detail buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('product-details-btn')) {
                const productId = e.target.getAttribute('data-product');
                this.open(productId);
            }
        });
    }
    
    open(productId) {
        const productData = productDetailsData[productId];
        if (!productData) return;
        
        // Populate modal content
        if (this.title) this.title.textContent = productData.title;
        if (this.image) {
            this.image.src = productData.image;
            this.image.alt = productData.title;
        }
        
        // Populate features
        if (this.features) {
            this.features.innerHTML = '';
            productData.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                this.features.appendChild(li);
            });
        }
        
        // Populate specifications
        if (this.specs) {
            this.specs.innerHTML = '';
            Object.entries(productData.specifications).forEach(([key, value]) => {
                const specItem = document.createElement('div');
                specItem.className = 'spec-item';
                specItem.innerHTML = `
                    <span class="spec-label">${key}:</span>
                    <span class="spec-value">${value}</span>
                `;
                this.specs.appendChild(specItem);
            });
        }
        
        // Populate applications
        if (this.applications) {
            this.applications.innerHTML = '';
            productData.applications.forEach(application => {
                const li = document.createElement('li');
                li.textContent = application;
                this.applications.appendChild(li);
            });
        }
        
        // Show modal
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

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

// Dots navigation
heroDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(index);
    });
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

// Smooth Scrolling for Navigation Links
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

// Contact Form Handling
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

// Click to call/email functionality
function initClickToContact() {
    // Make phone numbers clickable
    const phoneElements = document.querySelectorAll('p, span, div');
    phoneElements.forEach(element => {
        if (element.textContent.includes('+91 94281 04757') || element.textContent.includes('94281 04757')) {
            element.style.cursor = 'pointer';
            element.style.color = 'var(--orange-primary)';
            element.addEventListener('click', () => {
                window.open('tel:+919428104757');
            });
        }
    });

    // Make email addresses clickable
    const emailElements = document.querySelectorAll('p, span, div');
    emailElements.forEach(element => {
        if (element.textContent.includes('prakashtraderss@gmail.com')) {
            element.style.cursor = 'pointer';
            element.style.color = 'var(--orange-primary)';
            element.addEventListener('click', () => {
                window.open('mailto:prakashtraderss@gmail.com');
            });
        }
    });
}

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
    
    // Initialize product carousel for fabrication
    const fabricationCarousel = document.getElementById('fabrication-carousel');
    if (fabricationCarousel) {
        new ProductCarousel(fabricationCarousel);
    }
    
    // Initialize product modal
    new ProductModal();
    
    // Initialize all other functionality
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
    
    console.log('Prakash Traders website with carousel and modal loaded successfully! 🚀🎠');
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
