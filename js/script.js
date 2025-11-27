// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// Name Typing Animation
const nameText = document.getElementById('nameText');
const fullName = 'AHMET TALHA ÇALIŞKAN';
let nameIndex = 0;

function typeName() {
    if (nameIndex < fullName.length) {
        nameText.textContent = fullName.substring(0, nameIndex + 1);
        nameIndex++;
        setTimeout(typeName, 100);
    } else {
        // Remove cursor border after typing completes
        setTimeout(() => {
            nameText.style.animation = 'none';
            nameText.style.borderRight = 'none';
        }, 1000);
    }
}

// Start name typing after a short delay
setTimeout(typeName, 500);

// Typing Effect
const typingContainer = document.querySelector('.typing-container');
const texts = [
    'Full Stack Developer',
    'Cybersecurity Enthusiast',
    'Problem Solver',
    'Code Lover'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingContainer.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
        charIndex--;
        typingSpeed = 50;
    } else {
        typingContainer.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// Smooth Scroll
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

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Profile image animation on hover
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transform = 'scale(1.05) rotate(5deg)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Add parallax effect to rings on mouse move
document.addEventListener('mousemove', (e) => {
    const rings = document.querySelectorAll('.profile-ring');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    rings.forEach((ring, index) => {
        const speed = (index + 1) * 5;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        ring.style.transform = `translate(${xMove}px, ${yMove}px) scale(${1 + index * 0.05})`;
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.btn').forEach(btn => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';
    btn.style.transition = 'all 0.6s ease';
    observer.observe(btn);
});

// Logo animation on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const logo = document.querySelector('.logo-wrapper');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        logo.style.transform = 'translateY(-100px)';
    } else {
        logo.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Add entrance animation
window.addEventListener('load', () => {
    const profileWrapper = document.querySelector('.profile-wrapper');
    const buttons = document.querySelectorAll('.btn');
    
    profileWrapper.style.opacity = '0';
    profileWrapper.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        profileWrapper.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        profileWrapper.style.opacity = '1';
        profileWrapper.style.transform = 'scale(1)';
    }, 200);
    
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });
});

// Career Timeline Navigation
const timelineTrack = document.getElementById('timelineTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const timelineWrapper = document.querySelector('.timeline-track-wrapper');

if (timelineTrack && prevBtn && nextBtn && timelineWrapper) {
    let scrollAmount = 0;
    const cardWidth = 350 + 30; // card width + gap

    // Update button states
    function updateButtonStates() {
        const maxScroll = timelineWrapper.scrollWidth - timelineWrapper.clientWidth;
        prevBtn.disabled = timelineWrapper.scrollLeft <= 0;
        nextBtn.disabled = timelineWrapper.scrollLeft >= maxScroll - 10;
    }

    // Initial button state
    updateButtonStates();

    // Previous button
    prevBtn.addEventListener('click', () => {
        scrollAmount = timelineWrapper.scrollLeft - cardWidth;
        timelineWrapper.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateButtonStates, 300);
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        scrollAmount = timelineWrapper.scrollLeft + cardWidth;
        timelineWrapper.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateButtonStates, 300);
    });

    // Update buttons on scroll
    timelineWrapper.addEventListener('scroll', () => {
        updateButtonStates();
    });

    // Touch/Mouse drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    timelineWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineWrapper.style.cursor = 'grabbing';
        startX = e.pageX - timelineWrapper.offsetLeft;
        scrollLeft = timelineWrapper.scrollLeft;
    });

    timelineWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        timelineWrapper.style.cursor = 'grab';
    });

    timelineWrapper.addEventListener('mouseup', () => {
        isDown = false;
        timelineWrapper.style.cursor = 'grab';
        updateButtonStates();
    });

    timelineWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        timelineWrapper.scrollLeft = scrollLeft - walk;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        }
    });

    // Animate cards on scroll into view
    const timelineCards = document.querySelectorAll('.timeline-item-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });

    timelineCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });

    // Set cursor style
    timelineWrapper.style.cursor = 'grab';
}

