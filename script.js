function updateClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    clockElement.textContent = timeString;
}

// Update clock every second
setInterval(updateClock, 1000);
// Initial call to set clock immediately on load
updateClock();

// Window Manager Logic
let highestZIndex = 1;

function makeDraggable(windowElement) {
    const header = windowElement.querySelector('.window-header');
    
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Bring to front when clicked anywhere on the window
    windowElement.addEventListener('mousedown', () => {
        highestZIndex++;
        windowElement.style.zIndex = highestZIndex;
    });

    // Start dragging on header mousedown
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = windowElement.offsetLeft;
        initialTop = windowElement.offsetTop;
        
        // Prevent default to avoid text selection issues
        e.preventDefault();
    });

    // Handle dragging
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        windowElement.style.left = `${initialLeft + dx}px`;
        windowElement.style.top = `${initialTop + dy}px`;
    });

    // Stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Close button logic
    const closeBtn = windowElement.querySelector('.window-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            windowElement.remove();
        });
    }
}

// Initialize dragging for all existing windows on boot
document.querySelectorAll('.window').forEach(makeDraggable);

console.log("OrbitOS Boot Sequence Complete.");
