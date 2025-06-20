/**
 * Filename      : LectureListModal.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState } from "react";
import styles from "../../styles/Modal.module.css";

const LectureListModal = ({ lectures, onDelete, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLectures = lectures.filter((lecture) =>
    lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightMatch = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, idx) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={idx} className="bg-yellow-200 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBig}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {/* Header */}
        <h2>Vorlesungen</h2>
        {/* Search */}
        <input
          type="text"
          placeholder="Suche nach Vorlesung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.selectInput}
        />
        {/* List */}
        {filteredLectures.map((lecture) => (
          <div key={lecture.id} className={styles.lectureItem}>
            {/* Textbereich: Titel & Raum untereinander */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {highlightMatch(lecture.title, searchTerm)}
              </h3>
              {lecture.room && (
                <p className="text-sm text-gray-500 mt-1">
                  {highlightMatch(lecture.room, searchTerm)}
                </p>
              )}
            </div>

            {/* Löschen Button rechts */}
            <button
              onClick={() => onDelete(lecture.id)}
              className={styles.deleteButton}
              title="Löschen"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureListModal;
