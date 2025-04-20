import React, { useEffect, useState } from "react";
import styles from "../styles/NotesPageStyles.module.css";
import PdfUpload from "../components/PdfUpload";
import DeleteModal from "../components/Modal/DeleteModal";
import Toast from "../components/Toast";
import AddLectureModal from "../components/Modal/AddLectureModal";

const NotesPage = () => {
  const [lectures, setLectures] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeLectureId, setActiveLectureId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [newLectureTitle, setNewLectureTitle] = useState("");
  const [newLectureRoom, setNewLectureRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLecture = async ({ title, room }) => {
    try {
      const res = await fetch("http://localhost:3000/api/lectures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          room,
        }),
      });

      if (res.ok) {
        setNewLectureTitle("");
        setNewLectureRoom("");
        fetchLectures();
      } else {
        console.error("Fehler beim Hinzufügen der Lecture:", res.statusText);
      }
    } catch (err) {
      console.error("Fehler beim Hinzufügen der Lecture:", err);
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/lectures");
      const data = await res.json();
      setLectures(data);
      if (data.length > 0) setActiveLectureId(data[0].id); // default wählen
    } catch (err) {
      console.error("Fehler beim Laden der Lectures:", err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes_lectures");
      const data = await res.json();

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
    if (!noteToDelete) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes_lectures/${noteToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchNotes();
        setNoteToDelete(null);
      } else {
        console.error("Fehler beim Löschen der Notiz:", res.statusText);
      }
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchNotes();
  }, []);

  useEffect(() => {
    const handleToast = () => setShowToast(true);
    window.addEventListener("pdf-upload-success", handleToast);
    return () => window.removeEventListener("pdf-upload-success", handleToast);
  }, []);

  const selectedNotes = notes[activeLectureId] || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📚 Notizen & Lernmaterialien</h1>
      <div className={styles.addLectureContainer}>
        {/* Navbar mit Lectures */}

        <div className={styles.navbar}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.lectureButton}
          >
            +
          </button>
          {lectures.map((lec) => (
            <button
              key={lec.id}
              className={`${styles.navItem} ${
                activeLectureId === lec.id ? styles.active : ""
              }`}
              onClick={() => setActiveLectureId(lec.id)}
            >
              {lec.title}
            </button>
          ))}
        </div>
      </div>

      {activeLectureId && (
        <>
          <PdfUpload lectureId={activeLectureId} onUploaded={fetchNotes} />
          <input
            type="text"
            placeholder="🔎 PDF-Titel suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <div className={styles.notesList}>
            {selectedNotes
              .filter((note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((note) => (
                <div key={note.id} className={styles.noteCard}>
                  <div className={styles.noteContainer}>
                    <a
                      href={`http://localhost:3000/uploads/${note.pdf_url
                        .split("\\")
                        .pop()
                        .split("/")
                        .pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.noteLink}
                    >
                      <strong>{note.title}</strong>
                    </a>
                    <p>
                      Hochgeladen am:{" "}
                      {new Date(note.created_at).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setNoteToDelete(note.id)}
                    className={styles.deleteButton}
                  >
                    Löschen
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
      {noteToDelete && (
        <DeleteModal
          onConfirm={() => {
            handleDelete(noteToDelete);
            setNoteToDelete(null);
          }}
          onCancel={() => setNoteToDelete(null)}
        />
      )}
      {showToast && <Toast message="✅ PDF erfolgreich hochgeladen!" />}
      {isModalOpen && (
        <AddLectureModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddLecture}
        />
      )}
    </div>
  );
};

export default NotesPage;
