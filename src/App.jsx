import './App.css';
import { useState } from 'react';
import StoryModal from './StoryModal';
import Contact from './Contact';

function App() {
  const [modalStory, setModalStory] = useState(null);

  const openModal = (storyId) => {
    setModalStory(storyId);
  };

  const closeModal = () => {
    setModalStory(null);
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">
          <span>◇</span>vision-to-version.com
        </div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#envisioned">Ideas</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="mobile-menu-btn" id="mobileMenuBtn">☰</button>
      </nav>

      {/* Mobile menu */}
      <div className="mobile-menu" id="mobileMenu">
        <a href="#work">Work</a>
        <a href="#envisioned">Ideas</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img src="/images/VictorMoses.png" alt="Victor + Moses — Code & Vision" />
        </div>
        <div className="hero-content">
          <h1>
            We turn <span className="highlight">ideas</span>
            <br />into working code.
          </h1>
          <div className="tagline">
            "We don't just imagine the future. We build it, line by line."
          </div>
          <div className="signature">
            — Victor, Business & Ideas
            <br />
            — Moses, Code & Execution
          </div>
          <a href="#work" className="cta-button">View our work →</a>
        </div>
      </section>

      {/* Scroll hint */}
      <div className="scroll-hint">
        ▼ Scroll down for portfolio & envisioned projects ▼
      </div>

      {/* Portfolio Section */}
      <section id="work" className="section">
        <div className="container">
          <h2 className="section-title">What we've built</h2>
          <div className="portfolio-grid">
            
            {/* Superkeeper Card */}
            <div className="portfolio-card">
              <img src="/images/logo.png" alt="Superkeeper dashboard" className="card-screenshot" />
              <h3>📦 Superkeeper</h3>
              <p>Inventory management for small shops in Kenya. Track stock, manage staff, see sales in real-time. 500+ businesses served.</p>
              <small>Flask • SQLite • HTML/CSS/JS</small>
              <div className="card-links">
                <a href="https://superkeeperapp-6isv.onrender.com/" target="_blank" rel="noopener noreferrer" className="card-link">
                  Live Demo →
                </a>
                <button className="card-link story-btn" onClick={() => openModal('superkeeper')}>
                  Read Story →
                </button>
              </div>
            </div>

            {/* CareCrewKe Card */}
            <div className="portfolio-card">
              <img src="/images/carecrewlogo.png" alt="CareCrewKe platform" className="card-screenshot" />
              <h3>👥 CareCrewKe</h3>
              <p>AI-powered job platform with CV matching and smart recommendations.</p>
              <small>Flask • AI • Firebase</small>
            </div>

            {/* Facebook Data Collector Card */}
            <div className="portfolio-card">
              <img src="/images/facebook-collector.png" alt="Facebook Data Collector" className="card-screenshot" />
              <h3>📘 Facebook Data Collector</h3>
              <p>Extract structured data from Facebook posts — dates, locations, people mentioned, comments, and action categories. Saves locally to CSV.</p>
              <small>Python • Flask • Regex • NLP</small>
              <div className="card-links">
                <a href="https://facebook-data-collector.onrender.com/" target="_blank" rel="noopener noreferrer" className="card-link">
                  Live Demo →
                </a>
                <button className="card-link story-btn" onClick={() => openModal('facebook')}>
                  Read Story →
                </button>
              </div>
            </div>

            {/* M-Pesa API Playground Card */}
            <div className="portfolio-card">
              <img src="/images/darajaplay.png" alt="M-Pesa API Playground dashboard" className="card-screenshot" />
              <h3>💰 M-Pesa API Playground</h3>
              <p>Interactive demo platform for Safaricom M-Pesa Daraja APIs. Test STK Push (C2B) and B2C payments in sandbox environment. Built with Flask and Daraja API.</p>
              <small>Python • Flask • Daraja API • REST</small>
              <div className="card-links">
                <a href="https://mpesa-daraja-apis.onrender.com/" target="_blank" rel="noopener noreferrer" className="card-link">
                  Live Demo →
                </a>
                <a href="https://github.com/ArapCheruiyot/Darajaplay" target="_blank" rel="noopener noreferrer" className="card-link">
                  GitHub →
                </a>
                <button className="card-link story-btn" onClick={() => openModal('mpesa')}>
                  Read Story →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Envisioned Projects Section */}
      <section id="envisioned" className="section section-dark">
        <div className="container">
          <h2 className="section-title">What we're envisioning</h2>
          <div className="envisioned-grid">
            <div className="envisioned-card">
              <h3>🎓 AI College</h3>
              <p>Interactive platform where AI teaches coding with personalized attention.</p>
              <span className="status-badge">In Development</span>
            </div>
            <div className="envisioned-card">
              <h3>🔒 Focus Learning Mode</h3>
              <p>Distraction-free learning with engagement tracking.</p>
              <span className="status-badge">Planning Phase</span>
            </div>
            <div className="envisioned-card">
              <h3>📊 Parent Dashboard</h3>
              <p>Real-time insights into learning progress.</p>
              <span className="status-badge">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Vision-to-Version — Victor + Moses</p>
      </footer>

      {/* Modal Component */}
      <StoryModal storyId={modalStory} onClose={closeModal} />
    </div>
  );
}

export default App;