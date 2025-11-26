// Global data object
let portfolioData = null;

// Initialize the application
async function initApp() {
    try {
        // Show loading screen
        showLoadingScreen();
        
        // Load data from JSON
        const response = await fetch('./data/data.json');
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
        
        // PAKET 2 FEATURES - Interactive Master
        initCustomCursor();
        initScrollProgress();
        initMagneticButtons();
        initTextAnimations();
        initPageTransitions();
        init3DCards();
        initRippleEffect();
        initConfetti();
        initGlitchEffect();
        initPremiumCards(); // Card enhancements
        initFlipCards(); // Flip animation
        initParticleTrails(); // Mouse trails
        initProgressRings(); // Hover progress
        
        // Hide loading screen
        setTimeout(hideLoadingScreen, 1500);
        
    } catch (error) {
        console.error('Error loading data:', error);
        hideLoadingScreen();
    }
}

// Theme Toggle with localStorage
function initTheme() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
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
    
    // Animated gradient background
    createFloatingElements();
    
    // NEW: Typewriter effect for subtitle
    startTypewriterEffect();
}

// NEW: Typewriter effect function
function startTypewriterEffect() {
    const texts = [
        'Full Stack Developer',
        'Cybersecurity Enthusiast',
        'Problem Solver',
        'Tech Innovator'
    ];
    
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
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
    enhanceScrollAnimations();
    enhanceCounterAnimations();
    initMouseParallax();
    initImageParallax(); // NEW
    initCategoryColors(); // NEW
    initStaggerGrid(); // NEW
    initMicroInteractions(); // NEW
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
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        element.textContent = targetValue;
                        clearInterval(counter);
                        element.classList.add('stat-number-animated');
                        
                        // Add floating numbers effect - FIXED POSITIONING
                        createFloatingNumbers(element, targetValue);
                    } else {
                        element.textContent = Math.floor(currentValue);
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(element);
}

// Create floating number particles - COMPLETELY FIXED
function createFloatingNumbers(element, value) {
    const statItem = element.closest('.stat-item');
    if (!statItem) return;
    
    const rect = statItem.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Create 3 particles around the stat number
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('span');
        particle.className = 'floating-number';
        particle.textContent = '+' + Math.floor(Math.random() * Math.max(1, value / 10));
        
        // Calculate position in a circle around center
        const angle = (360 / 3) * i - 90; // Start from top
        const radius = 60;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        particle.style.position = 'absolute';
        particle.style.left = `${centerX + x}px`;
        particle.style.top = `${centerY + y}px`;
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.animationDelay = `${i * 0.15}s`;
        
        // Add to stat-item (not to element)
        statItem.style.position = 'relative';
        statItem.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// ===================================
// PAKET 2 FEATURES - Interactive Master
// ===================================

// 1. PREMIUM CARD ENHANCEMENTS
function initPremiumCards() {
    const cards = document.querySelectorAll('.project-card, .article-card');
    
    cards.forEach((card, index) => {
        // Existing enhancements
        addMagneticEffect(card);
        addDynamicShadow(card);
        addGlassMorphism(card);
        addHoverAnimation(card);
        
        // NEW ULTRA FEATURES
        addGradientBorder(card);
        addNeonGlow(card);
        addQuickActionsBar(card);
        addLikeButton(card);
        addTechStackIcons(card);
        addDifficultyBadge(card);
        addPopularityIndicator(card, index);
        addExpandableView(card);
        addChainReaction(card, index);
        addInstantFeedback(card);
    });
}

function addMagneticEffect(card) {
    const magneticRange = 80;
    let rafId = null;
    
    card.addEventListener('mouseenter', () => {
        const animate = (e) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - cardCenterX;
            const distanceY = e.clientY - cardCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
            
            if (distance < magneticRange) {
                const pullStrength = 1 - (distance / magneticRange);
                const pullX = distanceX * pullStrength * 0.15;
                const pullY = distanceY * pullStrength * 0.15;
                
                card.style.transform = `translate(${pullX}px, ${pullY}px)`;
            }
        };
        
        const onMouseMove = (e) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => animate(e));
        };
        
        card.addEventListener('mousemove', onMouseMove);
        
        card.addEventListener('mouseleave', () => {
            card.removeEventListener('mousemove', onMouseMove);
            card.style.transition = 'transform 0.4s ease-out';
            card.style.transform = '';
            setTimeout(() => card.style.transition = '', 400);
        }, { once: true });
    });
}

