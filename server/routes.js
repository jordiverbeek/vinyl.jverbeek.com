const express = require("express");
const router = express.Router();
const items = require("./db");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const path = require("path");

// STORAGE ENGINE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });


// CREATE (with image)
router.post("/items", upload.single("img"), (req, res) => {
  const fileUrl = req.file
    ? `http://localhost:4000/uploads/${req.file.filename}`
    : null;

  const item = {
    id: uuid(),
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    img: fileUrl,
  };

  items.push(item);
  res.json(item);
});


// READ ALL
router.get("/items", (req, res) => {
  res.json(items);
});


// UPDATE (optional image update)
router.put("/items/:id", upload.single("img"), (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  const fileUrl = req.file
    ? `http://localhost:4000/uploads/${req.file.filename}`
    : items[index].img; // keep old image if no new one uploaded

  items[index] = {
    ...items[index],
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    img: fileUrl
  };

  res.json(items[index]);
});


// DELETE
router.delete("/items/:id", (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  const removed = items.splice(index, 1);
  res.json(removed[0]);
});

module.exports = router;
