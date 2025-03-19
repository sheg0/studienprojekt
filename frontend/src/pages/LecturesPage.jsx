/**
 * Filename      : LecturesPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { useState, useEffect } from "react";
import styles from "../styles/LecturesPageStyles.module.css";

const mockLectures = [
  { id: 1, title: "Mathematik 1", date: "2025-03-20", time: "10:00 - 11:30" },
  {
    id: 2,
    title: "Programmieren mit Java",
    date: "2025-03-21",
    time: "08:15 - 09:45",
  },
  {
    id: 3,
    title: "Datenbanksysteme",
    date: "2025-03-22",
    time: "14:00 - 15:30",
  },
];

const LecturesPage = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    // In der echten App später durch fetch() vom Backend ersetzen
    setLectures(mockLectures);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Stundenplan</h1>
      <div className="grid gap-4">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="rounded-2xl shadow-md p-4 bg-white">
            <p>Stundenplan</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesPage;
