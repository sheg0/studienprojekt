import React, { useState } from "react";
import styles from "../styles/Modal.module.css";

const LectureModal = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, room }),
      });
      const newLecture = await res.json();
      onCreated(newLecture);
      onClose();
    } catch (err) {
      console.error("Fehler beim Erstellen:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">➕ Neue Vorlesung</h2>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.selectInput}
        />
        <input
          type="text"
          placeholder="Raum"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className={styles.selectInput}
        />
        <button onClick={handleSubmit} className={styles.buttonInput}>
          Speichern
        </button>
      </div>
    </div>
  );
};

export default LectureModal;
