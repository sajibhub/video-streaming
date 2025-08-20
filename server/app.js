import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

const VIDEO_URL = 'https://res.cloudinary.com/ddsmokd7b/video/upload/v1755686868/SSYouTube.online_BEST_RECITATION_EVER_Al-Mu_minun_-_Yasir_ad-Dawsari_1080p_hu27jy.mp4';

// Self-hosted video streaming
app.get('/stream-self-hosted', (req, res) => {
  const videoPath = path.join(process.cwd(), './videos/video.mp4');
  if (!fs.existsSync(videoPath)) return res.status(404).send('Video not found');

  const videoSize = fs.statSync(videoPath).size;
  const range = req.headers.range;
  if (!range) return res.status(400).send('Requires Range header');

  const CHUNK_SIZE = 1024 * 1024;
  const [startStr] = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startStr, 10);
  const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);
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
  const range = req.headers.range;
  if (!range) return res.status(400).send('Requires Range header');

  const CHUNK_SIZE = 1024 * 1024;

  const [startStr] = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startStr, 10);
  const end = start + CHUNK_SIZE - 1;
  const byteRange = `bytes=${start}-${end}`;

  const url = new URL(VIDEO_URL);

  https.get({
    hostname: url.hostname,
    path: url.pathname + url.search,
    headers: { Range: byteRange },
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


app.get('/', (req, res) => res.send('Server running ✅'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
