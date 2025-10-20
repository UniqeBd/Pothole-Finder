# CIVIFY - Civic Reporting Platform

A responsive web application that allows citizens to report urban problems directly to local authorities, improving communication between people and government.

## Features

### 🏠 **Home Page**
- Inspiring tagline: "LET EVERY PROBLEM BE SEEN, LET EVERY VOICE BE HEARD"
- Introduction to Civify's mission
- Quick access action cards for Recent Captures, Nearest Mapping, and Track Recent Progress

### 📋 **Report Problem**
- Location/Area selection dropdown
- Photo upload functionality
- Problem category selection (Garbage, Road, Light, Water, Drainage, Scam, Other)
- Description text area
- Real-time form validation
- Success confirmation with "Your report has been submitted"

### 🔍 **Track Issue**
- Report ID input field
- Visual progress tracker (Submitted → Verified → In Progress → Resolved)
- Interactive map display
- Status updates and progress visualization

### ℹ️ **About Page**
- Company mission: "To make reporting urban problems simple and transparent"
- Company vision: "To build cleaner, smarter, and more responsible cities through citizen participation"
- Professional layout with icons

### 📞 **Contact Us**
- Contact form with name, email, and message fields
- Displayed contact information (+123-456-7890, info@civify.com)
- Spam detection indicator
- Form validation and submission handling

### 🔐 **Authentication System**
- **Login Options Page**: Choose between Login, Signup, or Government Signup
- **User Login**: Email and password authentication
- **User Signup**: Name, email, password, and contact registration
- **Government Signup**: Additional "Word No." field for government officials
- Session management and user redirects

### 👤 **User Profile**
- Welcome message with user details
- Action cards for Recent Captures, Nearest Mapping, and Track Recent Progress
- Logout functionality

### 🏛️ **Government Dashboard**
- Statistics overview (Total Reports: 20, Pending: 4, Resolved: 16)
- Reports table with Photo, Area, Category, Status, Date, and Action columns
- Interactive action buttons (Verify, In Progress, Resolved)
- Real-time status updates

## Technical Implementation

### 🎨 **Frontend Technologies**
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and form handling

### 📱 **Responsive Design**
- Mobile-first approach
- Hamburger menu for mobile navigation
- Flexible grid layouts
- Optimized for all screen sizes (desktop, tablet, mobile)

### ✨ **User Experience**
- Clean, modern UI with consistent green theme
- Smooth animations and transitions
- Loading states and user feedback
- Form validation with error messages
- Success notifications

### 🔧 **Key JavaScript Features**
- **Form Validation**: Real-time validation for all forms
- **Local Storage**: Report data persistence and user sessions
- **Dynamic Content**: Progress tracking and status updates
- **Navigation**: Mobile hamburger menu and active link highlighting
- **File Upload**: Image handling for problem reports
- **Authentication**: Login/logout functionality with session management

## File Structure

```
CIVIFY/
├── index.html              # Home page
├── about.html              # About page
├── report-problem.html     # Report problem form
├── track-issue.html        # Track issue status
├── contact.html            # Contact form
├── login-options.html      # Authentication options
├── login.html              # User login
├── signup.html             # User registration
├── gov-signup.html         # Government registration
├── profile.html            # User profile
├── dashboard.html          # Government dashboard
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
└── README.md              # Project documentation
```

## Usage Instructions

### 🚀 **Getting Started**
1. Open `index.html` in a web browser
2. Navigate through the site using the top navigation menu
3. Access authentication via the "User Profile" button

### 📝 **Reporting a Problem**
1. Go to "Report Problem" page
2. Select your area/location
3. Upload a photo of the issue
4. Choose the problem category
5. Provide a detailed description
6. Submit the report and receive a confirmation

### 🔎 **Tracking Your Report**
1. Go to "Track Issue" page
2. Enter your Report ID (e.g., RPT12345678)
3. View the current status in the progress tracker
4. Monitor updates as your report moves through the system

### 👥 **User Accounts**
- **Regular Users**: Sign up with name, email, password, and contact
- **Government Officials**: Additional Word No. field required
- **Login**: Access profile or dashboard based on user type

### 🏛️ **Government Features**
- View all submitted reports in organized table format
- Update report statuses (Pending → Verified → In Progress → Resolved)
- Monitor statistics and progress metrics

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Demo Data

The application includes sample report data for testing:
- Report ID: `RPT12345678` (In Progress)
- Report ID: `RPT87654321` (Resolved)

## Future Enhancements

- Real-time notifications
- GPS location integration
- Email notifications for status updates
- Advanced reporting analytics
- Multi-language support
- API integration with government systems

---

**CIVIFY** - Connecting Citizens with Authorities for a Smarter, Cleaner City 🌱