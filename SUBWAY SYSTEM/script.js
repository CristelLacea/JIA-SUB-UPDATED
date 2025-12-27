
function goBack() {
    window.location.href = "index.html";
}



/* TRAPPINGS FOR LOG IN PANEL */

// 1. DOM Elements
const authTitle = document.querySelector('.form-box h2');
const mainBtn = document.querySelector('.btn-main');
const switchText = document.querySelector('.switch-text');
const userNameDisplay = document.getElementById('userName');

let isLoginView = true;


// 3. Handle Authentication Logic
function handleAuth(type) {
    const email = document.getElementById('loginEmail').value;
    const password = document.querySelector('input[type="password"]').value;

    // Basic Validation
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Extracting a name from email for the "Welcome" message
    const name = email.split('@')[0];
    localStorage.setItem('jiaUserName', name);

    // Admin Detection Logic
    function handleAuth(type) {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    
    // --- INPUT THE DEFAULT PASSWORD HERE ---
    const defaultAdminPass = "Admin@1234"; 

    if (email.toLowerCase().includes('admin')) {
        if (password === defaultAdminPass) {
            showSystemMessage("Admin access granted.", false);
            window.location.href = "admin-dashboard.html";
            return; // Stop further execution
        } else {
            showSystemMessage("Invalid Admin Password.");
            return;
        }
    }
}

// 4. Persistence: Update "Welcome, Guest" on page load
window.onload = () => {
    const savedName = localStorage.getItem('jiaUserName');
    if (savedName) {
        userNameDisplay.innerText = savedName;
    }
};
function goToSignup() {
    // This line sends the user to your Signup page
    window.location.href = "Signup.html";
}
}