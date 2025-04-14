// app.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "mysql", // use "mysql" as host name in Docker network
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.DB_NAME || "studienprojekt_db",
  port: process.env.MYSQL_PORT || 3306,
});

// Simple route to test the connection
app.get("/", (req, res) => {
  pool.query("SELECT 1 + 1 AS solution", (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ message: "Hello from Express!", solution: results[0].solution });
  });
});

app.get("/api/greeting", (req, res) => {
  res.json({ greeting: "Hello from the backend!" });
});

// Get all Events
app.get("/api/events", (req, res) => {
  const { user_id, type } = req.query;

  let sql = "SELECT * FROM calendar_events";
  const params = [];

  if (user_id || type) {
    sql += " WHERE";
    if (user_id) {
      sql += "user_id = ?";
      params.push(user_id);
    }
    if (user_id && type) {
      sql += " AND ";
    }
    if (type) {
      sql += "type = ?";
      params.push(type);
    }
  }

  pool.query(sql, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.json(results);
  });
});

//Add a new Event
app.post("/api/events", (req, res) => {
  const { date, title, description, user_id, lecture_id, type } = req.body;
  const sql =
    "INSERT INTO calendar_events (date, title, description, user_id, lecture_id, type) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [
    date,
    title,
    description,
    user_id,
    lecture_id,
    type || "reminder",
  ];

  pool.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });

  console.log("POST /api/events", req.body); // Log the request body
});

//Delete an Event
app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM calendar_events WHERE id = ?";

  pool.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send();
  });
});

// Get all lectures
app.get("/api/lectures", (req, res) => {
  const sql = "SELECT * FROM lectures";
  pool.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.json(results);
  });
});

// Add a new lecture
app.post("/api/lectures", (req, res) => {
  const { title, room } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const sql = "INSERT INTO lectures (title, room) VALUES (?, ?)";

  const values = [title, room];

  pool.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    res.status(201).json({ id: results.insertId, title, room });
  });
});

app.get("/api/lectures/:id", (req, res) => {
  const lectureId = req.params;
  const sql = "SELECT * FROM lectures WHERE id = ?";

  pool.query(sql, [lectureId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.json(results[0]);
  });
});

app.put("/api/lectures/:id", (req, res) => {
  const lectureId = req.params.id;
  const { title, date, time, room } = req.body;
  const sql =
    "UPDATE lectures SET title = ?, date = ?, time = ?, room = ? WHERE id = ?";

  const values = [title, date, time, room, lectureId];

  pool.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.json({ id: lectureId, ...req.body });
  });
});

app.delete("/api/lectures/:id", (req, res) => {
  const lectureId = req.params.id;
  const sql = "DELETE FROM lectures WHERE id = ?";

  pool.query(sql, [lectureId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(204).send();
  });
});

app.post("/api/timetable", (req, res) => {
  const { user_id = 1, lecture_id, weekday, slot_start, slot_end } = req.body;

  if (!lecture_id || !weekday || !slot_start || !slot_end) {
    return res.status(400).json({ error: "Fehlende Felder!" });
  }

  const sql = `
    INSERT INTO timetable_entries (user_id, lecture_id, weekday, slot_start, slot_end)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [user_id, lecture_id, weekday, slot_start, slot_end];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Fehler beim Eintragen in Stundenplan:", err);
      return res.status(500).json({ error: "Fehler beim Eintragen" });
    }

    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

app.get("/api/timetable/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const sql = `
    SELECT t.*, l.title, l.room
    FROM timetable_entries t
    JOIN lectures l ON t.lecture_id = l.id
    WHERE t.user_id = ?
  `;

  pool.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen des Stundenplans:", err);
      return res.status(500).json({ error: "Fehler beim Abrufen" });
    }
    res.json(results);
  });
});

app.delete("/api/timetable/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM timetable_entries WHERE id = ?";

  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Fehler beim Löschen des Eintrags:", err);
      return res.status(500).json({ error: "Fehler beim Löschen" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Eintrag nicht gefunden" });
    }
    res.status(204).send();
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
