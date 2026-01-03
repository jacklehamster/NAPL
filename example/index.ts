import { createServer } from "https";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
dotenv.config();

const app = express();
const PORT = 3000;

const server = createServer(app);

const wss = new WebSocketServer({ server });

app.get("/config.json", (_req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "config.json"));
    return;
  }
  res.json({
    split: false,
    "show-tab": true,
  });
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
    const host = address.address === "::" ? "localhost" : address.address;
    console.log(`Listening on http://${host}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV ?? "dev"}`);
  }
});

server.listen(PORT);
