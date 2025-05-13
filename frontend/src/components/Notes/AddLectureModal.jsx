/**
 * Filename      : AddLectureModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-28
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState } from "react";
import styles from "../../styles/Modal.module.css";

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>Neue Vorlesung hinzufügen</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.selectInput}
          />
          <input
            type="text"
            placeholder="Raum"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={styles.selectInput}
          />
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.buttonInput}>
              Speichern
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLectureModal;
