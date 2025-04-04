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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
