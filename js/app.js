// Global data object
let portfolioData = null;

// Initialize the application
async function initApp() {
    try {
        // Load data from JSON
        const response = await fetch('data/data.json');
        portfolioData = await response.json();
        
        // Initialize all components
        initTheme();
        initScrollEffects();
        initNavigation();
        initHero();
        initEducation();
        initSkills();
        initTimeline();
        initServices();
        initProjects();
        initArticles();
        initContact();
        initParallax();
        initAnimations();
        initBackgroundEffects();
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Theme Toggle with localStorage
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    if (initialTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        
        if (currentTheme === 'dark' || !currentTheme) {
            html.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Advanced scroll effects
function initScrollEffects() {
    const topBar = document.querySelector('.top-bar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Hide/show top bar
        if (currentScroll > 100) {
            topBar.classList.add('hidden');
        } else {
            topBar.classList.remove('hidden');
        }
        
        // Parallax effect for hero
        const hero = document.querySelector('.hero');
        if (hero && currentScroll < hero.offsetHeight) {
            hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
            hero.style.opacity = 1 - (currentScroll / hero.offsetHeight);
        }
        
        lastScroll = currentScroll;
    });
}

// Smooth navigation
function initNavigation() {
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
}

// Dynamic Hero section
function initHero() {
    if (!portfolioData) return;
    
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    // Typing animation
    typeWriter(heroTitle, portfolioData.profile.name, 0, 100);
    
    // Animated gradient background
    createFloatingElements();
}

// Typing animation effect
function typeWriter(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1, speed), speed);
    }
}

// Dynamic floating elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${5 + Math.random() * 10}s`;
        hero.appendChild(particle);
    }
}

// Dynamic Education section
function initEducation() {
    if (!portfolioData) return;
    
    const educationContainer = document.querySelector('.about-content');
    if (!educationContainer) return;
    
    const educationHTML = portfolioData.education.map(edu => `
        <div class="education-card" data-aos="fade-up">
            <span class="year">${edu.year}</span>
            <h4>${edu.degree}</h4>
            <p>${edu.institution}</p>
        </div>
    `).join('');
    
    educationContainer.innerHTML = `<h3>Eğitim</h3>${educationHTML}`;
}

// Dynamic Skills with animation
function initSkills() {
    if (!portfolioData) return;
    
    const skillsContainer = document.querySelector('.skills-content');
    if (!skillsContainer) return;
    
    const skillsHTML = portfolioData.skills.map(skill => `
        <div class="skill-item" data-aos="fade-left">
            <div class="skill-header">
                <span>${skill.name}</span>
                <span class="skill-percentage">0%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-progress="${skill.level}" style="width: 0%"></div>
            </div>
        </div>
    `).join('');
    
    skillsContainer.innerHTML = `<h3>Yetenekler</h3>${skillsHTML}`;
    
    // Animate skill bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(skillsContainer);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
            
            const percentage = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
            animateCounter(percentage, 0, parseInt(progress), 1500);
        }, index * 200);
    });
}

function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = `${end}%`;
            clearInterval(timer);
        } else {
            element.textContent = `${Math.floor(current)}%`;
        }
    }, 16);
}

// Dynamic Timeline
function initTimeline() {
    if (!portfolioData) return;
    
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (!timelineWrapper) return;
    
    const timelineHTML = portfolioData.timeline.map((item, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}" data-aos="fade-${index % 2 === 0 ? 'right' : 'left'}">
            <div class="timeline-content">
                <span class="timeline-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="timeline-dot"></div>
        </div>
    `).join('');
    
    timelineWrapper.innerHTML = `<div class="timeline-line"></div>${timelineHTML}`;
}

// Dynamic Services Carousel
function initServices() {
    if (!portfolioData) return;
    
    const carouselTrack = document.getElementById('carouselTrack');
    const indicators = document.getElementById('carouselIndicators');
    
    if (!carouselTrack || !indicators) return;
    
    const servicesHTML = portfolioData.services.map(service => `
        <div class="service-slide">
            <div class="service-card-carousel" data-aos="zoom-in">
                <div class="service-icon">
                    <i class="fas ${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    
    const indicatorsHTML = portfolioData.services.map((_, index) => `
        <span class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
    `).join('');
    
    carouselTrack.innerHTML = servicesHTML;
    indicators.innerHTML = indicatorsHTML;
    
    initCarousel();
}

// Enhanced Carousel functionality
function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.service-slide').length;
    let autoplayInterval;
    let isAnimating = false;
    
    function updateCarousel(animate = true) {
        if (isAnimating && animate) return;
        isAnimating = true;
        
        const offset = -currentSlide * 100;
        carouselTrack.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            currentSlide = index;
            updateCarousel();
            startAutoplay();
        });
    });
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        
        // Touch swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextSlide();
            if (touchEndX > touchStartX + 50) prevSlide();
            startAutoplay();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        }
    });
    
    startAutoplay();
}

