import React from 'react';
import './CV.css';

function CVPage() {
  return (
    <div className="cv-page-container">
      <div className="cv-page-header">
        <h1>📄 My Resume</h1>
        <p>Moses Kipkorir Cheruiyot — Python Developer & AI Specialist</p>
        <div className="cv-page-buttons">
          <a 
            href="/assets/cv/Moses_Cheruiyot_CV.pdf" 
            download
            className="cv-download-btn"
          >
            📥 Download PDF
          </a>
          <a 
            href="/assets/cv/Moses_Cheruiyot_CV.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="cv-view-btn"
          >
            👁️ View Full Screen
          </a>
          <a href="/" className="cv-back-btn">
            ← Back to Portfolio
          </a>
        </div>
      </div>
      <div className="cv-embed-wrapper">
        <iframe 
          src="/assets/cv/Moses_Cheruiyot_CV.pdf#toolbar=1" 
          width="100%" 
          height="800px"
          title="Moses Cheruiyot CV"
        />
      </div>
    </div>
  );
}

export default CVPage;