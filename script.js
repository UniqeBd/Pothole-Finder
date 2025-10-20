// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initForms();
    initAnimations();
    initInteractivity();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    // Update active navigation link based on current page
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Form Handling and Validation
function initForms() {
    // Report Problem Form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmission);
    }
    
    // Track Issue Form
    const trackForm = document.getElementById('trackForm');
    if (trackForm) {
        trackForm.addEventListener('submit', handleTrackSubmission);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Government Signup Form
    const govSignupForm = document.getElementById('govSignupForm');
    if (govSignupForm) {
        govSignupForm.addEventListener('submit', handleGovSignup);
    }
    
    // Special Code Verification for Government Signup
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', handleCodeVerification);
    }
    
    // SuperAdmin Master Code Verification
    const verifyMasterCodeBtn = document.getElementById('verifyMasterCodeBtn');
    if (verifyMasterCodeBtn) {
        verifyMasterCodeBtn.addEventListener('click', handleMasterCodeVerification);
    }
    
    // SuperAdmin Login Form
    const superadminLoginForm = document.getElementById('superadminLoginForm');
    if (superadminLoginForm) {
        superadminLoginForm.addEventListener('submit', handleSuperadminLogin);
    }
    
    // File upload handling
    const fileInput = document.getElementById('photo');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
}

// Report Form Submission
function handleReportSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reportData = {
        location: formData.get('location'),
        category: formData.get('category'),
        description: formData.get('description'),
        photo: formData.get('photo')
    };
    
    // Validate form
    if (!validateReportForm(reportData)) {
        return;
    }
    
    // Simulate API call
    showLoadingState(e.target.querySelector('.submit-btn'));
    
    setTimeout(() => {
        // Generate report ID
        const reportId = generateReportId();
        
        // Store report in localStorage (simulate database)
        storeReport(reportId, reportData);
        
        // Show success message
        showSuccessMessage('reportForm', 'Your report has been submitted');
        
        // Reset form
        e.target.reset();
        
        hideLoadingState(e.target.querySelector('.submit-btn'));
    }, 1500);
}

// Track Issue Form Submission
function handleTrackSubmission(e) {
    e.preventDefault();
    
    const reportId = document.getElementById('reportId').value;
    
    if (!reportId.trim()) {
        showErrorMessage('Please enter a valid Report ID');
        return;
    }
    
    // Simulate API call to track issue
    showLoadingState(e.target.querySelector('.submit-btn'));
    
    setTimeout(() => {
        const report = getStoredReport(reportId);
        
        if (report) {
            updateProgressTracker(report.status || 'submitted');
            showSuccessMessage('trackForm', 'Your report has been submitted');
        } else {
            showErrorMessage('Report ID not found');
        }
        
        hideLoadingState(e.target.querySelector('.submit-btn'));
    }, 1000);
}

// Contact Form Submission
function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    if (!validateContactForm(contactData)) {
        return;
    }
    
    showLoadingState(e.target.querySelector('.send-btn'));
    
    setTimeout(() => {
        showMessage('Thank you for your message. We will get back to you soon!', 'success');
        e.target.reset();
        hideLoadingState(e.target.querySelector('.send-btn'));
    }, 1000);
}

// Login Form Submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!validateEmail(email) || !password.trim()) {
        showErrorMessage('Please enter valid credentials');
        return;
    }
    
    showLoadingState(e.target.querySelector('.auth-btn'));
    
    setTimeout(() => {
        // Store user session
        sessionStorage.setItem('userLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        
        // Check user type and set appropriate session data
        if (email.includes('gov') || email.includes('admin')) {
            sessionStorage.setItem('userType', 'government');
            window.location.href = 'profile.html'; // All users go to same profile page
        } else {
            sessionStorage.setItem('userType', 'regular');
            window.location.href = 'profile.html';
        }
        
        hideLoadingState(e.target.querySelector('.auth-btn'));
    }, 1500);
}

// Signup Form Submission
function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        contact: formData.get('contact')
    };
    
    if (!validateSignupForm(userData)) {
        return;
    }
    
    showLoadingState(e.target.querySelector('.auth-btn'));
    
    setTimeout(() => {
        // Store user data (simulate registration)
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showMessage('Account created successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
        hideLoadingState(e.target.querySelector('.auth-btn'));
    }, 1500);
}

