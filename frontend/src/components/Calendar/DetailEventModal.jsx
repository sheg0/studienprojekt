/**
 * Filename      : DetailEventModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-27
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React from "react";
import styles from "../../styles/Modal.module.css";

const typeEmojis = {
  exam: "📚",
  lecture: "🧑‍🏫",
  reminder: "🔔",
  study: "📝",
};

const DetailEventModal = ({ event, onDelete, onClose }) => {
  return (
    <div className={styles.overlay}>
      {event && (
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
          <h2>{event.text}</h2>
          <p className={styles.eventModalText}>
            Typ: {typeEmojis[event.type]} {event.type}
          </p>
          {event.time && (
            <p className={styles.eventModalText}>Uhrzeit: {event.time}</p>
          )}
          <div className={styles.modalButtonContainer}>
            <button
              onClick={() => {
                onDelete(event.id);
                onClose();
              }}
              className={styles.deleteBtn}
            >
              Löschen
            </button>
            <button onClick={onClose} className={styles.cancelButton}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailEventModal;
