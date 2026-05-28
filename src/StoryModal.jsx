import './StoryModal.css';

function StoryModal({ storyId, onClose }) {
  if (!storyId) {
    return null;  // If no storyId, show nothing
  }

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div id="modal-story-content">
          
          {/* Superkeeper Story */}
          {storyId === 'superkeeper' && (
            <div>
              <h2>📦 Superkeeper — Inventory & POS System</h2>
              <p><strong>Live Demo:</strong> <a href="https://superkeeperapp-6isv.onrender.com/" target="_blank" rel="noopener noreferrer">superkeeperapp-6isv.onrender.com</a></p>
              
              <h3>What it does:</h3>
              <p>Full-stack inventory management system for small retail shops in Kenya. Helps shop owners track stock, manage staff, and see sales in real-time. 500+ businesses served.</p>
              
              <h3>Key Features:</h3>
              <ul>
                <li>FIFO cost tracking for batches</li>
                <li>Bilingual interface (English/Swahili)</li>
                <li>Real-time sales tracking</li>
                <li>Multi-shop support</li>
                <li>Role-based access control for staff</li>
              </ul>
              
              <h3>Tech Stack:</h3>
              <ul>
                <li>Backend: Python / Flask</li>
                <li>Frontend: JavaScript, HTML/CSS</li>
                <li>Database: Firebase / Firestore</li>
                <li>Deployment: Render</li>
              </ul>
            </div>
          )}

          {/* Facebook Data Collector Story */}
          {storyId === 'facebook' && (
            <div>
              <h2>📊 Facebook Data Collector</h2>
              <p><strong>Live Demo:</strong> <a href="https://facebook-data-collector.onrender.com/" target="_blank" rel="noopener noreferrer">facebook-data-collector.onrender.com</a></p>
              
              <h3>What it does:</h3>
              <p>A web application that extracts structured data from Facebook posts — including dates, locations, mentioned people, action types, and comments. Saves data directly to the user's computer with no server storage.</p>
              
              <h3>✨ Features:</h3>
              <ul>
                <li><strong>Paste any Facebook post</strong> — Extracts date, location, people mentioned, and key quotes</li>
                <li><strong>Comment extraction</strong> — Captures comments with sentiment analysis (positive/neutral/negative)</li>
                <li><strong>Action detection</strong> — Automatically categorizes posts (roads, water, funeral, church, fundraising, etc.)</li>
                <li><strong>Custom keywords</strong> — Users can add/remove keywords to customize action detection</li>
                <li><strong>Local storage</strong> — Data saves to CSV files on your own computer (privacy first)</li>
                <li><strong>Export to CSV</strong> — Download your data as CSV files</li>
                <li><strong>Statistics dashboard</strong> — Shows post counts and action breakdowns</li>
              </ul>
              
              <h3>🚀 How to Use:</h3>
              <ul>
                <li>Select a folder — Choose where to save your data</li>
                <li>Paste a Facebook post — Copy any Facebook post and paste it into the text area</li>
                <li>Click Save — The app extracts data and saves it to CSV files</li>
                <li>Manage keywords — Add or remove keywords to control what actions are detected</li>
                <li>Export data — Download your posts and comments as CSV files</li>
              </ul>
              
              <h3>📁 File Structure:</h3>
              <p>When you save posts, two CSV files are created in your selected folder:</p>
              <ul>
                <li><code>raymond_posts.csv</code> — All extracted post data</li>
                <li><code>raymond_comments.csv</code> — All extracted comments</li>
              </ul>
              
              <h3>🔒 Privacy Focus:</h3>
              <ul>
                <li>No server storage — Your data never leaves your computer</li>
                <li>Each user's data is private — Different users save to different folders</li>
                <li>You control everything — You choose where to save your data</li>
              </ul>
              
              <h3>🛠️ Tech Stack:</h3>
              <ul>
                <li>Backend: Python / Flask</li>
                <li>Frontend: HTML, CSS, JavaScript</li>
                <li>Extraction: Regex patterns, NLP</li>
                <li>Storage: Local CSV files (user's computer)</li>
                <li>Deployment: Render</li>
              </ul>
              
              <p><strong>👨‍💻 Author:</strong> Moses Kipkorir Cheruiyot</p>
              <p><strong>📄 License:</strong> MIT</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default StoryModal;