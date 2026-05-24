// static/js/login.js

console.log('📝 Login.js loaded - waiting for Firebase...');

// Wait for Firebase to be ready
function waitForFirebase() {
    if (typeof firebase !== 'undefined') {
        console.log('✅ Firebase detected, initializing...');
        initAuth();
    } else {
        console.log('⏳ Waiting for Firebase...');
        setTimeout(waitForFirebase, 100);
    }
}

// Initialize authentication
function initAuth() {
    console.log('🔐 Setting up authentication...');
    
    // Check if user is already logged in
    firebase.auth().onAuthStateChanged(function(user) {
        console.log('👤 Auth state changed:', user ? 'Logged in as ' + user.email : 'Logged out');
        
        if (user) {
            // User is logged in
            document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'block');
            
            const userEmailEl = document.getElementById('user-email');
            if (userEmailEl) userEmailEl.textContent = user.email;
        } else {
            // User is logged out
            document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'none');
        }
    });

    // Setup login buttons
    setupLoginButtons();
}

// Setup all login buttons
function setupLoginButtons() {
    const loginButtons = document.querySelectorAll('.google-login-btn');
    console.log('🔍 Found', loginButtons.length, 'login buttons');
    
    loginButtons.forEach(btn => {
        // Remove any existing listeners
        btn.removeEventListener('click', handleLogin);
        // Add new listener
        btn.addEventListener('click', handleLogin);
    });
}

// Handle login click
async function handleLogin(e) {
    e.preventDefault();
    console.log('🎯 Login button clicked');
    
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        // Optional: Add scopes if needed
        provider.addScope('profile');
        provider.addScope('email');
        
        console.log('📤 Opening Google popup...');
        const result = await firebase.auth().signInWithPopup(provider);
        
        const user = result.user;
        console.log('✅ Logged in successfully:', user.email);
        console.log('User details:', {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        });
        
        // Send to Flask backend
        console.log('📡 Sending user data to Flask...');
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: user.uid,
                email: user.email,
                name: user.displayName || 'User',
                photo: user.photoURL || ''
            })
        });
        
        const data = await response.json();
        console.log('📥 Flask response:', data);
        
        if (response.ok) {
            console.log('🚀 Redirecting to dashboard...');
            window.location.href = '/dashboard';
        } else {
            alert('Login failed on server: ' + (data.message || 'Unknown error'));
        }
        
    } catch (error) {
        console.error('❌ Login error:', error);
        
        // Handle specific Firebase errors
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                alert('Login popup was closed. Please try again.');
                break;
            case 'auth/cancelled-popup-request':
                // Ignore - another popup was already open
                break;
            case 'auth/network-request-failed':
                alert('Network error. Please check your internet connection.');
                break;
            default:
                alert('Login failed: ' + error.message);
        }
    }
}

// Global logout function
window.logout = function() {
    console.log('🚪 Logging out...');
    
    firebase.auth().signOut()
        .then(() => {
            console.log('✅ Firebase signout successful');
            return fetch('/api/logout', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('📥 Flask logout response:', data);
            window.location.href = '/';
        })
        .catch(error => {
            console.error('❌ Logout error:', error);
            // Still try to redirect even if there's an error
            window.location.href = '/';
        });
};

// Re-attach login buttons if new ones are added dynamically
function refreshLoginButtons() {
    setupLoginButtons();
}

// Start the process
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Page DOM loaded');
    waitForFirebase();
});

// Also handle if page loads with Firebase already there
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('📄 Page already loaded');
    waitForFirebase();
}