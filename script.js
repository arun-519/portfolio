// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Typing Effect for Subtitle
const typingText = document.querySelector('.typing-text');
const phrases = ["Full Stack Developer", "MCA Student", "Creative Problem Solver"];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function typeLoop() {
    isDeleting ? letterIndex-- : letterIndex++;
    currentPhrase = phrases[phraseIndex].substring(0, letterIndex);
    typingText.textContent = currentPhrase;

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && letterIndex === phrases[phraseIndex].length) {
        typeSpeed = 2000; // Pause at end of text
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeLoop, typeSpeed);
}

// Initialization delay for typing
setTimeout(typeLoop, 1000);

// Scroll Reveal Animation (Intersection Observer)
const reveals = document.querySelectorAll('.reveal');

const revealCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Animate skill bars if they are in the view
            if (entry.target.id === 'skills') {
                const skillFills = document.querySelectorAll('.skill-fill');
                skillFills.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-in-out';
                        bar.style.width = width;
                    }, 200);
                });
            }
            observer.unobserve(entry.target); // Optional: only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Interactive Background Particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 80;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Re-init particles on resize to ensure correct distribution
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    // Create method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    // Check particle position, mouse position, move particle, draw
    update() {
        // Reverse direction if hitting edge
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
    }
}

// Create particle array
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = Math.random() > 0.5 ? '#00f3ff' : '#bd00ff'; // Cyan or Purple
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animation Loop for particles connecting
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    
    // Connect particles
    connectParticles();
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                           
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                // Make string color faintly purple or cyan
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacityValue * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Start Particle Animation
initParticles();
animateParticles();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when nav item is clicked
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
