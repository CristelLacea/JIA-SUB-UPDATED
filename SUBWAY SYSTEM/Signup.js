/**
 * JIA SUBS - Final Security & UI Script
 */

// 1. System Message Trapping (Custom UI Notification)
function showSystemMessage(message, isError = true) {
    const existingMsg = document.querySelector('.system-trapping-msg');
    if (existingMsg) existingMsg.remove();

    const msgBox = document.createElement('div');
    msgBox.className = 'system-trapping-msg';
    msgBox.innerText = message;

    Object.assign(msgBox.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: isError ? '#cc0000' : '#042111',
        color: 'white',
        padding: '14px 28px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        zIndex: '9999',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
        minWidth: '320px'
    });

    document.body.appendChild(msgBox);
    setTimeout(() => {
        msgBox.style.opacity = '0';
        setTimeout(() => msgBox.remove(), 500);
    }, 4000);
}

// 2. Show/Hide Password Logic
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleBtn.innerText = isPassword ? 'visibility_off' : 'visibility';
        });
    }
});

// 3. Main Authentication & Trappings
function handleAuth(type) {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const firstName = document.getElementById('signupfirstname')?.value?.trim();
    const lastName = document.getElementById('signuplastname')?.value?.trim();

    // EMAIL TRAPPINGS
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return showSystemMessage("Email is empty.");
    if (!emailPattern.test(email)) return showSystemMessage("Email must be valid (e.g. user@gmail.com).");

    // PASSWORD SETS TRAPPINGS
    if (!password) return showSystemMessage("Password is required.");
    if (password.length < 8) return showSystemMessage("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) return showSystemMessage("Password needs an Uppercase letter.");
    if (!/[a-z]/.test(password)) return showSystemMessage("Password needs a lowercase letter.");
    if (!/[0-9]/.test(password)) return showSystemMessage("Password needs a number.");
    if (!/[@$!%*?&]/.test(password)) return showSystemMessage("Password needs a special character (@$!%*?&).");

    // REDIRECTION LOGIC
    if (type === 'Sign Up') {
        if (!firstName || !lastName) return showSystemMessage("Please enter your full name.");
        
        showSystemMessage("Account Created! Redirecting...", false);
        localStorage.setItem('jiaUserName', firstName);
        setTimeout(() => window.location.href = "index.html", 2000);
    } else {
        if (email.toLowerCase().includes('admin')) {
            showSystemMessage("Admin Access Verified.", false);
            setTimeout(() => window.location.href = "admin-panel.html", 1000);
        } else {
            showSystemMessage("Login Successful!", false);
            const userGreeting = localStorage.getItem('jiaUserName') || email.split('@')[0];
            localStorage.setItem('jiaUserName', userGreeting);
            setTimeout(() => window.location.href = "menu.html", 1000);
        }
    }
}