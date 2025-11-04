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



// Contact Form Email Functionality
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // EmailJS parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_h0777lh', 'template_b9etjru', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('FAILED...', error);

                // Show error message
                showNotification('Failed to send message. Please try again or email directly.', 'error');

                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
