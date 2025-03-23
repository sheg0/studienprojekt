const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("🎉 Server läuft und MySQL ist verbunden!");
});

const notesRoutes = require("./routes/notes");
// app.use("/api/notes", notesRoutes);
app.use("/api/notes", require("./routes/notes"));

app.listen(3001, () => {
  console.log("🚀 Server läuft auf http://localhost:3001");
});
