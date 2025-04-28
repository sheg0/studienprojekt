/**
 * Filename      : EventDeleteModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-25
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React from "react";
import styles from "./EventDeleteModal.module.css";

const EventDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h3>Termin wirklich löschen?</h3>
        <p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            Ja, löschen
          </button>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDeleteModal;
