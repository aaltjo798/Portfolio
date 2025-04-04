// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tab switching functionality with toggle
const tabToggle = document.getElementById('tab-toggle');
const tabPanes = document.querySelectorAll('.tab-pane');

tabToggle.addEventListener('change', () => {
    // Remove active class from all panes
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to the appropriate pane
    const targetPane = tabToggle.checked ? document.getElementById('skills') : document.getElementById('career');
    targetPane.classList.add('active');
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Smooth follower movement
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animate);
}

animate();

// Theme Toggle Functionality
const initTheme = () => {
    const themeToggle = document.querySelector('.theme-switch__checkbox');
    const body = document.body;
    
    // Get saved theme or use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark-mode' : 'light-mode');
    
    // Set initial theme
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme);
    themeToggle.checked = savedTheme === 'light-mode';
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        const isLightMode = this.checked;
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(isLightMode ? 'light-mode' : 'dark-mode');
        localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
    });
};

// Initialize theme as soon as possible
initTheme();

// Re-initialize on DOM content loaded to ensure everything is set
document.addEventListener('DOMContentLoaded', initTheme);

// Technical Skills Carousel
const techGrid = document.querySelector('.tech-grid');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentPosition = 0;
const itemWidth = 120; // Width of each tech item including gap
const itemsPerView = window.innerWidth <= 768 ? 2 : 4;

function updateCarousel() {
    const maxPosition = -(techGrid.children.length - itemsPerView) * itemWidth;
    currentPosition = Math.max(maxPosition, Math.min(0, currentPosition));
    techGrid.style.transform = `translateX(${currentPosition}px)`;
    
    // Update button visibility
    prevBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentPosition === maxPosition ? '0.5' : '1';
}

prevBtn.addEventListener('click', () => {
    currentPosition += itemWidth;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentPosition -= itemWidth;
    updateCarousel();
});

// Initialize carousel
updateCarousel();

// Update carousel on window resize
window.addEventListener('resize', () => {
    currentPosition = 0;
    updateCarousel();
});

// NDA Popup functionality
function showNdaPopup() {
    const popup = document.getElementById('ndaPopup');
    if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
        
        // Add event listeners for closing the popup
        const closeButton = popup.querySelector('.nda-popup-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeNdaPopup);
        }
        
        // Close when clicking outside the content
        popup.addEventListener('click', function(event) {
            if (event.target === popup) {
                closeNdaPopup();
            }
        });
    }
}

function closeNdaPopup() {
    const popup = document.getElementById('ndaPopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Initialize popup functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close popup when clicking the close button
    const closeButton = document.querySelector('.nda-popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const popup = document.getElementById('ndaPopup');
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    // Close popup when clicking outside the content
    window.addEventListener('click', function(event) {
        const popup = document.getElementById('ndaPopup');
        if (event.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 