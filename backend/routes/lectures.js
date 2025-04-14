// lectures route - POST /api/lectures
app.post("/api/lectures", (req, res) => {
  const { title, room } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const sql = "INSERT INTO lectures (title, room) VALUES (?, ?)";
  const values = [title, room];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Fehler beim Einfügen:", err);
      return res.status(500).json({ error: "Fehler beim Einfügen" });
    }

    res.status(201).json({
      id: result.insertId,
      title,
      room,
    });
  });
});
