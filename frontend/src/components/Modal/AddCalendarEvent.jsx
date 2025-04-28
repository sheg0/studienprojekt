import React, { useState, useEffect } from "react";
import styles from "../../styles/Modal.module.css";

const AddCalendarEvent = ({
  onClose,
  onSave,
  selectedDate,
  defaultType = "reminder",
}) => {
  const [eventInput, setEventInput] = useState("");
  const [eventType, setEventType] = useState(defaultType);
  const [eventTime, setEventTime] = useState("");

  const handleSubmit = () => {
    if (eventInput.trim()) {
      onSave({
        title: eventInput,
        type: eventType,
        time: eventTime,
      });
    }
  };

  return (
    <div className={styles.overlay}>
      {/* Modal Container */}
      {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h2>Termin für {selectedDate}</h2>

        <input
          type="text"
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          placeholder="Ereignis eingeben..."
          className={styles.selectInput}
        />

        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className={styles.periodInput}
        />

        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className={styles.periodInput}
        >
          <option value="reminder">🔔 Reminder</option>
          <option value="exam">📚 Exam</option>
          <option value="lecture">🧑‍🏫 Lecture</option>
          <option value="study">📝 Study</option>
        </select>

        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleSubmit} className={styles.buttonInput}>
            Speichern
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCalendarEvent;
