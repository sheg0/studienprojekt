// components/Modal/LectureDeleteModal.jsx
import React from "react";
import styles from "../../styles/Modal.module.css";

const LectureDeleteModal = ({ lecture, onDelete, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onCancel}>
          ✖
        </button>
        <h3>Vorlesung löschen</h3>
        <p>
          Möchtest du die Vorlesung <strong>{lecture.title}</strong> wirklich
          aus dem Stundenplan löschen?
        </p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => onDelete(lecture.id)}
            className={styles.deleteBtn}
          >
            Ja, löschen
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureDeleteModal;
