import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

// Self-hosted video streaming
app.get('/self-hosted', (req, res) => {
  const videoPath = path.join(process.cwd(), './videos/video.mp4');
  if (!fs.existsSync(videoPath)) return res.status(404).send('Video not found');

  const videoSize = fs.statSync(videoPath).size;
  const range = req.headers.range;
  if (!range) return res.status(400).send('Requires Range header');

  const [startStr, endStr] = range.replace('bytes=', '').split('-');
  const start = parseInt(startStr, 10);
  const end = endStr ? parseInt(endStr, 10) : videoSize - 1;
  const contentLength = end - start + 1;

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
    'Cache-Control': 'no-store',
    'X-No-Download': 'true',
  });

  fs.createReadStream(videoPath, { start, end }).pipe(res);
});

// External video streaming
app.get('/stream-external', (req, res) => {
  const VIDEO_URL = 'https://res.cloudinary.com/ddsmokd7b/video/upload/v1745404649/video_op6ojq.mp4';
  const range = req.headers.range;
  if (!range) return res.status(400).send('Requires Range header');

  const url = new URL(VIDEO_URL);

  https.get({
    hostname: url.hostname,
    path: url.pathname + url.search,
    headers: { Range: range },
  }, (videoRes) => {
    res.writeHead(videoRes.statusCode, {
      'Content-Range': videoRes.headers['content-range'] || '',
      'Accept-Ranges': 'bytes',
      'Content-Length': videoRes.headers['content-length'] || 0,
      'Content-Type': 'video/mp4',
      'Cache-Control': 'no-store',
      'X-No-Download': 'true',
    });
    videoRes.pipe(res);
  }).on('error', (err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

// Health check
app.get('/', (req, res) => res.send('Server running ✅'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
