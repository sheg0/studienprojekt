// backend/index.js
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/lectures", (req, res) => {
  res.json([{ id: 1, title: "Mathe" }]);
});

app.listen(5000, () => console.log("Backend läuft auf Port 5000"));
