// Admin Panel Functionality

// Check if user is logged in
const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
const adminToken = sessionStorage.getItem('adminToken');

if (!isLoggedIn || !adminToken) {
    // Redirect to login if not logged in
    window.location.href = 'admin-login.html';
} else {
    // Check session timeout (30 minutes)
    const loginTime = parseInt(sessionStorage.getItem('adminLoginTime'));
    const currentTime = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (currentTime - loginTime > thirtyMinutes) {
        // Session expired
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminLoginTime');
        alert('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
        window.location.href = 'admin-login.html';
    }
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    // Clear session
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    sessionStorage.removeItem('adminToken');
    
    // Redirect immediately to homepage
    window.location.href = 'index.html';
});

// Update session time on activity
document.addEventListener('click', () => {
    sessionStorage.setItem('adminLoginTime', Date.now());
});

document.addEventListener('keydown', () => {
    sessionStorage.setItem('adminLoginTime', Date.now());
});

// Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Initialize localStorage for projects and blogs if not exists
if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify([]));
}
if (!localStorage.getItem('blogs')) {
    localStorage.setItem('blogs', JSON.stringify([]));
}

// Add Project Form
const addProjectForm = document.getElementById('addProjectForm');
addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const project = {
        id: Date.now(),
        title: document.getElementById('projectTitle').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value,
        technologies: document.getElementById('projectTech').value.split(',').map(t => t.trim()),
        image: document.getElementById('projectImage').value,
        github: document.getElementById('projectGithub').value,
        views: parseInt(document.getElementById('projectViews').value) || 0,
        likes: parseInt(document.getElementById('projectLikes').value) || 0,
        date: new Date().toISOString()
    };
    
    // Get existing projects
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Add new project
    projects.unshift(project);
    
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Show success message
    alert('✅ Proje başarıyla eklendi!');
    
    // Reset form
    addProjectForm.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add Blog Form
const addBlogForm = document.getElementById('addBlogForm');
addBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const blog = {
        id: Date.now(),
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: document.getElementById('blogContent').value,
        tags: document.getElementById('blogTags').value.split(',').map(t => t.trim()),
        image: document.getElementById('blogImage').value,
        readTime: parseInt(document.getElementById('blogReadTime').value),
        author: document.getElementById('blogAuthor').value,
        date: new Date().toISOString(),
        views: 0,
        likes: 0
    };
    
    // Get existing blogs
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    // Add new blog
    blogs.unshift(blog);
    
    // Save to localStorage
    localStorage.setItem('blogs', JSON.stringify(blogs));
    
    // Show success message
    alert('✅ Yazı başarıyla eklendi!');
    
    // Reset form
    addBlogForm.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