function addDynamicShadow(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const shadowX = (x - centerX) / 8;
        const shadowY = (y - centerY) / 8;
        
        card.style.boxShadow = `
            ${-shadowX}px ${-shadowY}px 40px rgba(0, 0, 0, 0.4),
            ${shadowX * 2}px ${shadowY * 2}px 80px var(--glow)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'box-shadow 0.4s ease';
        card.style.boxShadow = '';
        setTimeout(() => card.style.transition = '', 400);
    });
}

function addGlassMorphism(card) {
    const overlay = card.querySelector('.project-overlay, .article-overlay');
    if (overlay) {
        overlay.style.backdropFilter = 'blur(20px) saturate(180%)';
        overlay.style.background = 'rgba(124, 58, 237, 0.15)';
        overlay.style.border = '1px solid rgba(255, 255, 255, 0.18)';
    }
}

function addHoverAnimation(card) {
    const image = card.querySelector('img');
    if (!image) return;
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.15)';
        image.style.filter = 'brightness(0.85)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = '';
        image.style.filter = '';
    });
}

// 1. ANIMATED GRADIENT BORDER
function addGradientBorder(card) {
    const border = document.createElement('div');
    border.className = 'card-gradient-border';
    card.style.position = 'relative';
    card.appendChild(border);
    
    card.addEventListener('mouseenter', () => {
        border.classList.add('active');
    });
    
    card.addEventListener('mouseleave', () => {
        border.classList.remove('active');
    });
}

// 2. NEON GLOW PULSE
function addNeonGlow(card) {
    card.addEventListener('mouseenter', () => {
        card.classList.add('neon-glow-active');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('neon-glow-active');
    });
}

// 3. QUICK ACTIONS BAR
function addQuickActionsBar(card) {
    const actionsBar = document.createElement('div');
    actionsBar.className = 'card-quick-actions';
    actionsBar.innerHTML = `
        <button class="quick-action" data-action="view" title="Quick View">
            <i class="fas fa-eye"></i>
        </button>
        <button class="quick-action" data-action="copy" title="Copy Link">
            <i class="fas fa-link"></i>
        </button>
        <button class="quick-action" data-action="share" title="Share">
            <i class="fas fa-share-alt"></i>
        </button>
    `;
    
    const content = card.querySelector('.project-content, .article-content');
    if (content) {
        content.insertBefore(actionsBar, content.firstChild);
    }
    
    // Event listeners
    actionsBar.querySelectorAll('.quick-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            handleQuickAction(action, card);
            
            // Visual feedback
            btn.classList.add('action-clicked');
            setTimeout(() => btn.classList.remove('action-clicked'), 300);
        });
    });
}

function handleQuickAction(action, card) {
    const title = card.querySelector('h3')?.textContent || 'Item';
    
    switch(action) {
        case 'view':
            showQuickPreview(card);
            break;
        case 'copy':
            copyCardLink(card);
            showMiniToast('Link copied!', card);
            break;
        case 'share':
            showSharePopup(card);
            break;
    }
}

function showQuickPreview(card) {
    const modal = document.createElement('div');
    modal.className = 'quick-preview-modal';
    
    const title = card.querySelector('h3')?.textContent || 'Preview';
    const description = card.querySelector('p')?.textContent || '';
    const image = card.querySelector('img')?.src || '';
    
    modal.innerHTML = `
        <div class="quick-preview-content">
            <button class="quick-preview-close"><i class="fas fa-times"></i></button>
            <img src="${image}" alt="${title}">
            <div class="quick-preview-info">
                <h2>${title}</h2>
                <p>${description}</p>
                <div class="quick-preview-actions">
                    <button class="btn btn-primary">View Full</button>
                    <button class="btn btn-outline">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    modal.querySelector('.quick-preview-close').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.btn-outline').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function copyCardLink(card) {
    const link = window.location.href + '#' + (card.id || 'card');
    navigator.clipboard.writeText(link);
}

