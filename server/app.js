import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/stream-external', (req, res) => {
  const VIDEO_URL = 'https://res.cloudinary.com/ddsmokd7b/video/upload/v1745404649/video_op6ojq.mp4';
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send('Requires Range header');
  }

  const url = new URL(VIDEO_URL);

  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'GET',
    headers: {
      Range: range,
    },
  };

  https.get(options, (videoRes) => {
    res.writeHead(videoRes.statusCode, {
      'Content-Range': videoRes.headers['content-range'],
      'Accept-Ranges': 'bytes',
      'Content-Length': videoRes.headers['content-length'],
      'Content-Type': 'video/mp4',
      'Cache-Control': 'no-store',
      'X-No-Download': 'true'
    });

    videoRes.pipe(res);
  }).on('error', (err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

app.get("/self-hosted", (req, res) => {
  const videoPath = path.join(process.cwd(), './videos/video.mp4');
  const videoSize = fs.statSync(videoPath).size;

  const { range } = req.headers;
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
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
