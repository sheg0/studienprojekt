/**
 * Filename      : NotesPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { useState } from "react";
import styles from "../styles/NotesPageStyles.module.css";

const NotesPage = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Mathematik Zusammenfassung",
      content: "Grenzwerte, Ableitungen, Integrale...",
    },
    {
      id: 2,
      title: "Java Notizen",
      content: "OOP, Klassen, Vererbung, Interfaces...",
    },
  ]);

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Notizen & Lernmaterialien</h1>
      <div className="grid gap-4">
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
    </div>
  );
};

export default NotesPage;
