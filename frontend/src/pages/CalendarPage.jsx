/**
 * Filename      : CalendarPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { use, useState, useEffect } from "react";
import styles from "../styles/CalendarPageStyles.module.css";
import FrontendCalendar from "../components/Calendar";

const CalendarPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Fehler beim Laden der Notizen:", err));
  }, []);

  return (
    <div className={styles.container}>
      <FrontendCalendar />
    </div>
  );
};

export default CalendarPage;
