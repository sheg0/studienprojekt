const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const uploadFolder = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Datei-Speicher konfigurieren
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_")),
});

const upload = multer({ storage });

// DB-Verbindung (hole sie dir aus app.js oder pool)
const pool = require("../db"); // falls du so eine Datei hast

// POST /api/notes-lectures
router.post("/", upload.single("pdf"), (req, res) => {
  const { lecture_id, title } = req.body;
  const pdf_url = `/uploads/${req.file.filename}`;

  const sql = `
    INSERT INTO notes_lectures (lecture_id, title, pdf_url)
    VALUES (?, ?, ?)
  `;

  pool.query(sql, [lecture_id || null, title, pdf_url], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, title, pdf_url });
  });
});

module.exports = router;