// Special Code Verification
function handleCodeVerification() {
    const specialCode = document.getElementById('specialCode').value;
    const codeVerification = document.getElementById('codeVerification');
    const govSignupForm = document.getElementById('govSignupForm');
    const codeError = document.getElementById('codeError');
    const verifyBtn = document.getElementById('verifyCodeBtn');
    
    // Clear previous error
    codeError.classList.add('hidden');
    
    if (specialCode === 'HaXon') {
        // Show loading state
        showLoadingState(verifyBtn);
        
        setTimeout(() => {
            // Hide code verification section
            codeVerification.style.display = 'none';
            
            // Show government signup form
            govSignupForm.classList.remove('hidden');
            govSignupForm.style.display = 'block';
            
            showMessage('Access granted! You can now create a government account.', 'success');
            hideLoadingState(verifyBtn);
        }, 1000);
    } else {
        // Show error message
        codeError.classList.remove('hidden');
        
        // Clear the input field
        document.getElementById('specialCode').value = '';
        
        // Add shake animation to input
        const input = document.getElementById('specialCode');
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

// Government Signup Form Submission
function handleGovSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const govData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        contact: formData.get('contact'),
        wordNo: formData.get('wordNo')
    };
    
    if (!validateGovSignupForm(govData)) {
        return;
    }
    
    showLoadingState(e.target.querySelector('.auth-btn'));
    
    setTimeout(() => {
        // Store government user data
        localStorage.setItem('govUserData', JSON.stringify(govData));
        
        showMessage('Government account created successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
        hideLoadingState(e.target.querySelector('.auth-btn'));
    }, 1500);
}

// Validation Functions
function validateReportForm(data) {
    if (!data.location) {
        showErrorMessage('Please select a location');
        return false;
    }
    
    if (!data.category) {
        showErrorMessage('Please select a problem category');
        return false;
    }
    
    if (!data.description.trim()) {
        showErrorMessage('Please provide a description');
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    if (!data.name.trim()) {
        showErrorMessage('Please enter your name');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }
    
    if (!data.message.trim()) {
        showErrorMessage('Please enter a message');
        return false;
    }
    
    return true;
}

function validateSignupForm(data) {
    if (!data.name.trim()) {
        showErrorMessage('Please enter your name');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }
    
    if (data.password.length < 6) {
        showErrorMessage('Password must be at least 6 characters long');
        return false;
    }
    
    if (!data.contact.trim()) {
        showErrorMessage('Please enter your contact number');
        return false;
    }
    
    return true;
}

function validateGovSignupForm(data) {
    if (!validateSignupForm(data)) {
        return false;
    }
    
    if (!data.wordNo.trim()) {
        showErrorMessage('Please enter your Word No.');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function generateReportId() {
    return 'RPT' + Date.now().toString().slice(-8);
}

function storeReport(reportId, reportData) {
    const reports = JSON.parse(localStorage.getItem('reports') || '{}');
    reports[reportId] = {
        ...reportData,
        id: reportId,
        status: 'submitted',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
    localStorage.setItem('reports', JSON.stringify(reports));
}

function getStoredReport(reportId) {
    const reports = JSON.parse(localStorage.getItem('reports') || '{}');
    return reports[reportId];
}

function showSuccessMessage(formId, message) {
    const form = document.getElementById(formId);
    let successDiv = form.querySelector('.success-message');
    
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        form.appendChild(successDiv);
    }
    
    successDiv.textContent = '✓ ' + message;
    successDiv.classList.remove('hidden');
    
    setTimeout(() => {
        successDiv.classList.add('hidden');
    }, 5000);
}

function showErrorMessage(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #dc3545;
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
            font-weight: 600;
        `;
        document.querySelector('.container, .auth-card').appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #28a745; color: white;' : 'background: #17a2b8; color: white;'}
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

function showLoadingState(button) {
    if (button) {
        button.disabled = true;
        button.originalText = button.textContent;
        button.textContent = 'Loading...';
        button.style.opacity = '0.7';
    }
}

function hideLoadingState(button) {
    if (button) {
        button.disabled = false;
        button.textContent = button.originalText;
        button.style.opacity = '1';
    }
}

function updateProgressTracker(status) {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');
    const statusBadge = document.querySelector('.status-badge');
    
    // Reset all steps and lines
    steps.forEach(step => {
        step.classList.remove('completed', 'active');
    });
    lines.forEach(line => {
        line.classList.remove('completed', 'active');
    });
    
    // Update based on status
    let currentStep = 0;
    switch (status) {
        case 'submitted':
            currentStep = 0;
            break;
        case 'verified':
            currentStep = 1;
            break;
        case 'in-progress':
            currentStep = 2;
            break;
        case 'resolved':
            currentStep = 3;
            break;
        default:
            currentStep = 0;
    }
    
    // Mark completed steps
    for (let i = 0; i < currentStep; i++) {
        if (steps[i]) steps[i].classList.add('completed');
        if (lines[i]) lines[i].classList.add('completed');
    }
    
    // Mark active step
    if (steps[currentStep]) {
        steps[currentStep].classList.add('active');
    }
    
    // Update status badge
    if (statusBadge) {
        const statusText = {
            'submitted': 'Status Submitted',
            'verified': 'Status Verified',
            'in-progress': 'Status In Progress',
            'resolved': 'Status Resolved'
        };
        statusBadge.textContent = statusText[status] || 'Status Unknown';
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    const label = e.target.previousElementSibling;
    
    if (file) {
        label.querySelector('span').textContent = `Selected: ${file.name}`;
        label.style.borderColor = '#4CAF50';
    } else {
        label.querySelector('span').textContent = 'Upload Photo';
        label.style.borderColor = '#90EE90';
    }
}

// Animations and Interactivity
function initAnimations() {
    // Add fade-in animation to page elements
    const elements = document.querySelectorAll('.action-card, .stat-card, .form-group');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

function initInteractivity() {
    // Action cards click handlers
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.action-title').textContent;
            
            switch (title) {
                case 'Recent Captures':
                    showMessage('Opening recent captures...', 'info');
                    break;
                case 'Nearest Mapping':
                    window.open('https://maps.google.com', '_blank');
                    break;
                case 'Track Recent Progress':
                    window.location.href = 'track-issue.html';
                    break;
            }
        });
    });
    
    // Dashboard action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('verify')) {
                this.textContent = 'Verified';
                this.classList.remove('verify');
                this.classList.add('verified');
                this.style.background = '#28a745';
                showMessage('Report verified successfully!', 'success');
            }
        });
    });
    
    // Map tab functionality
    document.querySelectorAll('.map-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.map-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn');
    const profileBtn = document.querySelector('.profile-btn');
    
    if (isLoggedIn && profileBtn) {
        profileBtn.href = 'profile.html';
        profileBtn.classList.add('authenticated');
    }
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .error-message {
        animation: slideUp 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize auth check on page load
checkAuthStatus();

// Sample data for demo
function initSampleData() {
    if (!localStorage.getItem('reports')) {
        const sampleReports = {
            'RPT12345678': {
                id: 'RPT12345678',
                location: 'dhanmondi',
                category: 'garbage',
                description: 'Garbage not collected for 3 days',
                status: 'in-progress',
                date: '2024-01-15'
            },
            'RPT87654321': {
                id: 'RPT87654321',
                location: 'gulshan',
                category: 'road',
                description: 'Pothole on main road',
                status: 'resolved',
                date: '2024-01-10'
            }
        };
        localStorage.setItem('reports', JSON.stringify(sampleReports));
    }
}

// Initialize sample data
initSampleData();

// SuperAdmin Functions

// Master Code Verification
function handleMasterCodeVerification() {
    const masterCode = document.getElementById('masterAccessCode').value;
    const codeVerification = document.getElementById('masterCodeVerification');
    const loginForm = document.getElementById('superadminLoginForm');
    const codeError = document.getElementById('masterCodeError');
    const verifyBtn = document.getElementById('verifyMasterCodeBtn');
    
    codeError.classList.add('hidden');
    
    // Master access codes: HaXon2025, MASTER_ACCESS, CIVIFY_ADMIN
    if (masterCode === 'HaXon2025' || masterCode === 'MASTER_ACCESS' || masterCode === 'CIVIFY_ADMIN') {
        showLoadingState(verifyBtn);
        
        setTimeout(() => {
            codeVerification.style.display = 'none';
            loginForm.classList.remove('hidden');
            loginForm.style.display = 'block';
            
            showMessage('Master Access Granted! Enter SuperAdmin credentials.', 'success');
            hideLoadingState(verifyBtn);
        }, 1500);
    } else {
        codeError.classList.remove('hidden');
        document.getElementById('masterAccessCode').value = '';
        
        const input = document.getElementById('masterAccessCode');
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

// SuperAdmin Login
function handleSuperadminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('superadminUsername').value;
    const password = document.getElementById('superadminPassword').value;
    const secretKey = document.getElementById('superadminSecretKey').value;
    
    // SuperAdmin credentials
    const validCredentials = [
        { username: 'superadmin', password: 'HaXon@2025', secretKey: 'CIVIFY_SUPER_KEY' },
        { username: 'admin', password: 'Admin@123', secretKey: 'MASTER_KEY_2025' },
        { username: 'haxon_admin', password: 'HaXon_Master', secretKey: 'HAXON_SECRET' },
        { username: 'shoaib', password: '123456', secretKey: 'SHOAIB_ADMIN_KEY' }
    ];
    
    const isValid = validCredentials.some(cred => 
        cred.username === username && 
        cred.password === password && 
        cred.secretKey === secretKey
    );
    
    if (isValid) {
        showLoadingState(e.target.querySelector('.auth-btn'));
        
        setTimeout(() => {
            // Set superadmin session
            sessionStorage.setItem('userLoggedIn', 'true');
            sessionStorage.setItem('userType', 'superadmin');
            sessionStorage.setItem('superadminLoggedIn', 'true');
            sessionStorage.setItem('superadminUsername', username);
            sessionStorage.setItem('userEmail', username);
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            showMessage('SuperAdmin Access Granted! Redirecting to Profile...', 'success');
            
            setTimeout(() => {
                window.location.href = 'profile.html'; // All users go to same profile page
            }, 2000);
            
            hideLoadingState(e.target.querySelector('.auth-btn'));
        }, 2000);
    } else {
        showErrorMessage('Invalid SuperAdmin Credentials');
        
        // Clear all fields
        document.getElementById('superadminUsername').value = '';
        document.getElementById('superadminPassword').value = '';
        document.getElementById('superadminSecretKey').value = '';
    }
}

// SuperAdmin Dashboard Functions

function viewAllUsers() {
    const dataArea = document.getElementById('dataDisplayArea');
    const dataTitle = document.getElementById('dataTitle');
    const dataContent = document.getElementById('dataContent');
    
    dataTitle.textContent = 'All Registered Users';
    
    // Sample user data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', type: 'User', status: 'Active', joined: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'User', status: 'Active', joined: '2024-01-20' },
        { id: 3, name: 'Mike Johnson', email: 'mike@gov.bd', type: 'Government', status: 'Active', joined: '2024-01-25' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', type: 'User', status: 'Suspended', joined: '2024-02-01' }
    ];
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.type}</td>
                <td><span style="color: ${user.status === 'Active' ? 'green' : 'red'}">${user.status}</span></td>
                <td>${user.joined}</td>
                <td>
                    <button class="control-btn" onclick="editUser(${user.id})" style="background: #007bff; color: white; padding: 5px 10px; font-size: 0.8rem;">Edit</button>
                    <button class="control-btn" onclick="suspendUser(${user.id})" style="background: #ffc107; color: #333; padding: 5px 10px; font-size: 0.8rem;">Suspend</button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    dataContent.innerHTML = tableHTML;
    dataArea.classList.remove('hidden');
}

function viewAllReports() {
    const dataArea = document.getElementById('dataDisplayArea');
    const dataTitle = document.getElementById('dataTitle');
    const dataContent = document.getElementById('dataContent');
    
    dataTitle.textContent = 'All System Reports';
    
    const reports = [
        { id: 'RPT001', area: 'Dhanmondi', category: 'Garbage', status: 'Resolved', date: '2024-01-15', user: 'john@example.com' },
        { id: 'RPT002', area: 'Gulshan', category: 'Road', status: 'In Progress', date: '2024-01-20', user: 'jane@example.com' },
        { id: 'RPT003', area: 'Mirpur', category: 'Light', status: 'Pending', date: '2024-01-25', user: 'mike@example.com' }
    ];
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Area</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>User</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    reports.forEach(report => {
        const statusColor = report.status === 'Resolved' ? 'green' : report.status === 'In Progress' ? 'orange' : 'red';
        tableHTML += `
            <tr>
                <td>${report.id}</td>
                <td>${report.area}</td>
                <td>${report.category}</td>
                <td><span style="color: ${statusColor}">${report.status}</span></td>
                <td>${report.date}</td>
                <td>${report.user}</td>
                <td>
                    <button class="control-btn" onclick="editReport('${report.id}')" style="background: #007bff; color: white; padding: 5px 10px; font-size: 0.8rem;">Edit</button>
                    <button class="control-btn" onclick="deleteReport('${report.id}')" style="background: #dc3545; color: white; padding: 5px 10px; font-size: 0.8rem;">Delete</button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    dataContent.innerHTML = tableHTML;
    dataArea.classList.remove('hidden');
}

function viewGovUsers() {
    const dataArea = document.getElementById('dataDisplayArea');
    const dataTitle = document.getElementById('dataTitle');
    const dataContent = document.getElementById('dataContent');
    
    dataTitle.textContent = 'Government Users Management';
    
    const govUsers = [
        { id: 1, name: 'Mike Johnson', email: 'mike@gov.bd', wordNo: 'WRD001', department: 'City Planning', status: 'Active' },
        { id: 2, name: 'Sarah Ahmed', email: 'sarah@gov.bd', wordNo: 'WRD002', department: 'Public Works', status: 'Active' },
        { id: 3, name: 'David Rahman', email: 'david@gov.bd', wordNo: 'WRD003', department: 'Environmental', status: 'Suspended' }
    ];
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Word No.</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    govUsers.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.wordNo}</td>
                <td>${user.department}</td>
                <td><span style="color: ${user.status === 'Active' ? 'green' : 'red'}">${user.status}</span></td>
                <td>
                    <button class="control-btn" onclick="revokeGovAccess(${user.id})" style="background: #dc3545; color: white; padding: 5px 10px; font-size: 0.8rem;">Revoke</button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    dataContent.innerHTML = tableHTML;
    dataArea.classList.remove('hidden');
}

function viewAuditLogs() {
    const dataArea = document.getElementById('dataDisplayArea');
    const dataTitle = document.getElementById('dataTitle');
    const dataContent = document.getElementById('dataContent');
    
    dataTitle.textContent = 'System Audit Logs';
    
    const logs = [
        { timestamp: '2024-01-25 10:30:15', user: 'superadmin', action: 'User Login', details: 'SuperAdmin logged in', ip: '192.168.1.100' },
        { timestamp: '2024-01-25 10:25:33', user: 'john@example.com', action: 'Report Created', details: 'New report RPT001 created', ip: '192.168.1.101' },
        { timestamp: '2024-01-25 10:20:44', user: 'mike@gov.bd', action: 'Status Update', details: 'Report RPT001 status changed to Resolved', ip: '192.168.1.102' },
        { timestamp: '2024-01-25 10:15:22', user: 'superadmin', action: 'User Suspended', details: 'User sarah@example.com suspended', ip: '192.168.1.100' }
    ];
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>IP Address</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    logs.forEach(log => {
        tableHTML += `
            <tr>
                <td>${log.timestamp}</td>
                <td>${log.user}</td>
                <td>${log.action}</td>
                <td>${log.details}</td>
                <td>${log.ip}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    dataContent.innerHTML = tableHTML;
    dataArea.classList.remove('hidden');
}

// Modal Functions
function showSuspendUserModal() {
    createModal('Suspend User', `
        <div class="form-group">
            <input type="email" id="suspendUserEmail" class="form-control" placeholder="Enter user email to suspend">
        </div>
        <div class="form-group">
            <input type="text" id="suspendReason" class="form-control" placeholder="Reason for suspension">
        </div>
    `, 'Suspend User', () => {
        const email = document.getElementById('suspendUserEmail').value;
        const reason = document.getElementById('suspendReason').value;
        
        if (email && reason) {
            showMessage(`User ${email} has been suspended. Reason: ${reason}`, 'success');
            closeModal();
        } else {
            showErrorMessage('Please fill in all fields');
        }
    });
}

function showDeleteUserModal() {
    createModal('Delete User', `
        <div class="form-group">
            <input type="email" id="deleteUserEmail" class="form-control" placeholder="Enter user email to delete">
        </div>
        <p style="color: red; font-weight: bold;">⚠️ WARNING: This action cannot be undone!</p>
    `, 'Delete User', () => {
        const email = document.getElementById('deleteUserEmail').value;
        
        if (email) {
            showMessage(`User ${email} has been permanently deleted from the system`, 'success');
            closeModal();
        } else {
            showErrorMessage('Please enter user email');
        }
    });
}

function showResetSystemModal() {
    createModal('Reset System', `
        <p style="color: red; font-weight: bold;">🚨 DANGER ZONE 🚨</p>
        <p>This will reset ALL system data including:</p>
        <ul>
            <li>All user accounts</li>
            <li>All reports</li>
            <li>All government users</li>
            <li>All system logs</li>
        </ul>
        <p style="color: red;">This action is IRREVERSIBLE!</p>
        <div class="form-group">
            <input type="text" id="resetConfirmation" class="form-control" placeholder="Type 'RESET SYSTEM' to confirm">
        </div>
    `, 'RESET SYSTEM', () => {
        const confirmation = document.getElementById('resetConfirmation').value;
        
        if (confirmation === 'RESET SYSTEM') {
            // Clear all localStorage data
            localStorage.clear();
            sessionStorage.clear();
            
            showMessage('System has been reset successfully!', 'success');
            closeModal();
            
            setTimeout(() => {
                window.location.href = 'superadmin-login.html';
            }, 2000);
        } else {
            showErrorMessage('Please type "RESET SYSTEM" to confirm');
        }
    });
}

// Utility Functions for SuperAdmin
function createModal(title, content, confirmText, confirmAction) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'activeModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-actions">
                <button class="modal-btn cancel" onclick="closeModal()">Cancel</button>
                <button class="modal-btn confirm" onclick="confirmModalAction()">${confirmText}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store the confirm action
    window.currentModalAction = confirmAction;
}

function closeModal() {
    const modal = document.getElementById('activeModal');
    if (modal) {
        modal.remove();
    }
    window.currentModalAction = null;
}

function confirmModalAction() {
    if (window.currentModalAction) {
        window.currentModalAction();
    }
}

function closeDataDisplay() {
    const dataArea = document.getElementById('dataDisplayArea');
    dataArea.classList.add('hidden');
}

// System Control Functions
function backupSystem() {
    showLoadingMessage('Creating system backup...');
    setTimeout(() => {
        showMessage('System backup created successfully!', 'success');
    }, 3000);
}

function clearSystemCache() {
    showLoadingMessage('Clearing system cache...');
    setTimeout(() => {
        showMessage('System cache cleared successfully!', 'success');
    }, 2000);
}

function toggleMaintenanceMode() {
    const isMaintenanceMode = localStorage.getItem('maintenanceMode') === 'true';
    
    if (isMaintenanceMode) {
        localStorage.setItem('maintenanceMode', 'false');
        showMessage('Maintenance mode disabled. System is now online.', 'success');
    } else {
        localStorage.setItem('maintenanceMode', 'true');
        showMessage('Maintenance mode enabled. System is now offline for users.', 'success');
    }
}

function exportReportsData() {
    showLoadingMessage('Generating reports export...');
    setTimeout(() => {
        // Create CSV data
        const csvData = "Report ID,Area,Category,Status,Date,User\nRPT001,Dhanmondi,Garbage,Resolved,2024-01-15,john@example.com\nRPT002,Gulshan,Road,In Progress,2024-01-20,jane@example.com";
        
        // Create download link
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'civify_reports_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        showMessage('Reports data exported successfully!', 'success');
    }, 2000);
}

function showLoadingMessage(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #17a2b8;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10001;
        font-weight: 600;
    `;
    loadingDiv.innerHTML = `🔄 ${message}`;
    document.body.appendChild(loadingDiv);
}

// Check SuperAdmin Authentication
function checkSuperadminAuth() {
    const isSuperadmin = sessionStorage.getItem('superadminLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'superadmin-dashboard.html' && !isSuperadmin) {
        window.location.href = 'superadmin-login.html';
    }
}

// Initialize SuperAdmin check
checkSuperadminAuth();

// Load Dynamic Profile Content
function loadProfileContent() {
    const profileLayout = document.getElementById('profileLayout');
    if (!profileLayout) return;
    
    const userType = sessionStorage.getItem('userType') || 'regular';
    const userEmail = sessionStorage.getItem('userEmail') || 'user@example.com';
    
    if (userType === 'superadmin') {
        loadSuperAdminProfile(profileLayout, userEmail);
    } else if (userType === 'government') {
        loadGovernmentProfile(profileLayout, userEmail);
    } else {
        loadRegularUserProfile(profileLayout, userEmail);
    }
}

function loadRegularUserProfile(container, email) {
    container.innerHTML = `
        <!-- Action Cards Row -->
        <div class="profile-actions-row">
            <div class="action-card profile-card" onclick="handleUserAction('captures')">
                <div class="action-icon camera-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Recent Captures</span>
                </div>
            </div>
            
            <div class="action-card profile-card" onclick="handleUserAction('mapping')">
                <div class="action-icon location-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Nearest Mapping</span>
                </div>
            </div>
            
            <div class="action-card profile-card" onclick="handleUserAction('progress')">
                <div class="action-icon progress-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Track Recent Progress</span>
                </div>
            </div>
        </div>
        
        <!-- User Info Card -->
        <div class="user-info-card">
            <h3>Welcome, ${getUserName(email)}</h3>
            <p class="user-email">Email: ${email}</p>
            <p class="user-contact">Contact: +123-456-7890</p>
            <span class="user-badge regular-user">Regular User</span>
        </div>
        
        <!-- Logout Button -->
        <div class="logout-section">
            <a href="login-options.html" class="logout-btn-profile" onclick="handleLogout()">Logout</a>
        </div>
    `;
}

function loadGovernmentProfile(container, email) {
    container.innerHTML = `
        <!-- Action Cards Row -->
        <div class="profile-actions-row">
            <div class="action-card profile-card govt-card" onclick="handleGovAction('dashboard')">
                <div class="action-icon dashboard-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Government Dashboard</span>
                </div>
            </div>
            
            <div class="action-card profile-card govt-card" onclick="handleGovAction('reports')">
                <div class="action-icon reports-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Manage Reports</span>
                </div>
            </div>
            
            <div class="action-card profile-card govt-card" onclick="handleGovAction('analytics')">
                <div class="action-icon analytics-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">View Analytics</span>
                </div>
            </div>
        </div>
        
        <!-- User Info Card -->
        <div class="user-info-card govt-info-card">
            <h3>Welcome, ${getUserName(email)}</h3>
            <p class="user-email">Email: ${email}</p>
            <p class="user-contact">Department: City Administration</p>
            <span class="user-badge govt-user">Government Official</span>
        </div>
        
        <!-- Action Buttons -->
        <div class="govt-actions">
            <a href="dashboard.html" class="action-btn-profile govt-btn">Open Dashboard</a>
            <a href="login-options.html" class="logout-btn-profile" onclick="handleLogout()">Logout</a>
        </div>
    `;
}

function loadSuperAdminProfile(container, username) {
    container.innerHTML = `
        <!-- Action Cards Row -->
        <div class="profile-actions-row">
            <div class="action-card profile-card superadmin-card" onclick="handleSuperAdminAction('users')">
                <div class="action-icon users-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Manage Users</span>
                </div>
            </div>
            
            <div class="action-card profile-card superadmin-card" onclick="handleSuperAdminAction('system')">
                <div class="action-icon system-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">System Control</span>
                </div>
            </div>
            
            <div class="action-card profile-card superadmin-card" onclick="handleSuperAdminAction('audit')">
                <div class="action-icon audit-icon-profile"></div>
                <div class="action-text">
                    <span class="action-title">Audit Logs</span>
                </div>
            </div>
        </div>
        
        <!-- User Info Card -->
        <div class="user-info-card superadmin-info-card">
            <h3>🔒 SuperAdmin: ${username}</h3>
            <p class="user-email">Access Level: MAXIMUM</p>
            <p class="user-contact">Last Login: ${new Date().toLocaleString()}</p>
            <span class="user-badge superadmin-user">🛡️ SUPERADMIN</span>
        </div>
        
        <!-- Action Buttons -->
        <div class="superadmin-actions">
            <a href="superadmin-dashboard.html" class="action-btn-profile superadmin-btn">Open Control Panel</a>
            <a href="dashboard.html" class="action-btn-profile govt-btn">Government Dashboard</a>
            <a href="login-options.html" class="logout-btn-profile" onclick="handleLogout()">Logout</a>
        </div>
    `;
}

// Action Handlers
function handleUserAction(action) {
    switch(action) {
        case 'captures':
            showMessage('Opening recent captures...', 'info');
            break;
        case 'mapping':
            window.open('https://maps.google.com', '_blank');
            break;
        case 'progress':
            window.location.href = 'track-issue.html';
            break;
    }
}

function handleGovAction(action) {
    switch(action) {
        case 'dashboard':
            window.location.href = 'dashboard.html';
            break;
        case 'reports':
            window.location.href = 'dashboard.html';
            break;
        case 'analytics':
            showMessage('Opening analytics dashboard...', 'info');
            break;
    }
}

function handleSuperAdminAction(action) {
    switch(action) {
        case 'users':
            window.location.href = 'superadmin-dashboard.html';
            break;
        case 'system':
            window.location.href = 'superadmin-dashboard.html';
            break;
        case 'audit':
            window.location.href = 'superadmin-dashboard.html';
            break;
    }
}

function handleLogout() {
    sessionStorage.clear();
    localStorage.removeItem('userLoggedIn');
    showMessage('Logged out successfully!', 'success');
}

function getUserName(email) {
    // Extract name from email or return default names
    if (email.includes('john')) return 'John Doe';
    if (email.includes('jane')) return 'Jane Smith';
    if (email.includes('mike')) return 'Mike Johnson';
    if (email.includes('sarah')) return 'Sarah Wilson';
    if (email === 'shoaib') return 'Shoaib Ahmed';
    if (email === 'superadmin') return 'System Administrator';
    if (email === 'admin') return 'Admin User';
    if (email === 'haxon_admin') return 'HaXon Administrator';
    
    // Extract from email
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Initialize profile content on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProfileContent();
});

// Show tracking help modal for users
function showTrackingHelp() {
    const helpModal = `
        <div id="trackingModal" class="modal-overlay" onclick="closeTrackingModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>📋 My Reports Status - How It Works</h3>
                    <button class="close-btn" onclick="closeTrackingModal()">×</button>
                </div>
                <div class="modal-body">
                    <div class="help-section">
                        <h4>🔍 Finding Your Reports:</h4>
                        <ul>
                            <li><strong>Email Confirmation:</strong> Check your email for report confirmations</li>
                            <li><strong>Phone Number:</strong> Use the same phone number you submitted with</li>
                            <li><strong>Location:</strong> Remember the area where you reported</li>
                            <li><strong>Date:</strong> Recall when you submitted the report</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h4>📱 Quick Actions:</h4>
                        <button class="action-btn" onclick="window.location.href='track-issue.html'">Track by ID</button>
                        <button class="action-btn" onclick="window.location.href='report-problem.html'">Report New Issue</button>
                        <button class="action-btn" onclick="window.location.href='contact.html'">Contact Support</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', helpModal);
    document.getElementById('trackingModal').style.display = 'flex';
}

function closeTrackingModal() {
    const modal = document.getElementById('trackingModal');
    if (modal) {
        modal.remove();
    }
}