// Services Slider
const servicesSlider = document.getElementById('servicesSlider');
const servicePrevBtn = document.getElementById('servicePrevBtn');
const serviceNextBtn = document.getElementById('serviceNextBtn');
const servicesDots = document.getElementById('servicesDots');

if (servicesSlider && servicePrevBtn && serviceNextBtn && servicesDots) {
    const serviceCards = servicesSlider.querySelectorAll('.service-card');
    let currentServiceIndex = 0;
    const totalServices = serviceCards.length;

    // Create dots
    function createDots() {
        servicesDots.innerHTML = '';
        // Her kart için bir dot (mobil/desktop aynı)
        for (let i = 0; i < totalServices; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            servicesDots.appendChild(dot);
        }
    }

    // Update dots
    function updateDots() {
        const dots = servicesDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentServiceIndex);
        });
    }

    // Update active card
    function updateActiveCard() {
        serviceCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentServiceIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        // Index sınırlandır
        if (index >= totalServices) {
            index = 0;
        } else if (index < 0) {
            index = totalServices - 1;
        }
        
        currentServiceIndex = index;
        const offset = -index * 100;
        servicesSlider.style.transform = `translateX(${offset}%)`;
        updateDots();
        updateActiveCard();
    }

    // Previous slide
    servicePrevBtn.addEventListener('click', () => {
        if (currentServiceIndex > 0) {
            goToSlide(currentServiceIndex - 1);
        } else {
            goToSlide(totalServices - 1);
        }
    });

    // Next slide
    serviceNextBtn.addEventListener('click', () => {
        if (currentServiceIndex < totalServices - 1) {
            goToSlide(currentServiceIndex + 1);
        } else {
            goToSlide(0);
        }
    });

    // Auto slide removed - manual control only

    // Keyboard navigation for services
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            servicePrevBtn.click();
        } else if (e.key === 'ArrowRight') {
            serviceNextBtn.click();
        }
    });

    // Touch swipe support for services
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    const sliderWrapper = servicesSlider.parentElement;

    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isDragging = true;
    }, { passive: true });

    sliderWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // Önizleme için hafif hareket (opsiyonel)
        touchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                if (currentServiceIndex < totalServices - 1) {
                    goToSlide(currentServiceIndex + 1);
                } else {
                    goToSlide(0);
                }
            } else if (diff < 0) {
                // Swipe right - previous
                if (currentServiceIndex > 0) {
                    goToSlide(currentServiceIndex - 1);
                } else {
                    goToSlide(totalServices - 1);
                }
            }
        }
    }

    // Auto-slide removed for better user control

    // Window resize handler - dots'ları yeniden oluştur
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createDots();
            // Mevcut slide'ı güncelle
            goToSlide(currentServiceIndex);
        }, 250);
    });

    // Initialize
    createDots();
    updateActiveCard(); // Set first card as active
    goToSlide(0); // Start with first card
}

