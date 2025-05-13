/**
 * Filename      : ReadOnlyTimetable.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-29
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useEffect, useState } from "react";
import styles from "./ReadOnlyTimetable.module.css";
import { useNavigate } from "react-router-dom";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr"];
const slots = [
  { label: "08:00 - 09:30", number: 1 },
  { label: "09:45 - 11:15", number: 2 },
  { label: "11:30 - 13:00", number: 3 },
  { label: "13:00 - 14:00", number: 4 },
  { label: "14:00 - 15:30", number: 5 },
  { label: "15:45 - 17:15", number: 6 },
  { label: "17:30 - 19:00", number: 7 },
];

const renderedCells = new Set();

const ReadOnlyTimetable = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/timetable/1")
      .then((res) => res.json())
      .then(setEntries)
      .catch(console.error);
  }, []);

  const getEntry = (day, slot) => {
    return entries.find(
      (entry) =>
        entry.weekday === day &&
        slot >= entry.slot_start &&
        slot <= entry.slot_end
    );
  };

  return (
    <div
      className={styles.readOnlyTimetable}
      onClick={() => navigate("/lectures")}
    >
      <h3 className={styles.title}>📅 Mein Stundenplan</h3>
      <div className={styles.grid}>
        <div className={`${styles.cell} ${styles.header}`}>🕒</div>
        {weekdays.map((day) => (
          <th key={day} className={`${styles.cell} ${styles.header}`}>
            {day}
          </th>
        ))}

        {slots.map((slot) => (
          <React.Fragment key={slot.number}>
            <div className={`${styles.cell} ${styles.header}`}>
              {slot.label}
            </div>
            {weekdays.map((day) => {
              const entry = getEntry(day, slot.number);
              return (
                <div key={day + slot.number} className={styles.cell}>
                  {entry ? (
                    <>
                      <strong>{entry.title}</strong>
                      <br />
                      <small>{entry.room}</small>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ReadOnlyTimetable;
