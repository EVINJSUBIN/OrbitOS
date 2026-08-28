// --- Clock Logic ---
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    clockElement.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// --- Window Manager ---
let highestZIndex = 1;

function makeDraggable(windowElement) {
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    windowElement.addEventListener('mousedown', () => {
        highestZIndex++;
        windowElement.style.zIndex = highestZIndex;
    });

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = windowElement.offsetLeft;
        initialTop = windowElement.offsetTop;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        windowElement.style.left = `${initialLeft + (e.clientX - startX)}px`;
        windowElement.style.top = `${initialTop + (e.clientY - startY)}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    const closeBtn = windowElement.querySelector('.window-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            windowElement.remove();
        });
    }
}

// --- App Spawner Engine ---
function createWindow(id, title, contentHTML, width = 320, height = 220) {
    const existing = document.getElementById(id);
    if (existing) {
        // Bring to front if already open
        highestZIndex++;
        existing.style.zIndex = highestZIndex;
        return null; 
    }

    const win = document.createElement('div');
    win.className = 'window';
    win.id = id;
    win.style.width = width + 'px';
    win.style.height = height + 'px';
    // Stagger window spawn positions
    win.style.top = (50 + (highestZIndex * 20) % 150) + 'px';
    win.style.left = (150 + (highestZIndex * 20) % 150) + 'px';
    
    highestZIndex++;
    win.style.zIndex = highestZIndex;

    win.innerHTML = `
        <div class="window-header">
            <span class="window-title">${title}</span>
            <button class="window-close">X</button>
        </div>
        <div class="window-content">
            ${contentHTML}
        </div>
    `;

    document.getElementById('desktop').appendChild(win);
    makeDraggable(win);
    return win;
}

// --- Mini-Apps Implementation ---

// 1. Notepad App (Saves to localStorage)
function openNotepad() {
    const win = createWindow('app-notepad', '📝 Notepad', '<textarea id="notepad-text" placeholder="Type your notes here... They autosave!"></textarea>');
    if (win) {
        const textarea = win.querySelector('#notepad-text');
        textarea.value = localStorage.getItem('orbitos-notes') || '';
        textarea.addEventListener('input', () => {
            localStorage.setItem('orbitos-notes', textarea.value);
        });
    }
}

// 2. Web Browser App (Iframe with Address Bar)
function openBrowser() {
    const content = `
        <div style="display: flex; flex-direction: column; height: 100%; width: 100%; background: #ddd;">
            <div style="display: flex; padding: 5px; background: #eee; border-bottom: 1px solid #ccc;">
                <input type="text" id="browser-url" value="https://example.com" style="flex-grow: 1; padding: 5px; border: 1px solid #ccc; border-radius: 3px; font-family: sans-serif; outline: none;">
                <button id="browser-go" style="margin-left: 5px; padding: 5px 15px; cursor: pointer; background: #338eda; color: white; border: none; border-radius: 3px; font-weight: bold;">Go</button>
            </div>
            <iframe id="browser-frame" src="https://example.com" style="flex-grow: 1; border: none; background: white;" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
            <div style="padding: 2px 5px; font-size: 0.75em; color: #555; text-align: center; background: #eee; border-top: 1px solid #ccc;">
                Note: Many large sites (like Google or GitHub) block embedding via iframe for security.
            </div>
        </div>
    `;
    const win = createWindow('app-browser', '🌐 Web Browser', content, 750, 550);
    
    if (win) {
        const urlInput = win.querySelector('#browser-url');
        const goBtn = win.querySelector('#browser-go');
        const frame = win.querySelector('#browser-frame');

        const navigate = () => {
            let url = urlInput.value.trim();
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
                urlInput.value = url;
            }
            frame.src = url;
        };

        goBtn.addEventListener('click', navigate);
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') navigate();
        });
    }
}

// 3. Unique App: ISS Tracker (Fetches live public API data)
function openISSTracker() {
    const content = `
        <div style="padding: 15px; font-family: monospace; text-align: center; display: flex; flex-direction: column; justify-content: center; height: 100%; background: rgba(0,0,0,0.5);">
            <h3 style="margin-top:0; color:#00d2ff;">🛰️ ISS Live Telemetry</h3>
            <div id="iss-data" style="margin-bottom: 20px; line-height: 1.6; font-size: 1.1em;">
                Establishing uplink...<br><span style="font-size: 24px;">⏳</span>
            </div>
            <button id="iss-refresh" style="background: rgba(0,210,255,0.2); border: 1px solid #00d2ff; color: white; padding: 8px 15px; cursor: pointer; border-radius: 4px; font-weight: bold;">Sync Coordinates</button>
        </div>
    `;
    const win = createWindow('app-isstracker', '🛰️ ISS Tracker', content, 350, 280);
    
    if (win) {
        const dataDiv = win.querySelector('#iss-data');
        const refreshBtn = win.querySelector('#iss-refresh');

        const fetchISSData = async () => {
            try {
                dataDiv.innerHTML = 'Establishing uplink...<br><span style="font-size: 24px;">⏳</span>';
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                const data = await response.json();
                dataDiv.innerHTML = `
                    <div style="color: #00fa9a;">LAT: ${data.latitude.toFixed(4)}°</div>
                    <div style="color: #00fa9a;">LNG: ${data.longitude.toFixed(4)}°</div>
                    <div style="color: #ff4757; margin-top:10px;">ALT: ${data.altitude.toFixed(2)} km</div>
                    <div style="color: #ff4757;">VEL: ${data.velocity.toFixed(2)} km/h</div>
                `;
            } catch (error) {
                dataDiv.innerHTML = `<span style="color: #ff4757;">Error connecting to satellite API.</span>`;
            }
        };

        refreshBtn.addEventListener('click', fetchISSData);
        fetchISSData(); // Initial load
    }
}

// --- Initialize Desktop Environment ---
document.getElementById('icon-notepad').addEventListener('dblclick', openNotepad);
document.getElementById('icon-browser').addEventListener('dblclick', openBrowser);
document.getElementById('icon-isstracker').addEventListener('dblclick', openISSTracker);

// Boot sequence complete message
console.log("OrbitOS Boot Sequence Complete. All systems online.");
