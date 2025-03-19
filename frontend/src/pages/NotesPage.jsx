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
        {notes.map((note) => (
          <div key={note.id} className="bg-yellow-100 rounded-xl shadow-md p-4">
            <p>Verlinkung von Notizen zu Vorlesungen & Prüfungen</p>
            <p>Uploads für PDFs, Bilder für Mitschriften</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