// Load projects from localStorage and render them
function loadProjectsFromStorage() {
    const projectsSlider = document.getElementById('projectsSlider');
    if (!projectsSlider) return;
    
    // Get projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (storedProjects.length === 0) return;
    
    storedProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.setAttribute('data-category', project.category.toLowerCase());
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i>
                        </a>` : ''}
                        <a href="#" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category">
                    <i class="fas fa-${getCategoryIcon(project.category)}"></i>
                    <span>${getCategoryName(project.category)}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-stats">
                    <div class="stat">
                        <i class="fas fa-eye"></i>
                        <span>${formatNumber(project.views)}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-heart"></i>
                        <span>${project.likes}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Insert at the beginning
        projectsSlider.insertBefore(projectCard, projectsSlider.firstChild);
    });
}

// Load projects on page load
loadProjectsFromStorage();

// Projects Filter System - Initialize after loading projects
function initProjectSlider() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsSlider = document.getElementById('projectsSlider');
    const projectPrevBtn = document.getElementById('projectPrevBtn');
    const projectNextBtn = document.getElementById('projectNextBtn');
    const projectsDots = document.getElementById('projectsDots');

    let currentProjectIndex = 0;
    let filteredProjects = Array.from(projectCards);

    if (projectsSlider && projectPrevBtn && projectNextBtn && projectsDots) {
    
    // Create dots for projects
    function createProjectDots() {
        projectsDots.innerHTML = '';
        filteredProjects.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToProjectSlide(index));
            projectsDots.appendChild(dot);
        });
    }

    // Update dots
    function updateProjectDots() {
        const dots = projectsDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentProjectIndex);
        });
    }

    // Update buttons state
    function updateProjectButtons() {
        projectPrevBtn.disabled = currentProjectIndex === 0;
        projectNextBtn.disabled = currentProjectIndex === filteredProjects.length - 1;
    }

    // Go to specific slide
    function goToProjectSlide(index) {
        currentProjectIndex = index;
        const offset = -index * 100;
        projectsSlider.style.transform = `translateX(${offset}%)`;
        updateProjectDots();
        updateProjectButtons();
    }

    // Previous slide
    projectPrevBtn.addEventListener('click', () => {
        if (currentProjectIndex > 0) {
            goToProjectSlide(currentProjectIndex - 1);
        }
    });

    // Next slide
    projectNextBtn.addEventListener('click', () => {
        if (currentProjectIndex < filteredProjects.length - 1) {
            goToProjectSlide(currentProjectIndex + 1);
        }
    });

    // Filter functionality
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                filteredProjects = Array.from(projectCards).filter(card => {
                    const category = card.getAttribute('data-category');
                    return filter === 'all' || category === filter;
                });

                // Reset to first slide
                currentProjectIndex = 0;
                goToProjectSlide(0);
                createProjectDots();
                updateProjectButtons();
            });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !projectPrevBtn.disabled) {
            projectPrevBtn.click();
        } else if (e.key === 'ArrowRight' && !projectNextBtn.disabled) {
            projectNextBtn.click();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    projectsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    projectsSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleProjectSwipe();
    });

    function handleProjectSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentProjectIndex < filteredProjects.length - 1) {
                goToProjectSlide(currentProjectIndex + 1);
            } else if (diff < 0 && currentProjectIndex > 0) {
                goToProjectSlide(currentProjectIndex - 1);
            }
        }
    }

    // Initialize
    createProjectDots();
    updateProjectButtons();
    }
}

// Initialize project slider after DOM is fully loaded
setTimeout(() => {
    initProjectSlider();
}, 100);

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe project stats and animate when visible
function initProjectStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.textContent === '0') {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            // Set targets based on actual project count
            if (stat.parentElement.querySelector('.stat-label').textContent.includes('TAMAMLANAN')) {
                stat.setAttribute('data-target', projectCards.length);
            } else if (stat.parentElement.querySelector('.stat-label').textContent.includes('GÖRÜNTÜLEME')) {
                stat.setAttribute('data-target', projectCards.length * 1500);
            }
            statsObserver.observe(stat);
        });
    }
}

// Initialize project stats
setTimeout(() => {
    initProjectStats();
}, 100);

// Project Cards Animation on Scroll
function initProjectCardsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        projectCardsObserver.observe(card);
    });
}

// Initialize project cards animation
setTimeout(() => {
    initProjectCardsAnimation();
}, 100);

// Project Button Click Handlers
document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        console.log(`Preview project: ${projectTitle}`);
        // Add your preview logic here
    });
});

document.querySelectorAll('.github-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        console.log(`Open GitHub for: ${projectTitle}`);
        // Add your GitHub link logic here
    });
});

// Load blogs from localStorage and render them
function loadBlogsFromStorage() {
    const blogSlider = document.getElementById('blogSlider');
    if (!blogSlider) return;
    
    // Get blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    if (storedBlogs.length === 0) return;
    
    // Clear existing dynamic blogs (keep static ones or replace all)
    // For now, we'll append new blogs to the beginning
    
    storedBlogs.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.setAttribute('data-category', blog.category.toLowerCase());
        
        // Format date
        const date = new Date(blog.date);
        const day = date.getDate();
        const month = date.toLocaleString('tr-TR', { month: 'short' }).toUpperCase();
        
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${blog.image}" alt="${blog.title}">
                <div class="blog-date">
                    <span class="day">${day}</span>
                    <span class="month">${month}</span>
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-category">
                    <i class="fas fa-${getCategoryIcon(blog.category)}"></i>
                    <span>${getCategoryName(blog.category)}</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-meta">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${blog.readTime} dk okuma</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-eye"></i>
                        <span>${formatNumber(blog.views)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-heart"></i>
                        <span>${blog.likes}</span>
                    </div>
                </div>
                <button class="read-more-btn">
                    <span>Devamını Oku</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        // Insert at the beginning
        blogSlider.insertBefore(blogCard, blogSlider.firstChild);
    });
}

// Helper function for category icons
function getCategoryIcon(category) {
    const icons = {
        'web': 'code',
        'security': 'shield-alt',
        'tutorial': 'book',
        'career': 'briefcase',
        'ai': 'robot',
        'mobile': 'mobile-alt'
    };
    return icons[category.toLowerCase()] || 'file-alt';
}

// Helper function for category names
function getCategoryName(category) {
    const names = {
        'web': 'Web Development',
        'security': 'Cybersecurity',
        'tutorial': 'Tutorial',
        'career': 'Career',
        'ai': 'Artificial Intelligence',
        'mobile': 'Mobile Development'
    };
    return names[category.toLowerCase()] || category;
}

// Helper function to format numbers
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Load blogs on page load
loadBlogsFromStorage();

// Blog Slider System - Initialize after loading blogs
function initBlogSlider() {
    const blogCards = document.querySelectorAll('.blog-card');
    const blogSlider = document.getElementById('blogSlider');
    const blogPrevBtn = document.getElementById('blogPrevBtn');
    const blogNextBtn = document.getElementById('blogNextBtn');
    const blogDots = document.getElementById('blogDots');
    const blogFilterBtns = document.querySelectorAll('.blog-filters .filter-btn');

    let currentBlogIndex = 0;
    let filteredBlogs = Array.from(blogCards);

    if (blogSlider && blogPrevBtn && blogNextBtn && blogDots) {
    
    // Create dots for blog
    function createBlogDots() {
        blogDots.innerHTML = '';
        filteredBlogs.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToBlogSlide(index));
            blogDots.appendChild(dot);
        });
    }

    // Update dots
    function updateBlogDots() {
        const dots = blogDots.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentBlogIndex);
        });
    }

    // Update buttons state
    function updateBlogButtons() {
        blogPrevBtn.disabled = currentBlogIndex === 0;
        blogNextBtn.disabled = currentBlogIndex === filteredBlogs.length - 1;
    }

    // Go to specific slide
    function goToBlogSlide(index) {
        currentBlogIndex = index;
        const offset = -index * 100;
        blogSlider.style.transform = `translateX(${offset}%)`;
        updateBlogDots();
        updateBlogButtons();
    }

    // Previous slide
    blogPrevBtn.addEventListener('click', () => {
        if (currentBlogIndex > 0) {
            goToBlogSlide(currentBlogIndex - 1);
        }
    });

    // Next slide
    blogNextBtn.addEventListener('click', () => {
        if (currentBlogIndex < filteredBlogs.length - 1) {
            goToBlogSlide(currentBlogIndex + 1);
        }
    });

    // Filter functionality
    if (blogFilterBtns.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                blogFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter blogs
                filteredBlogs = Array.from(blogCards).filter(card => {
                    const category = card.getAttribute('data-category');
                    return filter === 'all' || category === filter;
                });

                // Reset to first slide
                currentBlogIndex = 0;
                goToBlogSlide(0);
                createBlogDots();
                updateBlogButtons();
            });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !blogPrevBtn.disabled) {
            blogPrevBtn.click();
        } else if (e.key === 'ArrowRight' && !blogNextBtn.disabled) {
            blogNextBtn.click();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    blogSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    blogSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleBlogSwipe();
    });

    function handleBlogSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentBlogIndex < filteredBlogs.length - 1) {
                goToBlogSlide(currentBlogIndex + 1);
            } else if (diff < 0 && currentBlogIndex > 0) {
                goToBlogSlide(currentBlogIndex - 1);
            }
        }
    }

    // Animate blog cards on scroll
    const blogCardsArray = Array.from(blogCards);
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    blogCardsArray.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        blogObserver.observe(card);
    });

    // Update blog stats counter
    const blogStatNumbers = document.querySelectorAll('.blog-stats .stat-number');
    if (blogStatNumbers.length > 0) {
        const blogStatsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.textContent === '0') {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    if (entry.target.parentElement.querySelector('.stat-label').textContent.includes('YAZI')) {
                        entry.target.setAttribute('data-target', blogCards.length);
                        animateCounter(entry.target, blogCards.length);
                    } else if (entry.target.parentElement.querySelector('.stat-label').textContent.includes('OKUNMA')) {
                        const totalReads = blogCards.length * 3200;
                        entry.target.setAttribute('data-target', totalReads);
                        animateCounter(entry.target, totalReads);
                    }
                }
            });
        }, { threshold: 0.5 });

        blogStatNumbers.forEach(stat => {
            blogStatsObserver.observe(stat);
        });
    }

    // Read more button handlers
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const blogCard = btn.closest('.blog-card');
            const blogTitle = blogCard.querySelector('.blog-title').textContent;
            console.log(`Read more: ${blogTitle}`);
            // Add your blog detail page logic here
        });
    });

    // Initialize
    createBlogDots();
    updateBlogButtons();
    }
}

// Initialize blog slider after DOM is fully loaded
setTimeout(() => {
    initBlogSlider();
}, 100);

// Contact Form
const contactForm = document.getElementById('contactForm');
const formInputs = document.querySelectorAll('.form-input');

// Form input animations
formInputs.forEach(input => {
    // Add floating label support
    input.addEventListener('blur', () => {
        if (input.value) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });

    // Add focus effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Form validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || name.length < 2) {
        showNotification('Lütfen geçerli bir isim girin', 'error');
        return;
    }
    
    if (!email || !validateEmail(email)) {
        showNotification('Lütfen geçerli bir email adresi girin', 'error');
        return;
    }
    
    if (!subject || subject.length < 3) {
        showNotification('Lütfen bir konu başlığı girin', 'error');
        return;
    }
    
    if (!message || message.length < 10) {
        showNotification('Lütfen en az 10 karakter içeren bir mesaj girin', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Gönderiliyor...</span>';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Success
        showNotification('Mesajınız başarıyla gönderildi!', 'success');
        contactForm.reset();
        formInputs.forEach(input => input.classList.remove('has-value'));
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // In production, replace with actual API call:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, subject, message })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showNotification('Mesajınız başarıyla gönderildi!', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        // })
        // .finally(() => {
        //     submitBtn.innerHTML = originalBtnText;
        //     submitBtn.disabled = false;
        // });
    }, 2000);
});

// Social link tracking
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Analytics tracking (optional)
        // console.log('Social link clicked:', link.href);
    });
});

// Admin Panel Access
const adminLogo = document.getElementById('adminLogo');

adminLogo.addEventListener('click', () => {
    // Redirect to admin login immediately
    window.location.href = 'admin-login.html';
});