function showMiniToast(message, card) {
    const toast = document.createElement('div');
    toast.className = 'mini-toast';
    toast.textContent = message;
    
    const rect = card.getBoundingClientRect();
    toast.style.top = `${rect.top + window.scrollY - 50}px`;
    toast.style.left = `${rect.left + rect.width / 2}px`;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// 4. LIKE BUTTON WITH ANIMATION
function addLikeButton(card) {
    const likeBtn = document.createElement('button');
    likeBtn.className = 'card-like-btn';
    likeBtn.innerHTML = '<i class="far fa-heart"></i>';
    
    const cardId = card.dataset.id || Math.random().toString(36).substr(2, 9);
    card.dataset.id = cardId;
    
    // Check if liked
    const likes = JSON.parse(localStorage.getItem('portfolio_likes') || '{}');
    if (likes[cardId]) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(cardId, likeBtn);
    });
    
    const image = card.querySelector('.project-image, .article-image');
    if (image) {
        image.appendChild(likeBtn);
    }
}

function toggleLike(cardId, button) {
    const likes = JSON.parse(localStorage.getItem('portfolio_likes') || '{}');
    
    if (likes[cardId]) {
        delete likes[cardId];
        button.classList.remove('liked');
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.classList.add('unliked-animation');
    } else {
        likes[cardId] = Date.now();
        button.classList.add('liked');
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.classList.add('liked-animation');
        
        // Hearts burst animation
        createHeartsBurst(button);
    }
    
    localStorage.setItem('portfolio_likes', JSON.stringify(likes));
    
    setTimeout(() => {
        button.classList.remove('liked-animation', 'unliked-animation');
    }, 600);
}

function createHeartsBurst(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = `${rect.left + rect.width / 2}px`;
        heart.style.top = `${rect.top + rect.height / 2}px`;
        heart.style.setProperty('--angle', `${(360 / 8) * i}deg`);
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// 5. TECH STACK WITH ICONS
function addTechStackIcons(card) {
    const tags = card.querySelectorAll('.tag');
    
    const techIcons = {
        'React': 'fab fa-react',
        'Vue': 'fab fa-vuejs',
        'Angular': 'fab fa-angular',
        'Node': 'fab fa-node',
        'Python': 'fab fa-python',
        'JavaScript': 'fab fa-js',
        'TypeScript': 'fab fa-js-square',
        'Docker': 'fab fa-docker',
        'AWS': 'fab fa-aws',
        'Firebase': 'fas fa-fire',
        'MongoDB': 'fas fa-database',
        'PostgreSQL': 'fas fa-database',
        'GraphQL': 'fas fa-project-diagram'
    };
    
    tags.forEach(tag => {
        const text = tag.textContent.trim();
        const icon = techIcons[text];
        
        if (icon) {
            tag.innerHTML = `<i class="${icon}"></i> ${text}`;
            tag.classList.add('tag-with-icon');
        }
    });
}

// 6. DIFFICULTY BADGE
function addDifficultyBadge(card) {
    // Random difficulty for demo (you can add this to your data)
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const colors = ['#10B981', '#F59E0B', '#EF4444'];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const color = colors[difficulties.indexOf(difficulty)];
    
    const badge = document.createElement('div');
    badge.className = 'difficulty-badge';
    badge.textContent = difficulty;
    badge.style.background = color;
    
    const content = card.querySelector('.project-content, .article-content');
    if (content) {
        content.appendChild(badge);
    }
}

// 7. POPULARITY INDICATOR (Stars/Views)
function addPopularityIndicator(card, index) {
    const popularity = Math.floor(Math.random() * 5) + 1; // 1-5 stars
    const views = Math.floor(Math.random() * 1000) + 100;
    
    const indicator = document.createElement('div');
    indicator.className = 'popularity-indicator';
    indicator.innerHTML = `
        <div class="popularity-stars">
            ${Array(5).fill(0).map((_, i) => `
                <i class="fas fa-star ${i < popularity ? 'active' : ''}"></i>
            `).join('')}
        </div>
        <div class="popularity-views">
            <i class="fas fa-eye"></i> ${views}
        </div>
    `;
    
    const image = card.querySelector('.project-image, .article-image');
    if (image) {
        image.appendChild(indicator);
    }
}

// 8. EXPANDABLE VIEW
function addExpandableView(card) {
    card.addEventListener('dblclick', () => {
        card.classList.toggle('expanded');
        
        if (card.classList.contains('expanded')) {
            // Disable body scroll
            document.body.style.overflow = 'hidden';
            
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'card-expand-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('expanded');
                document.body.style.overflow = '';
                closeBtn.remove();
            });
            card.appendChild(closeBtn);
        } else {
            document.body.style.overflow = '';
            card.querySelector('.card-expand-close')?.remove();
        }
    });
}

