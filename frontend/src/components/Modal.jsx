/**
 * Filename      : Modal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
