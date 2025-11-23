// Admin Login Functionality

// Get form elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const togglePasswordBtn = document.getElementById('togglePassword');

// Simple hash function for basic security
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Stored credentials (hashed)
const STORED_USERNAME_HASH = simpleHash('betulucokseviyorum');
const STORED_PASSWORD_HASH = simpleHash('busra123');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePasswordBtn.querySelector('i');
    if (type === 'password') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Hash the input credentials
    const usernameHash = simpleHash(username);
    const passwordHash = simpleHash(password);
    
    // Validate credentials
    if (usernameHash === STORED_USERNAME_HASH && passwordHash === STORED_PASSWORD_HASH) {
        // Success - set session and redirect
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminLoginTime', Date.now());
        sessionStorage.setItem('adminToken', btoa(Date.now() + username));
        
        // Add success animation
        loginForm.style.transform = 'scale(0.95)';
        loginForm.style.opacity = '0.5';
        
        setTimeout(() => {
            window.location.href = 'admin-panel.html';
        }, 300);
    } else {
        // Error - show error message
        errorMessage.textContent = 'Kullanıcı adı veya şifre hatalı!';
        errorMessage.classList.add('show');
        
        // Shake animation
        loginForm.style.animation = 'none';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 10);
        
        // Clear error after 3 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
        
        // Clear password field
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Clear error message when user starts typing
usernameInput.addEventListener('input', () => {
    errorMessage.classList.remove('show');
});

passwordInput.addEventListener('input', () => {
    errorMessage.classList.remove('show');
});

// Check if already logged in
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'admin-panel.html';
}
