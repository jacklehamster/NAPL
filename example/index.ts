import { createServer } from "http";
import express from "express";
import ws from "ws";
import path from "path";
import { SyncSocket } from "napl";

const app = express();
const PORT = 3000;

const server = createServer(app);

const wss = new ws.Server<typeof ws.WebSocket>({ server });

const syncSocket = new SyncSocket(wss);

app.use(express.static(path.join(__dirname, ".")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(PORT, () => {
  const address = server.address();
  if (typeof address === "string") {
    console.log(`WebSocket server listening on ${address}`);
  } else if (address && typeof address === "object") {
    const host = address.address === '::' ? 'localhost' : address.address;
    console.log(`WebSocket server listening on ws://${host}:${address.port}`);
  }
  console.log(`Listening on http://localhost:${PORT}`);
});
