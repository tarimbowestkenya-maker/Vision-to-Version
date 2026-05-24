// static/js/on-off.js
// Screen Recording Toggle - Self-contained for testing

(function() {
    // ===== STATE MANAGEMENT =====
    let mediaStream = null;
    let mediaRecorder = null;
    let recordedChunks = [];
    let isRecording = false;
    let recordingId = null;
    let recordingStartTime = null;
    
    // ===== INJECT CSS =====
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Screen Recording Toggle Styles */
            .recorder-container {
                position: relative;
                width: 100%;
                height: 100%;
                min-height: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            }
            
            .record-btn {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                position: relative;
                margin-bottom: 2rem;
            }
            
            .record-btn.off {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                animation: pulse 2s infinite;
            }
            
            .record-btn.on {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                animation: pulseRed 1.5s infinite;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4); }
                50% { box-shadow: 0 4px 30px rgba(102, 126, 234, 0.8); }
                100% { box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4); }
            }
            
            @keyframes pulseRed {
                0% { box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4); }
                50% { box-shadow: 0 4px 40px rgba(245, 87, 108, 0.9); }
                100% { box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4); }
            }
            
            .record-btn .icon {
                font-size: 36px;
                margin-bottom: 8px;
            }
            
            .record-btn .text {
                font-size: 16px;
                font-weight: bold;
            }
            
            .recording-indicator {
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                margin-top: 1rem;
            }
            
            .indicator-dot {
                width: 12px;
                height: 12px;
                background: #ff4757;
                border-radius: 50%;
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.3; }
                100% { opacity: 1; }
            }
            
            .share-link-container {
                background: #f5f5f5;
                padding: 1.5rem;
                border-radius: 10px;
                width: 100%;
                max-width: 500px;
                margin-top: 2rem;
            }
            
            .share-link-container h3 {
                margin: 0 0 1rem 0;
                color: #333;
            }
            
            .link-box {
                display: flex;
                gap: 0.5rem;
            }
            
            .link-box input {
                flex: 1;
                padding: 1rem;
                border: 2px solid #00b894;
                border-radius: 5px;
                font-size: 0.9rem;
                background: white;
            }
            
            .link-box button {
                padding: 1rem 2rem;
                background: #00b894;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: background 0.3s;
            }
            
            .link-box button:hover {
                background: #00997a;
            }
            
            .viewer-count {
                margin-top: 1rem;
                color: #00b894;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .recordings-panel {
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                padding: 1.5rem;
                width: 100%;
                max-width: 500px;
                margin-top: 2rem;
            }
            
            .recordings-panel h3 {
                margin: 0 0 1rem 0;
                color: #333;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .recordings-list {
                max-height: 200px;
                overflow-y: auto;
            }
            
            .recording-item {
                background: #f5f5f5;
                padding: 0.8rem;
                border-radius: 5px;
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: background 0.3s;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .recording-item:hover {
                background: #e0e0e0;
            }
            
            .recording-time {
                font-size: 0.8rem;
                color: #666;
            }
            
            .recording-size {
                font-size: 0.8rem;
                color: #00b894;
                font-weight: bold;
            }
            
            .clear-btn {
                width: 100%;
                padding: 0.8rem;
                background: #ff4757;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 1rem;
                font-weight: bold;
                transition: background 0.3s;
            }
            
            .clear-btn:hover {
                background: #ff6b81;
            }
            
            .test-video-container {
                margin-top: 2rem;
                width: 100%;
                max-width: 500px;
            }
            
            .test-video {
                width: 100%;
                border-radius: 10px;
                background: #000;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== INJECT HTML =====
    function injectHTML() {
        const container = document.getElementById('recorder-container');
        if (!container) return;
        
        // Clear placeholder
        container.innerHTML = '';
        
        // Create recorder UI
        const recorderUI = document.createElement('div');
        recorderUI.className = 'recorder-container';
        recorderUI.innerHTML = `
            <!-- Main Record Button -->
            <button class="record-btn off" id="recordToggle">
                <span class="icon">⏺️</span>
                <span class="text">START</span>
            </button>
            
            <!-- Recording Indicator (hidden initially) -->
            <div class="recording-indicator" id="recordingIndicator" style="display: none;">
                <span class="indicator-dot"></span>
                <span>Recording screen... <span id="recordingTimer">0s</span></span>
            </div>
            
            <!-- Share Link (hidden initially) -->
            <div class="share-link-container" id="shareLinkContainer" style="display: none;">
                <h3>🔗 Share this link with viewers</h3>
                <div class="link-box">
                    <input type="text" id="streamUrl" readonly value="https://showmelive.com/watch/abc123">
                    <button onclick="copyLink()">Copy</button>
                </div>
                <div class="viewer-count">
                    <span>👀</span>
                    <span>Viewers: <span id="viewerCount">0</span></span>
                </div>
            </div>
            
            <!-- Recordings Panel -->
            <div class="recordings-panel">
                <h3>📼 Test Recordings <span id="recordingCount"></span></h3>
                <div class="recordings-list" id="recordingsList">
                    <p style="color: #999; text-align: center;">No recordings yet</p>
                </div>
                <button class="clear-btn" id="clearRecordings">Delete All Test Recordings</button>
            </div>
            
            <!-- Test Video Player (hidden initially) -->
            <div class="test-video-container" id="testVideoContainer" style="display: none;">
                <video class="test-video" id="testVideo" controls></video>
            </div>
        `;
        
        container.appendChild(recorderUI);
    }
    
    // ===== LOCAL STORAGE FUNCTIONS =====
    function saveRecordingToStorage(blob, duration) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const recordings = JSON.parse(localStorage.getItem('showmelive_test_recordings') || '[]');
            recordings.push({
                id: Date.now(),
                data: reader.result,
                timestamp: new Date().toISOString(),
                duration: duration,
                size: blob.size
            });
            localStorage.setItem('showmelive_test_recordings', JSON.stringify(recordings));
            updateRecordingsList();
        };
        reader.readAsDataURL(blob);
    }
    
    function getRecordingsFromStorage() {
        return JSON.parse(localStorage.getItem('showmelive_test_recordings') || '[]');
    }
    
    // ===== UPDATE UI =====
    function updateRecordingsList() {
        const recordings = getRecordingsFromStorage();
        const listEl = document.getElementById('recordingsList');
        const countEl = document.getElementById('recordingCount');
        
        if (!listEl) return;
        
        if (recordings.length === 0) {
            listEl.innerHTML = '<p style="color: #999; text-align: center;">No recordings yet</p>';
            if (countEl) countEl.textContent = '';
            return;
        }
        
        if (countEl) countEl.textContent = `(${recordings.length})`;
        
        listEl.innerHTML = recordings.map(rec => {
            const date = new Date(rec.timestamp);
            return `
                <div class="recording-item" data-id="${rec.id}">
                    <div>
                        <strong>Test ${date.toLocaleTimeString()}</strong>
                        <div class="recording-time">${date.toLocaleDateString()}</div>
                    </div>
                    <div class="recording-size">${(rec.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
            `;
        }).join('');
        
        // Add click handlers to recordings
        document.querySelectorAll('.recording-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                playRecording(id);
            });
        });
    }
    
    function playRecording(id) {
        const recordings = getRecordingsFromStorage();
        const recording = recordings.find(r => r.id === id);
        
        if (recording) {
            const video = document.getElementById('testVideo');
            const container = document.getElementById('testVideoContainer');
            video.src = recording.data;
            container.style.display = 'block';
            video.play();
        }
    }
    
    // ===== TIMER FUNCTION =====
    function updateTimer() {
        if (!isRecording) return;
        
        const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timerEl = document.getElementById('recordingTimer');
        if (timerEl) {
            timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        setTimeout(updateTimer, 1000);
    }
    
    // ===== RECORDING LOGIC =====
    async function startRecording() {
        try {
            mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });
            
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(mediaStream, {
                mimeType: 'video/webm;codecs=vp9,opus'
            });
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
                saveRecordingToStorage(blob, duration);
                
                // Stop all tracks
                mediaStream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start(1000); // Capture every second
            isRecording = true;
            recordingStartTime = Date.now();
            
            // Update UI
            const btn = document.getElementById('recordToggle');
            btn.className = 'record-btn on';
            btn.innerHTML = '<span class="icon">⏹️</span><span class="text">STOP</span>';
            
            document.getElementById('recordingIndicator').style.display = 'flex';
            document.getElementById('shareLinkContainer').style.display = 'block';
            
            // Generate unique stream ID
            const streamId = Math.random().toString(36).substring(2, 8);
            document.getElementById('streamUrl').value = `${window.location.origin}/watch/${streamId}`;
            
            // Start timer
            updateTimer();
            
            // Auto-stop when user clicks "Stop sharing" in browser
            mediaStream.getVideoTracks()[0].onended = () => {
                if (isRecording) stopRecording();
            };
            
        } catch (err) {
            alert('Error accessing screen: ' + err.message);
            console.error(err);
        }
    }
    
    function stopRecording() {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
            
            // Update UI
            const btn = document.getElementById('recordToggle');
            btn.className = 'record-btn off';
            btn.innerHTML = '<span class="icon">⏺️</span><span class="text">START</span>';
            
            document.getElementById('recordingIndicator').style.display = 'none';
            document.getElementById('shareLinkContainer').style.display = 'none';
        }
    }
    
    // ===== INITIALIZATION =====
    function init() {
        console.log('🎬 Screen Recorder initializing...');
        
        // Inject UI
        injectStyles();
        injectHTML();
        
        // Load existing recordings
        updateRecordingsList();
        
        // Add event listeners
        const recordBtn = document.getElementById('recordToggle');
        if (recordBtn) {
            recordBtn.addEventListener('click', () => {
                if (!isRecording) {
                    startRecording();
                } else {
                    stopRecording();
                }
            });
        }
        
        const clearBtn = document.getElementById('clearRecordings');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Delete all test recordings?')) {
                    localStorage.removeItem('showmelive_test_recordings');
                    updateRecordingsList();
                    document.getElementById('testVideoContainer').style.display = 'none';
                }
            });
        }
        
        console.log('✅ Screen Recorder ready!');
    }
    
    // Make copyLink function global
    window.copyLink = function() {
        const input = document.getElementById('streamUrl');
        input.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    };
    
    // Start when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();