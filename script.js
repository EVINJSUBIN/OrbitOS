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

console.log("OrbitOS Boot Sequence Complete.");
