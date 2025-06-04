// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = index === 0 ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate feature cards with stagger effect
            if (entry.target.classList.contains('feature-card')) {
                const cards = document.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// 3D tilt effect on feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Animated counter for statistics
// Note: Currently not used, but kept for potential future use
/*
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = '$' + Math.floor(current).toLocaleString();
    }, 16);
}

// Trigger counter animation when visible
const counterElement = document.querySelector('.percentage');
if (counterElement) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateValue(entry.target, 0, 44262, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(counterElement);
}
*/

// Dynamic background particles
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.prepend(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(96, 181, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(96, 181, 255, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background
new ParticleBackground();

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Button ripple effect
document.querySelectorAll('button, .hero-btn, .explore-btn, .discover-btn, .learn-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    button, .hero-btn, .explore-btn, .discover-btn, .learn-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mouse trail effect for hero section
const heroSection = document.querySelector('.hero');
let mouseTrail = [];

heroSection.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'absolute';
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'radial-gradient(circle, rgba(96, 181, 255, 0.5), transparent)';
    trail.style.pointerEvents = 'none';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    trail.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(trail);
    mouseTrail.push(trail);
    
    setTimeout(() => {
        trail.style.transition = 'all 0.5s ease-out';
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(3)';
        
        setTimeout(() => {
            trail.remove();
            mouseTrail = mouseTrail.filter(t => t !== trail);
        }, 500);
    }, 10);
    
    // Limit trail length
    if (mouseTrail.length > 20) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter egg
console.log('%c🛡️ ShieldWave Security Platform', 'font-size: 24px; color: #60B5FF; font-weight: bold;');
console.log('%cProtecting your digital assets with cutting-edge security solutions', 'font-size: 14px; color: #a0a0a0;');
console.log('%c⚠️ Security Notice: This console is for developers only!', 'font-size: 12px; color: #ff4757; font-weight: bold;');

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Close all dropdowns when closing the menu
    if (!navMenu.classList.contains('active')) {
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('active');
            dropdown.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
        });
    }
});

// Handle dropdowns on mobile
if (window.innerWidth <= 1024) {
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const arrow = dropdown.querySelector('.dropdown-arrow');

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-menu').classList.remove('active');
                    otherDropdown.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
                }
            });

            // Toggle current dropdown
            menu.classList.toggle('active');
            arrow.style.transform = menu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('active');
            dropdown.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
        });
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('active');
            dropdown.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
        });
    }
});

// Handle signup options
document.addEventListener('DOMContentLoaded', function() {
    const emailOption = document.querySelector('.email-option');
    const googleOption = document.querySelector('.google-option');
    const microsoftOption = document.querySelector('.microsoft-option');
    const emailForm = document.querySelector('.email-signup-form');
    const signupOptions = document.querySelectorAll('.signup-option');
    
    // Hide email form by default
    emailForm.classList.remove('active');
    
    // Function to handle signup option click
    function handleSignupOptionClick(clickedOption) {
        // Remove active class from all options
        signupOptions.forEach(option => option.classList.remove('active'));
        
        // Add active class to clicked option
        clickedOption.classList.add('active');
        
        // Show/hide email form based on which option was clicked
        if (clickedOption.classList.contains('email-option')) {
            emailForm.classList.add('active');
            // Focus on first input after animation
            setTimeout(() => {
                document.getElementById('fullName').focus();
            }, 300);
        } else {
            emailForm.classList.remove('active');
        }
    }
    
    // Add click event listeners to signup options
    emailOption.addEventListener('click', () => handleSignupOptionClick(emailOption));
    googleOption.addEventListener('click', () => {
        handleSignupOptionClick(googleOption);
        // Handle Google sign up logic here
        console.log('Google sign up clicked');
    });
    microsoftOption.addEventListener('click', () => {
        handleSignupOptionClick(microsoftOption);
        // Handle Microsoft sign up logic here
        console.log('Microsoft sign up clicked');
    });
    
    // Handle password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Form validation
    const signupForm = document.querySelector('.email-signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if passwords match
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match!');
            return;
        }
        
        // Check if terms are accepted
        const termsCheckbox = document.querySelector('.terms-agreement input[type="checkbox"]');
        if (!termsCheckbox.checked) {
            alert('Please accept the Terms of Service and Privacy Policy');
            return;
        }
        
        // Here you would typically send the form data to your server
        console.log('Form submitted successfully');
    });
});

// API URL
const API_URL = 'http://localhost:5000/api';

// Handle signup form submission
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const company = document.getElementById('company').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                company
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to dashboard or home page
            window.location.href = 'index.html';
        } else {
            // Show error message
            const errorDiv = document.getElementById('error-message');
            errorDiv.textContent = data.message;
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = 'An error occurred. Please try again.';
        errorDiv.style.display = 'block';
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to dashboard or home page
            window.location.href = 'index.html';
        } else {
            // Show error message
            const errorDiv = document.getElementById('error-message');
            errorDiv.textContent = data.message;
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = 'An error occurred. Please try again.';
        errorDiv.style.display = 'block';
    }
}

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
} 