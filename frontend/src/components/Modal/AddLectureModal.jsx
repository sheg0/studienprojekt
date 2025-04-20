// components/Modal/AddLectureModal.jsx
import React, { useState } from "react";
import styles from "./AddLectureModal.module.css";

const AddLectureModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onAdd({ title, room });
    setTitle("");
    setRoom("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Neue Vorlesung hinzufügen</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Raum (optional)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button type="submit">✅ Speichern</button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              ❌ Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLectureModal;
