# Queue System Display

A fullscreen queue display built with **HTML, CSS, and JavaScript**.

It shows:
- Landing page: **REGISTRATION CARE DESK**
- Number pages: **NOW SERVING** + number from **1 to 90**
- Per-number audio playback from the `media` folder

---

## Features

- Landing screen first, then number flow starts on next action
- Increment and decrement controls with keyboard/clicker support
- Range limited to **1..90**
- Auto/fullscreen support (`F` key toggle)
- Number transition animation + pulse
- Top info bar on number pages only (hidden on landing page)

---

## Project Structure

```text
QueueSystem/
├─ index.html
├─ styles.css
├─ script.js
├─ logo.png
├─ background.png
└─ media/
   ├─ Now-Serving-Number-1.wav
   ├─ Now-Serving-Number-2.wav
   ├─ ...
   ├─ Now-Serving-Number-90.wav
   └─ ding.mp3
```

---

## Audio Naming Requirements

Number audio files must follow this exact pattern:

- `media/Now-Serving-Number-1.wav`
- `media/Now-Serving-Number-2.wav`
- ...
- `media/Now-Serving-Number-90.wav`

Optional cue sound before each number:
- `media/ding.mp3`

---

## Controls

### Next
- Mouse click on screen
- `Space`, `Enter`
- `ArrowRight`, `ArrowDown`
- `PageDown`
- `N`

### Previous
- `ArrowLeft`, `ArrowUp`
- `PageUp`
- `Backspace`
- `P`

### Fullscreen
- `F` (toggle fullscreen on/off)

---

## Run Locally

Since this is a static project, you can run it directly:

1. Open `index.html` in a browser
2. Prefer fullscreen mode for display/projector use
3. Ensure audio is enabled on the device

---

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Save and wait for deployment
5. Open the generated Pages URL

---

## Notes

- Keep the `media` folder in project root (same level as `index.html`)
- File names are case-sensitive on hosting
- After updates, push to `main` and wait 1–3 minutes for Pages to refresh
- On iOS browsers, audio behavior can vary by browser policy
