import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

const port = Number(process.env.PORT || 4173);
const rootDir = path.resolve("dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const sendFile = (res, filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const cleanPath = decodeURIComponent(requestUrl.pathname);
  const requestedFile = path.join(rootDir, cleanPath);

  if (existsSync(requestedFile) && statSync(requestedFile).isFile()) {
    sendFile(res, requestedFile);
    return;
  }

  const fallbackFile = path.join(rootDir, "index.html");
  if (existsSync(fallbackFile)) {
    sendFile(res, fallbackFile);
    return;
  }

  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Build output not found. Run npm run build before starting the server.");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Frontend server listening on port ${port}`);
});