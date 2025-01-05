import { createServer } from "https";
import express from "express";
import ws from "ws";
import path from "path";
import { attachSyncSocket } from "napl";

const app = express();
const PORT = 3000;

const server = createServer(app);

const wss = new ws.Server<typeof ws.WebSocket>({ server });

attachSyncSocket(wss);

app.get("/config.json", (_req, res) => {
  res.json({});
});

app.use(express.static(path.join(__dirname, ".")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.addListener("listening", () => {
  const address = server.address();
  if (typeof address === "string") {
    console.log(`Listening on http://${address}:${PORT}`);
  } else if (address && typeof address === "object") {
    const host = address.address === '::' ? 'localhost' : address.address;
    console.log(`Listening on http://${host}:${PORT}`);
  }
});

server.listen(PORT);
