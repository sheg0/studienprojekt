const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "-Esra-Balci.5561",
  database: process.env.DB_NAME || "studienprojekt_db",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL-Verbindung fehlgeschlagen:", err);
  } else {
    console.log("✅ MySQL verbunden");
  }
});

module.exports = connection;
