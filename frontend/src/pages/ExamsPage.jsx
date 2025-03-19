/**
 * Filename      : ExamsPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { useState } from "react";
import styles from "../styles/ExamsPageStyles.module.css";
import FrontendCalendar from "../components/Calendar";

const ExamsPage = () => {
  const [exams, setExams] = useState([
    { id: 1, subject: "Mathematik 1", date: "2025-06-10", time: "10:00" },
    {
      id: 2,
      subject: "Java Programmierung",
      date: "2025-06-15",
      time: "14:00",
    },
    { id: 3, subject: "Datenbanksysteme", date: "2025-06-20", time: "09:00" },
  ]);

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Prüfungsorganisation</h1>
      <div className="grid gap-4">
        <p>Prüfungskalender mit Deadlines & Erinnerungen</p>
        <FrontendCalendar />
      </div>
    </div>
  );
};

export default ExamsPage;
