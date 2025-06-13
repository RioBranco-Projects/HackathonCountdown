const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};
const loadingScreen = document.getElementById('loadingScreen');
const loadingProgress = document.getElementById('loadingProgress');
const particlesContainer = document.getElementById('particles');
const ctaButton = document.getElementById('ctaButton');
const targetDate = new Date('2025-08-18T00:00:00').getTime();
let previousValues = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
};
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    createParticles();
    startCountdown();
    initializeInteractions();
});
function initializeLoading() {
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(hideLoading, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
}
function hideLoading() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}
function createParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particlesContainer.appendChild(particle);
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle();
        }
    }, (Math.random() * 4 + 4) * 1000);
}
function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) {
        displayEventStarted();
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    updateNumberWithAnimation('days', days, 3);
    updateNumberWithAnimation('hours', hours, 2);
    updateNumberWithAnimation('minutes', minutes, 2);
    updateNumberWithAnimation('seconds', seconds, 2);
}
function updateNumberWithAnimation(unit, value, digits) {
    const element = countdownElements[unit];
    const numberDisplay = element.querySelector('.number-display');
    const formattedValue = value.toString().padStart(digits, '0');
    if (previousValues[unit] !== null && previousValues[unit] !== value) {
        numberDisplay.classList.add('number-flip');
        setTimeout(() => {
            numberDisplay.textContent = formattedValue;
        }, 300);
        setTimeout(() => {
            numberDisplay.classList.remove('number-flip');
        }, 600);
        element.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.8), 0 8px 32px rgba(0, 0, 0, 0.3)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 1000);
    } else {
        numberDisplay.textContent = formattedValue;
    }
    previousValues[unit] = value;
}
function displayEventStarted() {
    const countdownContainer = document.querySelector('.countdown-container');
    countdownContainer.innerHTML = `
        <div class="event-started">
            <h2 style="color: var(--primary-orange); font-size: 2.5rem; margin-bottom: 1rem;">
                🎉 O Evento Começou! 🎉
            </h2>
            <p style="font-size: 1.25rem; color: var(--text-secondary);">
                O Hackathon Rio Branco 2025 está acontecendo agora!
            </p>
        </div>
    `;
}
function initializeInteractions() {
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 0 40px rgba(249, 115, 22, 0.6), 0 8px 32px rgba(0, 0, 0, 0.3)';
    });
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
    Object.values(countdownElements).forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.borderColor = 'var(--primary-orange)';
            this.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)';
        });
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
    Object.values(countdownElements).forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            const pulse = document.createElement('div');
            pulse.style.position = 'absolute';
            pulse.style.top = '50%';
            pulse.style.left = '50%';
            pulse.style.width = '100%';
            pulse.style.height = '100%';
            pulse.style.background = 'rgba(249, 115, 22, 0.3)';
            pulse.style.borderRadius = '50%';
            pulse.style.transform = 'translate(-50%, -50%) scale(0)';
            pulse.style.animation = 'pulse 0.6s ease-out';
            pulse.style.pointerEvents = 'none';
            this.style.position = 'relative';
            this.appendChild(pulse);
            setTimeout(() => {
                if (pulse.parentNode) {
                    pulse.parentNode.removeChild(pulse);
                }
            }, 600);
        });
    });
}
function handleResize() {
    particlesContainer.innerHTML = '';
    createParticles();
}
window.addEventListener('resize', debounce(handleResize, 250));
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === ctaButton) {
            e.preventDefault();
            ctaButton.click();
        }
    }
});
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
function optimizePerformance() {
    if (window.innerWidth < 768) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) {
                particle.style.display = 'none';
            }
        });
    }
    document.addEventListener('visibilitychange', function() {
        const particles = document.querySelectorAll('.particle');
        if (document.hidden) {
            particles.forEach(particle => {
                particle.style.animationPlayState = 'paused';
            });
        } else {
            particles.forEach(particle => {
                particle.style.animationPlayState = 'running';
            });
        }
    });
}
optimizePerformance();
console.log(`
🚀 Hackathon Rio Branco 2025 - Countdown
📅 Target Date: August 1st, 2025
⚡ Built with modern web technologies
🎨 Designed for maximum impact

Developed for Faculdades Integradas Rio Branco
`);
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Future: Send to analytics service
}
trackEvent('countdown_page_loaded', {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    }
});
ctaButton.addEventListener('click', function() {
    trackEvent('cta_button_clicked', {
        timestamp: new Date().toISOString(),
        buttonText: this.textContent.trim()
    });
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCountdown,
        createParticles,
        trackEvent
    };
}


