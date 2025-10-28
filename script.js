// Preloader Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000); // 2 seconds delay
});

// Custom Cursor Animation
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Track mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move dot instantly
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

// Smooth follow effect for outline
function animateOutline() {
    // Smooth easing
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .cert-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform += ' scale(1.5)';
        cursorOutline.style.borderColor = 'var(--accent-color)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
        cursorOutline.style.borderColor = 'var(--primary-color)';
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
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
