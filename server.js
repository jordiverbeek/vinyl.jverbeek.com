import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

// HTTP server nodig voor Socket.IO
const server = http.createServer(app);

// Socket.IO + CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5175", // Vite dev server
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Data file
const DATA_FILE = path.resolve("./data.json");

// Middleware
app.use(cors({ origin: "http://localhost:5175", credentials: true }));
app.use(express.json());

// Helpers
const readPosts = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  return data.forumPosts || [];
};

const writePosts = (posts) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ forumPosts: posts }, null, 2));
};

// REST API
app.get("/api/posts", (req, res) => {
  res.json(readPosts());
});

app.post("/api/posts", (req, res) => {
  const posts = readPosts();
  const newPost = {
    id: String(Date.now()),
    author: req.body.author || "Guest",
    message: req.body.message,
  };
  posts.push(newPost);
  writePosts(posts);

  // realtime
  io.emit("newPost", newPost);

  res.json(newPost);
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.emit("initPosts", readPosts());

  socket.on("newPost", (message) => {
    const posts = readPosts();
    const newPost = {
      id: String(Date.now()),
      author: message.author || "Guest",
      message: message.message,
    };
    posts.push(newPost);
    writePosts(posts);
    io.emit("newPost", newPost);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
});