// 9. CHAIN REACTION (Cards affect neighbors)
function addChainReaction(card, index) {
    card.addEventListener('mouseenter', () => {
        // Get all cards
        const allCards = document.querySelectorAll('.project-card, .article-card');
        
        // Affect previous card
        if (index > 0) {
            allCards[index - 1]?.classList.add('neighbor-hovered');
        }
        
        // Affect next card
        if (index < allCards.length - 1) {
            allCards[index + 1]?.classList.add('neighbor-hovered');
        }
    });
    
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.neighbor-hovered').forEach(c => {
            c.classList.remove('neighbor-hovered');
        });
    });
}

// 10. INSTANT FEEDBACK
function addInstantFeedback(card) {
    // Add ripple on any click
    card.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'card-click-ripple';
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    });
    
    // Add hover sound (optional - can be disabled)
    // card.addEventListener('mouseenter', () => {
    //     playHoverSound();
    // });
}

// ==================================
// PREMIUM FEATURES - PAKET C
// ===================================

// 1. LOADING SCREEN
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.className = 'page-loader active';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="loader-text">
                <span class="loading-text">Loading</span>
                <span class="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                </span>
            </div>
            <div class="loader-progress">
                <div class="progress-bar" id="loaderProgress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Animate progress bar
    let progress = 0;
    const progressBar = document.getElementById('loaderProgress');
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
}

function hideLoadingScreen() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
    document.querySelectorAll('.animate-on-load').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });
}

// 2. CUSTOM CURSOR
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    cursor.appendChild(cursorDot);
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;
        
        cursorX += distX * 0.1;
        cursorY += distY * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .article-card, .service-card-carousel');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
    });
}

// 4. SCROLL PROGRESS INDICATOR
function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progress);
    
    const progressBar = progress.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
    
    // Section indicators
    const sections = document.querySelectorAll('section[id]');
    const sectionIndicators = document.createElement('div');
    sectionIndicators.className = 'section-indicators';
    
    sections.forEach((section, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'section-indicator';
        indicator.setAttribute('data-section', section.id);
        indicator.setAttribute('aria-label', `Go to ${section.id}`);
        indicator.innerHTML = `<span class="indicator-dot"></span>`;
        
        indicator.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        sectionIndicators.appendChild(indicator);
    });
    
    document.body.appendChild(sectionIndicators);
    
    // Update active indicator
    const updateActiveIndicator = () => {
        const indicators = document.querySelectorAll('.section-indicator');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[index]?.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveIndicator);
    updateActiveIndicator();
}

// 5. MAGNETIC BUTTONS
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .carousel-btn, .project-link, .article-link');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// 6. TEXT ANIMATIONS
function initTextAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let index = 0;
        const typeSpeed = 100;
        
        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typeSpeed);
            } else {
                heroTitle.classList.add('typing-complete');
            }
        }
        
        setTimeout(type, 500);
    }
    
    // Split text animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.className = 'char-animate';
            title.appendChild(span);
        });
    });
}

// 7. PAGE TRANSITIONS
function initPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.innerHTML = `
        <div class="transition-layer"></div>
        <div class="transition-layer"></div>
        <div class="transition-layer"></div>
    `;
    document.body.appendChild(overlay);
    
    // Intercept internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                overlay.classList.add('active');
                
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    setTimeout(() => {
                        overlay.classList.remove('active');
                    }, 400);
                }, 600);
            }
        });
    });
}

