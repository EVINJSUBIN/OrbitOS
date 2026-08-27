# OrbitOS: WebOS-1 Stardance Mission Plan

**Goal:** Build a browser-based operating system to pass the WebOS 1 mission and unlock WebOS 2.
**Inspiration:** MewoOS (Project #13539) which features draggable windows, highly customized UI, a virtual file system, and custom mini-apps.

## WebOS-1 Mission Requirements Checklist
- [ ] **Draggable Windows:** Must have multiple windows that can be moved around the browser screen.
- [ ] **Unique Customization:** Must NOT look exactly like the base Hack Club jam guide. We will use a unique theme (e.g., Space/Neon theme, or a pixel-art theme).
- [ ] **3 Devlogs:** We will document our progress (UI setup, Window Dragging logic, Custom App integration).
- [ ] **1 Unique Feature:** Something not in the guide. 
- [ ] **No Passwords:** The final deployed link must be publicly accessible immediately.

## OrbitOS Core Architecture

### 1. The Desktop & Taskbar
- A fixed bottom (or side) taskbar with a clock and a "Start" menu.
- A desktop area where shortcuts can be double-clicked to spawn new windows.

### 2. The Window Manager (The Hard Part)
- Each open app spawns a `<div>` with `position: absolute`.
- Implement a `mousedown`, `mousemove`, `mouseup` event listener system on the window's title bar to update `left` and `top` CSS properties.
- Manage `z-index` so the active window is always on top.

### 3. The Mini-Apps
- **Browser:** An iframe that lets you browse (within same-origin policy limits).
- **Notepad:** A simple `<textarea>` that saves to `localStorage`.
- **Music Player:** Re-use ideas from our `Wibei` or `MusicKit` project!
- **[Unique Feature] Discord/Stardance Feed:** A live feed fetching Stardance API data or a simple chat app simulating an OS-level messenger.

### 4. MewoOS Inspirations to Implement Later (WebOS-2)
- Virtual file system.
- 4 Desktop Workspaces (using keyboard shortcuts).
- Window switcher (Alt+Tab / Ctrl+Shift+A overlay).

## Devlog Schedule
- **Devlog 1: The Boot Sequence.** Setting up the DOM, the CSS background, and the taskbar.
- **Devlog 2: Defying Gravity (Window Dragging).** Writing the JavaScript physics to make windows draggable and handle z-indexing.
- **Devlog 3: The Unique App.** Building our custom feature (e.g., the Stardance feed app) and shipping.
