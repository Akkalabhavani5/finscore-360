/**
 * FinScore 360 – Global JS
 */
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in navbar
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = '#10b981';
            link.style.fontWeight = '600';
        }
    });
});
