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
            ${item.live_url ? `<div class="card-links"><a href="${item.live_url}" target="_blank" class="card-link">Live Demo →</a></div>` : ''}
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

// ========== MODAL FUNCTIONALITY FOR SUPEREKEEPER STORY ==========

// Get modal elements
const modal = document.getElementById('storyModal');
const closeBtn = document.querySelector('.close-modal');

// Story content for Superkeeper
const superkeeperStory = `
    <div class="story-content">
        <h1>📦 The Story Behind Superkeeper</h1>
        <p class="lead">"We're not just building software. We're enabling dreams. Every shilling a business saves helps a family. Every minute saved creates opportunity."</p>
        <p class="story-quote">— Moses Kipkorir Cheruiyot, Founder & CEO, Superkeeper</p>
        
        <h2>The Problem</h2>
        <p>While working as a developer in Nairobi, Moses watched his aunt struggle with paper records at her vegetable stall. Records got lost in the rain. Hours were spent counting inventory manually. No way to track what sold best or what was missing.</p>
        
        <h2>The Frustration That Sparked a Solution</h2>
        <p>"There has to be a better way. Technology should solve real problems, not create them," Moses thought. What started as a simple spreadsheet became a mission.</p>
        
        <h2>The Journey (2021-2025)</h2>
        <p><strong>2021:</strong> Built first prototype for his aunt's stall. She saved 10+ hours weekly.</p>
        <p><strong>2022:</strong> Three more shops asked to use it. Added stock tracking and sales reports.</p>
        <p><strong>2023:</strong> Superkeeper officially launched. 50 businesses joined in first month.</p>
        <p><strong>2024:</strong> Reached 500+ shops across Kenya. Added staff management features.</p>
        <p><strong>2025:</strong> Helping thousands of small business owners digitize their operations.</p>
        
        <h2>The Impact</h2>
        <p>Every shilling saved helps a family. Every minute saved creates opportunity. Superkeeper isn't just inventory software — it's a tool that enables dreams.</p>
        
        <h2>What's Next?</h2>
        <p>Expanding to 10 more African countries by 2030. Adding accounting, invoicing, and supplier management. Building a community of empowered small business owners.</p>
        
        <div style="text-align: center; margin-top: 2rem;">
            <a href="https://superkeeperapp-6isv.onrender.com/" target="_blank" class="cta-button" style="display: inline-block;">Try Superkeeper →</a>
        </div>
    </div>
`;

// Function to open modal with story
function openStoryModal(storyId) {
    if (storyId === 'superkeeper') {
        const modalContent = document.getElementById('modal-story-content');
        if (modalContent) {
            modalContent.innerHTML = superkeeperStory;
        }
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
}

// Add event listeners to all story buttons
function initStoryButtons() {
    const storyButtons = document.querySelectorAll('.story-btn');
    storyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const storyId = this.getAttribute('data-story');
            openStoryModal(storyId);
        });
    });
}

// Close modal when X is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

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
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initStoryButtons();
});