import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;

// absolute path is VEEL veiliger
const DATA_FILE = path.resolve("./data.json");

app.use(cors());
app.use(express.json());

// Haal posts op
app.get("/api/posts", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(data.forumPosts);
});

// Voeg nieuwe post toe
app.post("/api/posts", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  const newPost = {
    id: String(Date.now()),
    author: req.body.author || "Guest",
    message: req.body.message,
  };

  data.forumPosts.push(newPost);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json(newPost);
});

app.listen(PORT, () => {
  console.log(`API draait op http://localhost:${PORT}`);
});
