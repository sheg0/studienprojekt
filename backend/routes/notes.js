const express = require("express");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const db = require("../db");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Supabase Client
const supabase = createClient(
  "https://gvjxoozcbhsrlfqalnxo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2anhvb3pjYmhzcmxmcWFsbnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NDM0MjIsImV4cCI6MjA1ODIxOTQyMn0.k_0XqE0vX5jCEW0PHjzDYK-rIb9Zz5zwEY3o4zgY14A"
);

// 📤 Upload-Route
router.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Keine Datei empfangen" });

  const { lecture_id } = req.body;
  const filename = `${Date.now()}_${req.file.originalname}`;

  // Datei hochladen in Supabase
  const { data, error } = await supabase.storage
    .from("pdfs") // dein Bucket-Name
    .upload(filename, req.file.buffer, {
      contentType: req.file.mimetype,
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("❌ Upload-Fehler:", error);
    return res
      .status(500)
      .json({ error: "Fehler beim Hochladen", details: error.message });
  }

  // ✅ URL zur Datei generieren
  const fileUrl = `https://supabase.com/dashboard/project/gvjxoozcbhsrlfqalnxo/storage/buckets/notes/${filename}`;

  // In DB speichern
  db.query(
    "INSERT INTO notes (lecture_id, pdf_url, created_at) VALUES (?, ?, NOW())",
    [lecture_id, fileUrl],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "PDF hochgeladen", pdf_url: fileUrl });
    }
  );
});

// routes/notes.js
router.get("/", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
