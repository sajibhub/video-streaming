import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors()); 

app.get('/video', (req, res) => {
  const videoPath = path.join(process.cwd(), './videos/video.mp4');
  const videoSize = fs.statSync(videoPath).size;

  const range = req.headers.range;
  if (!range) {
    return res.status(400).send('Requires Range header');
  }

  const CHUNK_SIZE = 1 * 1024 * 1024; 
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
    'Cache-Control': 'no-store',
    'X-No-Download': 'true'
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
