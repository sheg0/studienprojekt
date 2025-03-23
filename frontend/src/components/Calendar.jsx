import React, { useState, useEffect } from "react";
import styles from "../styles/ExamsPageStyles.module.css";

const CustomCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventInput, setEventInput] = useState("");

  console.log("events", events);
  console.log("getMonth", currentMonth);
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("calendarEvents"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  const saveEventsToStorage = (updatedEvents) => {
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };

  const handleCellClick = (day) => {
    const fullDate = new Date(currentYear, currentMonth, day).toDateString();
    setSelectedDate(fullDate);
    setEventInput("");
  };

  const handleEventSave = () => {
    if (!eventInput.trim()) return;
    const updatedEvents = { ...events };
    if (!updatedEvents[selectedDate]) {
      updatedEvents[selectedDate] = [];
    }
    updatedEvents[selectedDate].push(eventInput.trim());
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
    setEventInput("");
  };

  const handleEventDelete = (index) => {
    const updatedEvents = { ...events };
    updatedEvents[selectedDate].splice(index, 1);
    if (updatedEvents[selectedDate].length === 0) {
      delete updatedEvents[selectedDate];
    }
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
  };

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const daysOfWeek = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 7 : day;
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarCells = [];
  for (let i = 1; i < firstDay; i++) {
    calendarCells.push(
      <div
        key={`empty-${i}`}
        className={styles.calendarCell + " " + styles.empty}
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = new Date(currentYear, currentMonth, day).toDateString();
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    calendarCells.push(
      <div
        key={day}
        className={`${styles.calendarCell} ${isToday ? styles.today : ""}`}
        onClick={() => handleCellClick(day)}
        title={events[fullDate]?.join(", ") || "Kein Ereignis"}
      >
        <div>{day}</div>
        {events[fullDate] &&
          events[fullDate].map((evt, idx) => (
            <small key={idx} style={{ fontSize: "0.7rem" }}>
              {evt}
            </small>
          ))}
      </div>
    );
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarHeader}>
        <button onClick={goToPrevMonth}>❮</button>
        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={goToNextMonth}>❯</button>
      </div>

      <div className={styles.calendarGrid}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.calendarDayName}>
            {day}
          </div>
        ))}
        {calendarCells}
      </div>

      {selectedDate && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Events für {selectedDate}</h3>
          <ul>
            {events[selectedDate]?.map((evt, idx) => (
              <li key={idx}>
                {evt}
                <button
                  style={{ marginLeft: "1rem", color: "red" }}
                  onClick={() => handleEventDelete(idx)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
            placeholder="Ereignis eingeben..."
          />
          <button onClick={handleEventSave} style={{ marginLeft: "1rem" }}>
            Speichern
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
