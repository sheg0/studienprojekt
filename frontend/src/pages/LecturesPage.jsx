import React from "react";
import styles from "../styles/LecturesPageStyles.module.css";

const days = ["Mo", "Di", "Mi", "Do", "Fr"];
const times = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const schedule = [
  {
    day: "Mo",
    start: "08:00",
    duration: 2,
    title: "Mathe 1A",
    room: "Raum",
    color: "#A3D977",
  },
  {
    day: "Mo",
    start: "14:00",
    duration: 2,
    title: "BS",
    room: "Raum",
    color: "#B174E8",
  },
  {
    day: "Di",
    start: "08:00",
    duration: 1,
    title: "Mathe 1B",
    room: "Raum",
    color: "#75D3D3",
  },
  {
    day: "Di",
    start: "11:00",
    duration: 1,
    title: "MCI",
    room: "Raum",
    color: "#D7D065",
  },
  {
    day: "Mi",
    start: "08:00",
    duration: 2,
    title: "Programmieren",
    room: "Raum",
    color: "#8F8FEC",
  },
  {
    day: "Mi",
    start: "14:00",
    duration: 1,
    title: "Mathe 1B",
    room: "Raum",
    color: "#75D3D3",
  },
  {
    day: "Do",
    start: "08:00",
    duration: 1,
    title: "IT",
    room: "Raum",
    color: "#D08B70",
  },
  {
    day: "Do",
    start: "09:00",
    duration: 2,
    title: "OOS",
    room: "Raum",
    color: "#C65A5A",
  },
  {
    day: "Fr",
    start: "08:00",
    duration: 3,
    title: "Programmieren Labor",
    room: "Raum",
    color: "#DA8AC4",
  },
];

const LecturesPage = () => {
  return (
    <div className={styles.container}>
      <h2>Stundenplan</h2>
      <div className={styles.gridContainer}>
        {/* Linke Spalte: Zeiten */}
        <div className={styles.timeColumn}>
          <div className={styles.headerCell}></div>
          {times.map((time) => (
            <div key={time} className={styles.timeCell}>
              {time}
            </div>
          ))}
        </div>

        {/* Rechte Spalte: Tage + Fächer */}
        {days.map((day) => (
          <div key={day} className={styles.dayColumn}>
            <div className={styles.headerCell}>{day}</div>
            {times.map((time) => {
              const entry = schedule.find(
                (s) => s.day === day && s.start === time
              );
              if (entry) {
                return (
                  <div
                    key={`${day}-${time}`}
                    className={styles.classBlock}
                    style={{
                      backgroundColor: entry.color,
                      gridRow: `span ${entry.duration}`,
                    }}
                  >
                    <strong>{entry.title}</strong>
                    <br />
                    <small>{entry.room}</small>
                  </div>
                );
              } else if (
                schedule.some(
                  (s) =>
                    s.day === day &&
                    parseInt(s.start.split(":")[0]) <
                      parseInt(time.split(":")[0]) &&
                    parseInt(s.start.split(":")[0]) + s.duration >
                      parseInt(time.split(":")[0])
                )
              ) {
                return null; // Already spanned
              } else {
                return (
                  <div
                    key={`${day}-${time}`}
                    className={styles.emptyCell}
                  ></div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesPage;
