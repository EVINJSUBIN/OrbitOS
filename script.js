function updateClock() {
    const myClock = document.getElementById('clock');
    if (!myClock) return;

    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0' + m : m;
    
    myClock.textContent = `${h}:${m} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();


let zcount = 1;

function makeDraggable(winDiv) {
    const header = winDiv.querySelector('.window-header');
    let dragging = false;
    let startX, startY, startLeft, startTop;

    winDiv.addEventListener('mousedown', () => {
        zcount++;
        winDiv.style.zIndex = zcount;
    });

    header.addEventListener('mousedown', (e) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = winDiv.offsetLeft;
        startTop = winDiv.offsetTop;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        winDiv.style.left = `${startLeft + (e.clientX - startX)}px`;
        winDiv.style.top = `${startTop + (e.clientY - startY)}px`;
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
    });
    
    const closeBtn = winDiv.querySelector('.window-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            winDiv.remove();
        });
    }
}

function createWindow(id, title, inHTML, w = 320, h = 220) {
    const oldWin = document.getElementById(id);
    if (oldWin) {
        zcount++;
        oldWin.style.zIndex = zcount;
        return null; 
    }

    const box = document.createElement('div');
    box.className = 'window';
    box.id = id;
    box.style.width = w + 'px';
    box.style.height = h + 'px';
    box.style.top = (50 + (zcount * 20) % 150) + 'px';
    box.style.left = (150 + (zcount * 20) % 150) + 'px';
    
    zcount++;
    box.style.zIndex = zcount;

    box.innerHTML = `
        <div class="window-header">
            <span class="window-title">${title}</span>
            <button class="window-close">X</button>
        </div>
        <div class="window-content">
            ${inHTML}
        </div>
    `;

    document.getElementById('desktop').appendChild(box);
    makeDraggable(box);
    return box;
}

function openNotepad() {
    const theWin = createWindow('app-notepad', '📝 Notepad', '<textarea id="notepad-text" placeholder="Type your notes here... They autosave!"></textarea>');
    if (theWin) {
        const textbox = theWin.querySelector('#notepad-text');
        textbox.value = localStorage.getItem('orbitos-notes') || '';
        textbox.addEventListener('input', () => {
            localStorage.setItem('orbitos-notes', textbox.value);
        });
    }
}

function openBrowser() {
    const stuff = `
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
    const theWin = createWindow('app-browser', '🌐 Web Browser', stuff, 750, 550);
    
    if (theWin) {
        const urlBox = theWin.querySelector('#browser-url');
        const goBtn = theWin.querySelector('#browser-go');
        const frameThing = theWin.querySelector('#browser-frame');

        const doNav = () => {
            let u = urlBox.value.trim();
            if (!u.startsWith('http://') && !u.startsWith('https://')) {
                u = 'https://' + u;
                urlBox.value = u;
            }
            frameThing.src = u;
        };

        goBtn.addEventListener('click', doNav);
        urlBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') doNav();
        });
    }
}

function openISSTracker() {
    const stuff2 = `
        <div style="padding: 15px; font-family: monospace; text-align: center; display: flex; flex-direction: column; justify-content: center; height: 100%; background: rgba(0,0,0,0.5);">
            <h3 style="margin-top:0; color:#00d2ff;">🛰️ ISS Live Telemetry</h3>
            <div id="iss-data" style="margin-bottom: 20px; line-height: 1.6; font-size: 1.1em;">
                Establishing uplink...<br><span style="font-size: 24px;">⏳</span>
            </div>
            <button id="iss-refresh" style="background: rgba(0,210,255,0.2); border: 1px solid #00d2ff; color: white; padding: 8px 15px; cursor: pointer; border-radius: 4px; font-weight: bold;">Sync Coordinates</button>
        </div>
    `;
    const theWin = createWindow('app-isstracker', '🛰️ ISS Tracker', stuff2, 350, 280);
    
    if (theWin) {
        const dataBox = theWin.querySelector('#iss-data');
        const btn = theWin.querySelector('#iss-refresh');

        const getISS = async () => {
            try {
                dataBox.innerHTML = 'Establishing uplink...<br><span style="font-size: 24px;">⏳</span>';
                const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                const data = await res.json();
                dataBox.innerHTML = `
                    <div style="color: #00fa9a;">LAT: ${data.latitude.toFixed(4)}°</div>
                    <div style="color: #00fa9a;">LNG: ${data.longitude.toFixed(4)}°</div>
                    <div style="color: #ff4757; margin-top:10px;">ALT: ${data.altitude.toFixed(2)} km</div>
                    <div style="color: #ff4757;">VEL: ${data.velocity.toFixed(2)} km/h</div>
                `;
            } catch (err) {
                dataBox.innerHTML = `<span style="color: #ff4757;">Error connecting to satellite API.</span>`;
            }
        };

        btn.addEventListener('click', getISS);
        getISS(); 
    }
}


document.getElementById('icon-notepad').addEventListener('dblclick', openNotepad);
document.getElementById('icon-browser').addEventListener('dblclick', openBrowser);
document.getElementById('icon-isstracker').addEventListener('dblclick', openISSTracker);

const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', () => {
    if (startMenu.style.display === 'none' || startMenu.style.display === '') {
        startMenu.style.display = 'flex';
    } else {
        startMenu.style.display = 'none';
    }
});

document.addEventListener('click', (e) => {
    if (!startBtn.contains(e.target) && !startMenu.contains(e.target)) {
        startMenu.style.display = 'none';
    }
});

document.getElementById('start-notepad').addEventListener('click', () => { openNotepad(); startMenu.style.display = 'none'; });
document.getElementById('start-browser').addEventListener('click', () => { openBrowser(); startMenu.style.display = 'none'; });
document.getElementById('start-isstracker').addEventListener('click', () => { openISSTracker(); startMenu.style.display = 'none'; });

console.log("started os");
