import React, { useEffect, useState } from "react";
import styles from "../styles/NotesPageStyles.module.css";
import PdfUpload from "../components/PdfUpload";

const NotesPage = () => {
  const [lectures, setLectures] = useState([]);
  const [notes, setNotes] = useState([]);

  const fetchLectures = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/lectures");
      const data = await res.json();
      setLectures(data);
    } catch (err) {
      console.error("Fehler beim Laden der Lectures:", err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes_lectures");
      const data = await res.json();

      // Gruppiere Notizen nach lecture_id
      const grouped = {};
      data.forEach((note) => {
        if (!grouped[note.lecture_id]) grouped[note.lecture_id] = [];
        grouped[note.lecture_id].push(note);
      });

      setNotes(grouped);
    } catch (err) {
      console.error("Fehler beim Laden der Notizen:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Möchtest du diese Notiz wirklich löschen?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/notes_lectures/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchNotes(); // refetch after delete
      } else {
        console.error("Fehler beim Löschen der Notiz:", response.statusText);
      }
    } catch (err) {
      console.error("Fehler beim Löschen der Notiz:", err);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchNotes();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-6">📚 Notizen & Lernmaterialien</h1>
      <div className="space-y-6">
        {lectures.map((lecture) => (
          <div key={lecture.id} className={styles.lectureBox}>
            <h2 className="text-xl font-semibold">{lecture.title}</h2>
            <PdfUpload
              lectureId={lecture.id}
              onUploaded={fetchNotes} // refresht nach Upload
            />

            {notes[lecture.id] && notes[lecture.id].length > 0 ? (
              <div className="mt-2 space-y-2">
                {notes[lecture.id].map((note) => (
                  <div key={note.id} className={styles.noteCard}>
                    <strong>{note.title}</strong>
                    <p className="text-sm text-gray-600">
                      Hochgeladen am:{" "}
                      {new Date(note.created_at).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <a
                      href={`http://localhost:3000/uploads/${note.pdf_url
                        .split("\\")
                        .pop()
                        .split("/")
                        .pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      PDF öffnen
                    </a>
                    <button
                      onClick={() => handleDelete(note.id)}
                      style={{ marginLeft: "1rem", color: "red" }}
                    >
                      ❌ Löschen
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                Noch keine Notizen vorhanden.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
