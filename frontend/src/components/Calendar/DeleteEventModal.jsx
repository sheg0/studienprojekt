/**
 * Filename      : DeleteEventModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-27
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React from "react";
import styles from "../../styles/Modal.module.css";

const DeleteEventModal = ({ onConfirm, onCancel, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>Soll der Termin wirklich gelöscht werden?</h2>
        <div className={styles.modalButtons}>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={styles.deleteBtn}
          >
            Löschen
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
