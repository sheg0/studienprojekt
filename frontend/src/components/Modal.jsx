// Modal.jsx
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
