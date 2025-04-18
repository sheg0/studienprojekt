/**
 * Filename      : TimetableAddModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState, useEffect } from "react";
import styles from "../styles/Modal.module.css";

const TimetableAddModal = ({ onClose, onAdded }) => {
  const [lectures, setLectures] = useState([]);
  const [lectureId, setLectureId] = useState("");
  const [weekday, setWeekday] = useState("Mo");
  const [slotStart, setSlotStart] = useState(1);
  const [slotEnd, setSlotEnd] = useState(2);

  useEffect(() => {
    fetch("http://localhost:3000/api/lectures")
      .then((res) => res.json())
      .then(setLectures)
      .catch(console.error);
  }, []);

  const handleAdd = async () => {
    const entry = {
      user_id: 1,
      lecture_id: lectureId,
      weekday,
      slot_start: slotStart,
      slot_end: slotEnd,
    };

    try {
      await fetch("http://localhost:3000/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      onAdded();
      onClose();
    } catch (err) {
      console.error("Fehler beim Eintragen:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">🗓️ In Stundenplan eintragen</h2>
        <select
          value={lectureId}
          onChange={(e) => setLectureId(e.target.value)}
          //   className="w-full p-2 border rounded mb-3"
          className={styles.selectInput}
        >
          <option value="">-- Vorlesung wählen --</option>
          {lectures.map((lec) => (
            <option key={lec.id} value={lec.id}>
              {lec.title}
            </option>
          ))}
        </select>

        <div className="mb-2">
          <label className="block mb-1">Wochentag:</label>
          <select
            value={weekday}
            onChange={(e) => setWeekday(e.target.value)}
            className={styles.selectInput}
          >
            {["Mo", "Di", "Mi", "Do", "Fr"].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.periodContent}>
          <p>Start</p>
          <input
            type="number"
            min="1"
            max="10"
            value={slotStart}
            onChange={(e) => setSlotStart(Number(e.target.value))}
            className={styles.periodInput}
            placeholder="Von Stunde"
          />
          <p>Ende</p>
          <input
            type="number"
            min={slotStart}
            max="10"
            value={slotEnd}
            onChange={(e) => setSlotEnd(Number(e.target.value))}
            className={styles.periodInput}
            placeholder="Bis Stunde"
          />
        </div>

        <button onClick={handleAdd} className={styles.buttonInput}>
          Eintragen
        </button>
      </div>
    </div>
  );
};

export default TimetableAddModal;