// 8. 3D CARD TILT EFFECT
function init3DCards() {
    const cards = document.querySelectorAll('.project-card, .article-card, .service-card-carousel, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// 9. RIPPLE EFFECT
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, button, .mobile-nav-link');
    
    rippleElements.forEach(el => {
        el.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 10. CONFETTI EFFECT
function initConfetti() {
    // Trigger confetti on certain actions
    window.celebrateWithConfetti = function(x = window.innerWidth / 2, y = 0) {
        const colors = ['#7C3AED', '#A78BFA', '#C084FC', '#E9ECEF', '#FFD700'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.setProperty('--tx', `${Math.random() * 400 - 200}px`);
            confetti.style.setProperty('--ty', `${Math.random() * 400 + 200}px`);
            confetti.style.setProperty('--r', `${Math.random() * 360}deg`);
            confetti.style.animationDelay = `${Math.random() * 0.1}s`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 2000);
        }
    };
    
    // Example: Confetti when form is submitted successfully
    const originalShowNotification = window.showNotification;
    window.showNotification = function(message, type) {
        if (type === 'success') {
            celebrateWithConfetti();
        }
        if (originalShowNotification) {
            originalShowNotification(message, type);
        }
    };
}

// 11. GLITCH EFFECT
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(el => {
        const text = el.textContent;
        el.setAttribute('data-text', text);
        
        el.addEventListener('mouseenter', () => {
            el.classList.add('glitch-active');
            setTimeout(() => el.classList.remove('glitch-active'), 1000);
        });
    });
    
    // Random glitch on page load
    setTimeout(() => {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        if (randomElement) {
            randomElement.classList.add('glitch-active');
            setTimeout(() => randomElement.classList.remove('glitch-active'), 1000);
        }
    }, 2000);
}

// 12. SCROLL REVEAL WITH STAGGER
function enhanceScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// 13. SMOOTH MOUSE PARALLAX
function initMouseParallax() {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        const parallaxElements = document.querySelectorAll('[data-parallax-mouse]');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallaxMouse || 0.5;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 14. INTERSECTION OBSERVER FOR COUNTERS
function enhanceCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Prevent horizontal scroll on mobile
document.body.style.overflowX = 'hidden';
document.documentElement.style.overflowX = 'hidden';

// Fix iOS button tap delay
document.addEventListener('touchstart', function() {}, {passive: true});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function toggleTheme() {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

// Theme toggle - both click and touch
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('touchend', function(e) {
    e.preventDefault();
    toggleTheme();
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    mobileNavBackdrop.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileMenuToggle.addEventListener('touchend', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
});

mobileNavBackdrop.addEventListener('click', toggleMobileMenu);
mobileNavBackdrop.addEventListener('touchend', function(e) {
    e.preventDefault();
    toggleMobileMenu();
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    function handleNavClick(e) {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        
        // Close menu
        mobileNav.classList.remove('active');
        mobileNavBackdrop.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        
        // Smooth scroll
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    }
    
    link.addEventListener('click', handleNavClick);
    link.addEventListener('touchend', handleNavClick);
});

// Typing Effect
const typingTexts = [
    'Full Stack Developer',
    'Cybersecurity Enthusiast',
    'Problem Solver',
    'Tech Innovator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function type() {
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
}

setTimeout(type, 1000);

// Hero Title Animation
const heroTitle = document.querySelector('.hero-title .title-line');
if (heroTitle) {
    heroTitle.textContent = 'Ahmet Alha Çalışkan';
}

// Services Carousel
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.service-slide').length;
let autoPlayInterval;

function updateCarousel() {
    if (!carouselTrack) return;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Carousel prev button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        resetAutoPlay();
    });
}

// Carousel next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    nextBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        resetAutoPlay();
    });
}

// Carousel indicators
indicators.forEach((indicator, index) => {
    function setSlide(e) {
        e.preventDefault();
        e.stopPropagation();
        currentSlide = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    indicator.addEventListener('click', setSlide);
    indicator.addEventListener('touchend', setSlide);
});

// Touch/Swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;

if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetAutoPlay();
    }
}

startAutoPlay();

// Pause autoplay when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoPlayInterval);
    } else {
        startAutoPlay();
    }
});

