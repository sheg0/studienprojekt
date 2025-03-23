/**
 * Filename      : ExamsPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { use, useState, useEffect } from "react";
import styles from "../styles/ExamsPageStyles.module.css";
import FrontendCalendar from "../components/Calendar";

const ExamsPage = () => {
  const [exams, setExams] = useState([
    { id: 1, subject: "Mathematik 1", date: "2025-06-10", time: "10:00" },
    {
      id: 2,
      subject: "Java Programmierung",
      date: "2025-06-15",
      time: "14:00",
    },
    { id: 3, subject: "Datenbanksysteme", date: "2025-06-20", time: "09:00" },
  ]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Fehler beim Laden der Notizen:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Prüfungsorganisation</h1>
      <div className="grid gap-4">
        <p>Prüfungskalender mit Deadlines & Erinnerungen</p>
        <FrontendCalendar />
      </div>
      {notes.length === 0 ? (
        <p>Keine Notizen vorhanden.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Lecture ID:</strong> {note.lecture_id}
            </p>
            <p>
              <strong>Hochgeladen am:</strong>{" "}
              {new Date(note.created_at).toLocaleString()}
            </p>
            <a href={note.pdf_url} target="_blank" rel="noopener noreferrer">
              PDF öffnen
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default ExamsPage;
