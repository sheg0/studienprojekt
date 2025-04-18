/**
 * Filename      : Lectures.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState, useEffect } from "react";
import { fetchLectures, createLecture } from "../services/api";
import styles from "../styles/LecturesPageStyles.module.css";
import LectureModal from "./LectureModal";
import TimetableAddModal from "./TimetableAddModal";
import LectureListModal from "./LectureListModal";
import Modal from "./Modal";

// Days and slots für timetable
const days = ["Mo", "Di", "Mi", "Do", "Fr"];
const slots = [1, 2, 3, 4, 5, 6, 7];
const slotTimes = {
  1: "08:00 - 09:30",
  2: "09:45 - 11:15",
  3: "11:30 - 13:00",
  4: "13:00 - 14:00",
  5: "14:00 - 15:30",
  6: "15:45 - 17:15",
  7: "17:30 - 19:00",
};

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showTimetableModal, setShowTimetableModal] = useState(false);
  const [showLectureListModal, setShowLectureListModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newLecture, setNewLecture] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
  });
  const fetchTimetable = () => {
    fetch("http://localhost:3000/api/timetable/1")
      .then((res) => res.json())
      .then(setTimetable)
      .catch(console.error);
  };

  const handleRemoveTimetableEntry = async (entryId) => {
    try {
      await fetch(`http://localhost:3000/api/timetable/${entryId}`, {
        method: "DELETE",
      });
      setTimetable((prev) => prev.filter((e) => e.id !== entryId));
    } catch (err) {
      console.error("Fehler beim Löschen aus Stundenplan:", err);
    }
  };

  useEffect(() => {
    fetchLectures().then(setLectures).catch(console.error);
    fetchTimetable();
    // Load timetable entries
    // fetch("http://localhost:3000/api/timetable/1")
    //   .then((res) => res.json())
    //   .then(setTimetable)
    //   .catch(console.error);
  }, []);

  const handleCreateLecture = async () => {
    const { title, room } = newLecture;
    if (!title) return;

    const payload = {
      title,
      room,
    };

    try {
      const created = await createLecture(payload);
      setLectures((prev) => [...prev, created]);
      setNewLecture({
        title: "",
        room: "",
      });
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };

  const handleDeleteLecture = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/lectures/${id}`, {
        method: "DELETE",
      });

      setLectures((prev) => prev.filter((lec) => lec.id !== id));
    } catch (err) {
      console.error("Fehler beim Löschen der Vorlesung:", err);
    }
  };

  const getEntry = (day, slot) => {
    return timetable.find(
      (entry) =>
        entry.weekday === day &&
        slot >= entry.slot_start &&
        slot <= entry.slot_end
    );
  };

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">🗓️ Dein Stundenplan</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowLectureModal(true)}
          className={styles.buttonInput}
        >
          ➕ Neue Vorlesung
        </button>
        <button
          onClick={() => setShowTimetableModal(true)}
          className={styles.buttonInput}
        >
          🗓️ In Stundenplan eintragen
        </button>
        <button
          onClick={() => setShowLectureListModal(true)}
          className={styles.buttonInput}
        >
          📜 Vorlesungsliste anzeigen
        </button>
      </div>
      {/* === Modals === */}
      {showLectureModal && (
        <Modal onClose={() => setShowLectureModal(false)}>
          <LectureModal
            onClose={() => setShowLectureModal(false)}
            onCreated={(newLec) => {
              setLectures((prev) => [...prev, newLec]);
              setShowLectureModal(false);
            }}
          />
        </Modal>
      )}

      {showTimetableModal && (
        <Modal onClose={() => setShowTimetableModal(false)}>
          <TimetableAddModal
            onClose={() => setShowTimetableModal(false)}
            onAdded={() => {
              fetchTimetable();
              setShowTimetableModal(false);
            }}
          />
        </Modal>
      )}

      {showLectureListModal && (
        <Modal onClose={() => setShowLectureListModal(false)}>
          <LectureListModal
            lectures={lectures}
            onDelete={handleDeleteLecture}
            onClose={() => setShowLectureListModal(false)}
          />
        </Modal>
      )}
      {/* === Timetable View === */}
      <div className={styles.timetableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Stunde</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot}>
                <td>
                  <div>
                    <strong>{slot}</strong>
                    <br />
                    <small className={styles.timeLabel}>
                      {slotTimes[slot]}
                    </small>
                  </div>
                </td>

                {days.map((day) => {
                  const entry = getEntry(day, slot);
                  return (
                    <td key={day + slot}>
                      {entry ? (
                        <div className={styles.entryBox}>
                          <strong>{entry.title}</strong>
                          <small>{entry.room}</small>
                          <button
                            title="Löschen"
                            onClick={() => handleRemoveTimetableEntry(entry.id)}
                            className={styles.deleteButton}
                          >
                            ❌
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Lectures;
