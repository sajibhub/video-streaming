# Premium Video Streaming

A full-stack video streaming app built with **Express.js** and **React**, featuring self-hosted and external video streaming.

---

## Features

- **Self-Hosted Video Streaming**: Stream videos from your server using partial content support (`Range` header) for smooth seeking.
- **External Video Streaming**: Stream videos from external URLs (e.g., Cloudinary) via HTTPS proxy.
- **React Frontend**:
  - Toggle between self-hosted and external videos
  - Display video title, subtitle, and source indicator
  - Auto-play, muted playback, and disabled context menu
  - Overlay gradient for a premium look
- **Responsive UI**: Works on desktop and mobile browsers.

---

## Backend (Express.js)

### Installation

```bash
cd server
npm install
```
## Run
```
node app.js
```
## API Endpoints
```
| Route                 | Method | Description                                        |
| --------------------- | ------ | -------------------------------------------------- |
| `/stream-self-hosted` | GET    | Streams a video from `./videos/video.mp4` locally  |
| `/stream-external`    | GET    | Streams video from an external URL via HTTPS proxy |
| `/`                   | GET    | Server health check                                |
```

## Notes:

The backend supports CORS for cross-origin requests.

Self-hosted streaming supports partial content (206) for smooth playback and seeking.

External streaming works only with direct video file URLs, not YouTube watch pages.
## Frontend (React)
Installation
```
cd client
npm install
```
## Environment Variables

Create .env in the client folder:
```
VITE_API_URL=http://localhost:3001
```
## Run
```
npm run dev
```

Features

Video Player: Switch between self-hosted and external sources dynamically

Video Info: Displays title, subtitle, and source indicator

Controls: Auto-play, muted, inline playback, and disabled context menu

Switch Button: Toggles video source with animated SVG icon

Overlay Gradient: Adds premium feel to the player

## Project Structure
```
server/
  ├─ index.js          # Express backend
  ├─ videos/           # Local videos
client/
  ├─ src/
      ├─ App.jsx       # React frontend
      ├─ App.css       # Styles
```
## Demo
```
| Self-Hosted            | External Host              |
| ---------------------- | -------------------------- |
| High-quality streaming | Cloud-based video delivery |
```