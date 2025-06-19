// components/Modal.jsx
import React from "react";
import styles from "../../styles/Modal.module.css";

const DeleteModal = ({ onConfirm, onCancel, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h3>Notiz wirklich löschen?</h3>
        <p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.buttonInput}>
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

export default DeleteModal;
