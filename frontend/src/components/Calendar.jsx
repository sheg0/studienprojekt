import React, { useState, useEffect } from "react";
import styles from "../styles/CalendarPageStyles.module.css";
import Modal from "react-modal";
import { fetchEvents, createEvent, deleteEvent } from "../services/api";
Modal.setAppElement("#root");

const CustomCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventInput, setEventInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventColor, setEventColor] = useState("#000000");
  const [eventType, setEventType] = useState("reminder");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventTime, setEventTime] = useState("");

  const typeColors = {
    exam: "#e74c3c", // red
    lecture: "#3498db", // blue
    reminder: "#f1c40f", // yellow
    study: "#2ecc71", // green
  };

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        console.log("Fetched data:", data);

        if (!Array.isArray(data)) {
          console.error("Expected array, got:", data);
          return;
        }

        const mapped = {};

        data.forEach((event) => {
          const dateKey = new Date(event.date).toDateString();
          if (!mapped[dateKey]) mapped[dateKey] = [];
          mapped[dateKey].push({
            id: event.id,
            text: event.title,
            type: event.type,
            color: typeColors[event.type] || "#999",
            time: event.description || "",
          });
        });

        setEvents(mapped);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
      });
  }, []);

  const handleCellClick = (day) => {
    const fullDate = new Date(currentYear, currentMonth, day).toDateString();
    setSelectedDate(fullDate);
    setEventInput("");
    setIsModalOpen(true);
  };

  const handleEventSave = () => {
    if (!eventInput.trim()) return;

    const eventDate = new Date(selectedDate);
    const formattedDate = `${eventDate.getFullYear()}-${(
      eventDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${eventDate.getDate().toString().padStart(2, "0")}`;

    createEvent({
      title: eventInput.trim(),
      date: formattedDate,
      type: eventType,
      description: eventTime,
      user_id: 1, // use real user_id if available
      lecture_id: null,
    }).then((newEvent) => {
      const dateKey = new Date(newEvent.date).toDateString();
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [
          ...(prev[dateKey] || []),
          {
            id: newEvent.id,
            text: newEvent.title,
            type: newEvent.type,
            color: typeColors[newEvent.type] || "#999",
            time: newEvent.description || "",
          },
        ],
      }));

      setIsModalOpen(false);
      setEventInput("");
      setEventColor("#000000");
      setEventType("reminder");
      setEventTime("");
    });
  };

  const handleEventDelete = (idToDelete) => {
    deleteEvent(idToDelete).then(() => {
      const updated = { ...events };

      for (const date in updated) {
        updated[date] = updated[date].filter((e) => e.id !== idToDelete);
        if (updated[date].length === 0) delete updated[date];
      }

      setEvents(updated);
    });
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

  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

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
  const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);

  const prevMonthDays = firstDay - 1;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);
  const prevMonthDaysToShow = firstDay - 1;

  const calendarCells = [];
  for (let i = prevMonthDaysToShow; i > 0; i--) {
    const day = daysInPrevMonth - i + 1;
    const date = new Date(prevMonthYear, prevMonth, day);
    const fullDate = date.toDateString();
    const dayOfWeek = date.getDay(); // 0 = Sonntag, 6 = Samstag
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    calendarCells.push(
      <div
        key={`prev-${day}`}
        className={`${styles.calendarCell} ${styles.outsideMonth} ${
          isWeekend ? styles.weekend : ""
        }`}
      >
        <div>{day}</div>
        {events[fullDate] &&
          events[fullDate].map((evt, idx) => (
            <div
              key={idx}
              className={styles.eventItem}
              style={{ backgroundColor: evt.color }}
            >
              {evt.text}
            </div>
          ))}
      </div>
    );
  }

  // ➕ Tage des aktuellen Monats
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const fullDate = date.toDateString();
    const dayOfWeek = date.getDay(); // 0 = Sonntag, 6 = Samstag
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    calendarCells.push(
      <div
        key={day}
        className={`${styles.calendarCell} ${isToday ? styles.today : ""} ${
          isWeekend ? styles.weekend : ""
        }`}
        onClick={() => handleCellClick(day)}
        title={
          events[fullDate]?.map((e) => e.text).join(", ") || "Kein Ereignis"
        }
      >
        <div>{day}</div>
        {events[fullDate] &&
          events[fullDate].map((evt, idx) => (
            <div
              key={idx}
              className={styles.eventItem}
              style={{ backgroundColor: evt.color }}
            >
              {evt.text}
            </div>
          ))}
      </div>
    );
  }

  // ➕ Tage aus nächstem Monat (damit letzte Woche komplett ist)
  const totalDisplayedCells = calendarCells.length;
  const nextMonthDaysToShow = (7 - (totalDisplayedCells % 7)) % 7;

  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    const date = new Date(nextMonthYear, nextMonth, i);
    const fullDate = date.toDateString();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    calendarCells.push(
      <div
        key={`next-${i}`}
        className={`${styles.calendarCell} ${styles.outsideMonth} ${
          isWeekend ? styles.weekend : ""
        }`}
      >
        <div>{i}</div>
        {events[fullDate] &&
          events[fullDate].map((evt, idx) => (
            <div
              key={idx}
              className={styles.eventItem}
              style={{ backgroundColor: evt.color }}
            >
              {evt.text}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className={styles.calendarContent}>
      {/* Linke Seite: Terminliste */}
      <div className={styles.eventList}>
        <h2>Termine</h2>
        {Object.entries(events).length === 0 && <p>Keine Termine vorhanden.</p>}
        {Object.entries(events)
          .sort((a, b) => new Date(a[0]) - new Date(b[0]))
          .map(([date, items]) => (
            <div key={date}>
              <h4>{new Date(date).toLocaleDateString("de-DE")}</h4>
              {items.map((evt, idx) => (
                <div
                  key={idx}
                  className={styles.eventItem}
                  style={{ backgroundColor: evt.color }}
                >
                  <span>{evt.text}</span>
                  <small
                    style={{
                      fontSize: "0.7rem",
                      marginLeft: "0.5rem",
                      opacity: 0.7,
                    }}
                  >
                    ({evt.type})
                  </small>
                  {evt.time && (
                    <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                      {evt.time}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setEventToDelete({ id: evt.id, date });
                      setIsDeleteModalOpen(true);
                    }}
                    className={styles.deleteButton}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Rechte Seite: Kalender */}
      <div className={styles.calendarRight}>
        <div className={styles.calendarHeader}>
          <button onClick={goToPrevMonth}>❮</button>
          <button onClick={goToNextMonth}>❯</button>
          <h2>
            {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>

        <div className={styles.calendarWrapper}>
          <div className={styles.calendarGrid}>
            {daysOfWeek.map((day) => (
              <div key={day} className={styles.calendarDayName}>
                {day}
              </div>
            ))}
            {calendarCells}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Termin hinzufügen"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            padding: "2rem",
          },
        }}
      >
        <h2>Termin für {selectedDate}</h2>
        <input
          type="text"
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          placeholder="Ereignis eingeben..."
        />
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          style={{ marginTop: "1rem" }}
        />
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          style={{
            marginTop: "1rem",
            padding: "0.4rem",
            borderRadius: "0.5rem",
          }}
        >
          <option value="reminder">🔔 Reminder</option>
          <option value="exam">📚 Exam</option>
          <option value="lecture">🧑‍🏫 Lecture</option>
          <option value="study">📝 Study</option>
        </select>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleEventSave}>Speichern</button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ marginLeft: "1rem" }}
          >
            Abbrechen
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Termin löschen bestätigen"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            padding: "2rem",
          },
        }}
      >
        <h3>Termin wirklich löschen?</h3>
        <p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => {
              if (eventToDelete) {
                handleEventDelete(eventToDelete.id);
              }
              setIsDeleteModalOpen(false);
              setEventToDelete(null);
            }}
          >
            Ja, löschen
          </button>
          <button
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              setIsDeleteModalOpen(false);
              setEventToDelete(null);
            }}
          >
            Abbrechen
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomCalendar;