// Dynamic Projects
function initProjects() {
    if (!portfolioData) return;
    
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    const projectsHTML = portfolioData.projects.map((project, index) => `
        <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/placeholder.jpg'">
                <div class="project-overlay">
                    <a href="${project.link}" class="project-link"><i class="fas fa-external-link-alt"></i></a>
                    <a href="${project.github}" class="project-link"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    projectsGrid.innerHTML = projectsHTML;
    
    // Animate project stats
    animateStats('projectsCount', portfolioData.projects.length, 2000);
    
    // Calculate total views (you can add this to your data.json)
    const totalViews = portfolioData.projects.reduce((acc, project) => acc + (project.views || 0), 0) || 1500;
    animateStats('projectViews', totalViews, 2000);
}

// Dynamic Articles
function initArticles() {
    if (!portfolioData) return;
    
    const writingsGrid = document.getElementById('writingsGrid');
    if (!writingsGrid) return;
    
    const articlesHTML = portfolioData.articles.map((article, index) => `
        <div class="article-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" onerror="this.src='assets/placeholder.jpg'">
                <span class="article-category">${article.category}</span>
                <div class="article-overlay">
                    <a href="${article.link}" class="article-link" title="View Article">
                        <i class="fas fa-eye"></i>
                    </a>
                    ${article.externalLink ? `
                        <a href="${article.externalLink}" class="article-link" target="_blank" rel="noopener noreferrer" title="External Link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
                    <span><i class="far fa-clock"></i> ${article.readTime}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                ${article.tags ? `
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    writingsGrid.innerHTML = articlesHTML;
    
    // Animate article stats
    animateStats('articlesCount', portfolioData.articles.length, 2000);
    
    // Calculate total views
    const totalViews = portfolioData.articles.reduce((acc, article) => acc + (article.views || 0), 0) || 2500;
    animateStats('viewsCount', totalViews, 2000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Contact Form with validation
function initContact() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!validateEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading
        const submitBtn = contactForm.querySelector('.btn-send');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Parallax effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for sections
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Initialize background effects
function initBackgroundEffects() {
    createStarsBackground();
    createGlowOrbs();
    createAurora();
    createNebulas();
    createGridPattern();
    createShootingStars();
    createComets();
    createSparkles();
    createConnectLines();
    createPulseRings();
    createGlobalParticles();
}

// Create stars background - only for hero
function createStarsBackground() {
    const hero = document.querySelector('.hero');
    const container = document.createElement('div');
    container.className = 'stars-container';
    hero.appendChild(container);
    
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        container.appendChild(star);
    }
}

// Create glowing orbs - more orbs
function createGlowOrbs() {
    const body = document.body;
    
    for (let i = 1; i <= 4; i++) {
        const orb = document.createElement('div');
        orb.className = `glow-orb orb-${i}`;
        body.appendChild(orb);
    }
}

// Create aurora effect
function createAurora() {
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    document.body.appendChild(aurora);
}

// Create nebula clouds
function createNebulas() {
    const body = document.body;
    
    for (let i = 1; i <= 2; i++) {
        const nebula = document.createElement('div');
        nebula.className = `nebula nebula-${i}`;
        body.appendChild(nebula);
    }
}

// Create shooting stars - more frequent
function createShootingStars() {
    const body = document.body;
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = `${Math.random() * 60}%`;
        star.style.left = `${50 + Math.random() * 50}%`;
        star.style.animationDuration = `${1.5 + Math.random() * 1}s`;
        body.appendChild(star);
        
        setTimeout(() => star.remove(), 2500);
    }, 800);
}

// Create comets
function createComets() {
    const body = document.body;
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const comet = document.createElement('div');
            comet.className = 'comet';
            comet.style.top = `${Math.random() * 40}%`;
            comet.style.left = `${Math.random() * 50}%`;
            comet.style.animationDelay = '0s';
            body.appendChild(comet);
            
            setTimeout(() => comet.remove(), 4000);
        }
    }, 3000);
}

// Create sparkles
function createSparkles() {
    const body = document.body;
    
    setInterval(() => {
        if (Math.random() > 0.5) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${50 + Math.random() * 50}%`;
            sparkle.style.animationDelay = '0s';
            body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 4000);
        }
    }, 500);
}

// Create connecting lines - more lines
function createConnectLines() {
    const container = document.createElement('div');
    container.className = 'connect-lines';
    document.body.appendChild(container);
    
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'connect-line';
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${300 + Math.random() * 500}px`;
        line.style.animationDelay = `${i * 0.8}s`;
        line.style.animationDuration = `${5 + Math.random() * 3}s`;
        container.appendChild(line);
    }
}

// Create pulse rings - more frequent
function createPulseRings() {
    const body = document.body;
    
    setInterval(() => {
        if (Math.random() > 0.6) {
            const ring = document.createElement('div');
            ring.className = 'pulse-ring';
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.top = `${Math.random() * 100}%`;
            ring.style.left = `${Math.random() * 100}%`;
            body.appendChild(ring);
            
            setTimeout(() => ring.remove(), 4000);
        }
    }, 2000);
}

// Create global floating particles - more particles
function createGlobalParticles() {
    const container = document.createElement('div');
    container.className = 'floating-particles';
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle ' + ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--x', `${Math.random() * 400 - 200}px`);
        particle.style.setProperty('--y', `${Math.random() * 400 - 200}px`);
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${10 + Math.random() * 12}s`;
        container.appendChild(particle);
    }
}

// Animate stats counter with enhanced effects
function animateStats(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const startValue = 0;
                const increment = targetValue / (duration / 16);
                let currentValue = startValue;
                
                // Add data attribute for CSS effects
                element.setAttribute('data-value', targetValue);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        element.innerHTML = `${targetValue}<span class="stat-plus">+</span>`;
                        clearInterval(counter);
                        element.classList.add('stat-number-animated');
                        
                        // Add floating numbers effect
                        createFloatingNumbers(element.parentElement, targetValue);
                    } else {
                        element.innerHTML = `${Math.floor(currentValue)}<span class="stat-plus">+</span>`;
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(element);
}

// Create floating number particles
function createFloatingNumbers(container, value) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('span');
        particle.className = 'floating-number';
        particle.textContent = '+' + Math.floor(Math.random() * 10);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initApp);
// initCursorEffect(); // Uncomment for custom cursor
