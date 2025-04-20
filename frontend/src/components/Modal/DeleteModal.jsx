// components/Modal.jsx
import React from "react";
import styles from "../../styles/Modal.module.css";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>❌ Notiz wirklich löschen?</h3>
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
