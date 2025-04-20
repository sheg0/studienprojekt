/**
 * Filename      : Toast.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-20
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useEffect, useState } from "react";
import styles from "../styles/Toast.module.css";

const Toast = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return null;

  return <div className={styles.toast}>{message}</div>;
};

export default Toast;