// Projects Data
const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'Modern ve responsive e-ticaret sitesi',
        image: 'https://via.placeholder.com/400x250/7C3AED/ffffff?text=E-Commerce',
        technologies: ['React', 'Node.js', 'MongoDB'],
        github: 'https://github.com',
        demo: 'https://example.com'
    },
    {
        title: 'Security Scanner',
        description: 'Otomatik güvenlik tarama aracı',
        image: 'https://via.placeholder.com/400x250/7C3AED/ffffff?text=Security',
        technologies: ['Python', 'Flask', 'SQLite'],
        github: 'https://github.com',
        demo: 'https://example.com'
    },
    {
        title: 'Portfolio Website',
        description: 'Kişisel portfolio web sitesi',
        image: 'https://via.placeholder.com/400x250/7C3AED/ffffff?text=Portfolio',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com',
        demo: 'https://example.com'
    }
];

// Load Projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Articles Data
const articles = [
    {
        title: 'Modern Web Development Trends 2024',
        excerpt: 'Web geliştirme dünyasındaki son trendler ve teknolojiler',
        date: '15 Mart 2024',
        readTime: '5 dk',
        category: 'Web Development',
        link: '#'
    },
    {
        title: 'Cybersecurity Best Practices',
        excerpt: 'Siber güvenlikte dikkat edilmesi gereken önemli noktalar',
        date: '10 Mart 2024',
        readTime: '7 dk',
        category: 'Security',
        link: '#'
    },
    {
        title: 'React Performance Optimization',
        excerpt: 'React uygulamalarında performans optimizasyonu teknikleri',
        date: '5 Mart 2024',
        readTime: '6 dk',
        category: 'React',
        link: '#'
    }
];

// Load Articles
function loadArticles() {
    const writingsGrid = document.getElementById('writingsGrid');
    if (!writingsGrid) return;
    
    writingsGrid.innerHTML = articles.map(article => `
        <article class="writing-card">
            <div class="writing-category">${article.category}</div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="writing-meta">
                <span><i class="fas fa-calendar"></i> ${article.date}</span>
                <span><i class="fas fa-clock"></i> ${article.readTime}</span>
            </div>
            <a href="${article.link}" class="writing-link">
                Devamını Oku <i class="fas fa-arrow-right"></i>
            </a>
        </article>
    `).join('');
}

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            
            const projectsCount = section.querySelector('#projectsCount');
            const projectViews = section.querySelector('#projectViews');
            const articlesCount = section.querySelector('#articlesCount');
            const viewsCount = section.querySelector('#viewsCount');
            
            if (projectsCount && !projectsCount.classList.contains('animated')) {
                animateCounter(projectsCount, 15);
                projectsCount.classList.add('animated');
            }
            if (projectViews && !projectViews.classList.contains('animated')) {
                animateCounter(projectViews, 1000);
                projectViews.classList.add('animated');
            }
            if (articlesCount && !articlesCount.classList.contains('animated')) {
                animateCounter(articlesCount, 25);
                articlesCount.classList.add('animated');
            }
            if (viewsCount && !viewsCount.classList.contains('animated')) {
                animateCounter(viewsCount, 5000);
                viewsCount.classList.add('animated');
            }
            
            counterObserver.unobserve(section);
        }
    });
}, observerOptions);

// Observe stats sections
document.querySelectorAll('.stats-container').forEach(stat => {
    counterObserver.observe(stat);
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    function handleFormSubmit(e) {
        e.preventDefault();
        alert('Mesajınız alındı! En kısa sürede dönüş yapacağım.');
        contactForm.reset();
    }
    
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Smooth Scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    function handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    anchor.addEventListener('click', handleSmoothScroll);
    anchor.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleSmoothScroll(e);
    });
});

// Hero buttons - Enhanced touch support
document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
    btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    }, {passive: true});
    
    btn.addEventListener('touchend', function(e) {
        this.style.transform = 'scale(1)';
        // Let the href work naturally
    }, {passive: true});
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadArticles();
    
    // Add active class styles for touch feedback
    const style = document.createElement('style');
    style.textContent = `
        .active-touch {
            opacity: 0.8 !important;
            transform: scale(0.95) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add touch feedback to all interactive elements
    document.querySelectorAll('button, .btn, a.btn, .mobile-nav-link, .project-link, .writing-link, .social-links-contact a').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('active-touch');
        }, {passive: true});
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('active-touch');
            }, 200);
        }, {passive: true});
        
        el.addEventListener('touchcancel', function() {
            this.classList.remove('active-touch');
        }, {passive: true});
    });
});
