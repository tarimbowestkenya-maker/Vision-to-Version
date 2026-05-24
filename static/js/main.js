// Mobile menu toggle
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        if (mobileMenu.style.display === 'flex') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'flex';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (mobileMenu) mobileMenu.style.display = 'none';
        }
    });
});

// Load portfolio and envisioned projects from Flask API
async function loadProjects() {
    try {
        // Fetch portfolio items
        const portfolioRes = await fetch('/api/portfolio');
        const portfolioData = await portfolioRes.json();
        
        // Fetch envisioned projects
        const envisionedRes = await fetch('/api/envisioned');
        const envisionedData = await envisionedRes.json();
        
        renderPortfolio(portfolioData);
        renderEnvisioned(envisionedData);
    } catch (error) {
        console.error('Error loading projects:', error);
        showFallbackData();
    }
}

function renderPortfolio(items) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    if (!items.length) {
        grid.innerHTML = '<div class="loading">No portfolio items yet. Check back soon!</div>';
        return;
    }
    
    grid.innerHTML = items.map(item => `
        <div class="portfolio-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <small>${escapeHtml(item.tech_stack || '')}</small>
        </div>
    `).join('');
}

function renderEnvisioned(projects) {
    const grid = document.getElementById('envisionedGrid');
    if (!grid) return;
    
    if (!projects.length) {
        grid.innerHTML = '<div class="loading">Placeholder ideas coming soon...</div>';
        return;
    }
    
    grid.innerHTML = projects.map(project => `
        <div class="envisioned-card">
            <h3>🔮 ${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.idea_summary)}</p>
            <span class="status-badge">${escapeHtml(project.status || 'Brainstorming')}</span>
        </div>
    `).join('');
}

function showFallbackData() {
    // Demo data while backend is being built
    renderPortfolio([
        { title: "AI Task Manager", description: "Smart to-do app with priority prediction", tech_stack: "Python, Flask, JS" },
        { title: "Local Business Directory", description: "Map-based discovery for small shops", tech_stack: "HTML, CSS, JS" }
    ]);
    renderEnvisioned([
        { title: "Freelance Matchmaker", idea_summary: "AI that pairs devs with ideal clients", status: "Validating" },
        { title: "No-Code Analytics", idea_summary: "Drag-drop dashboards for non-techies", status: "Mockup ready" }
    ]);
}

// Helper to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button');
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate send (replace with actual fetch to your backend)
        setTimeout(() => {
            alert('Message sent! We\'ll get back to you soon.');
            contactForm.reset();
            button.textContent = 'Send message →';
            button.disabled = false;
        }, 1000);
    });
}

// Load everything when page loads
document.addEventListener('DOMContentLoaded', loadProjects);