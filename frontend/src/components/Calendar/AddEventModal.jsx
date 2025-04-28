/**
 * Filename      : AddEventModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-27
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState } from "react";
import styles from "../../styles/Modal.module.css";

const typeOptions = [
  { value: "exam", label: "Prüfung" },
  { value: "lecture", label: "Vorlesung" },
  { value: "reminder", label: "Erinnerung" },
  { value: "study", label: "Studium" },
];

const AddEventModal = ({ isOpen, onClose, onAddEvent, selectedDate }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("reminder");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddEvent({ title: title.trim(), type, time });
      setTitle("");
      setType("reminder");
      setTime("");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>
          Neues Ereignis am {new Date(selectedDate).toLocaleDateString("de-DE")}
        </h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
            className={styles.selectInput}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.typeInput}
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.periodInput}
          />
        </form>
        <button
          type="submit"
          className={styles.buttonInput}
          onClick={handleSubmit}
        >
          Hinzufügen
        </button>
      </div>
    </div>
  );
};

export default AddEventModal;
