import React, { useEffect, useState } from "react";
import styles from "./ReadOnlyCalendar.module.css";
import { useNavigate } from "react-router-dom";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const ReadOnlyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const navigate = useNavigate();

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // hover over event
  const handleDotEnter = (e, event) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setHoveredEvent(event);
  };
  const handleDotLeave = () => {
    setHoveredEvent(null);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);
        setEvents(data);
      })
      .catch(console.error);

    // Generiere die Kalenderstruktur für den aktuellen Monat
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const calendar = [];

    let week = [];
    let dayOfWeek = (firstDay.getDay() + 6) % 7; // Montag = 0
    for (let i = 0; i < dayOfWeek; i++) week.push(null);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      calendar.push(week);
    }

    setCalendarDays(calendar);
  }, []);

  const getEventsForDay = (date) => {
    const isoDate = date.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    return events.filter((e) => {
      const eventDate = new Date(e.date).toLocaleDateString("sv-SE");
      return eventDate === isoDate;
    });
  };

  return (
    <div
      className={styles.calendarWrapper}
      onClick={() => navigate("/calendar")}
    >
      <h3 className={styles.title}>📆 Mein Kalender</h3>
      <table className={styles.calendar}>
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarDays.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td
                  key={j}
                  className={`${styles.dayCell} ${
                    day && new Date().toDateString() === day.toDateString()
                      ? styles.today
                      : ""
                  }`}
                >
                  {day && (
                    <div>
                      <strong>{day.getDate()}</strong>
                      <ul className={styles.eventDots}>
                        {getEventsForDay(day)
                          .slice(0, 3)
                          .map((e, idx) => (
                            <li
                              key={e.id}
                              className={styles.dot}
                              onMouseEnter={(ev) => handleDotEnter(ev, e)}
                              onMouseMove={(ev) => handleDotEnter(ev, e)}
                              onMouseLeave={handleDotLeave}
                            ></li>
                          ))}
                        {getEventsForDay(day).length > 3 && (
                          <li className={styles.moreHint}>
                            +{getEventsForDay(day).length - 3}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {hoveredEvent && (
        <div
          className={styles.tooltip}
          style={{
            top: tooltipPos.y,
            left: tooltipPos.x,
          }}
        >
          <strong>{hoveredEvent.title}</strong>
          <div>{hoveredEvent.time && <div>{hoveredEvent.time}</div>}</div>
          <p style={{ margin: 0 }}>{hoveredEvent.description}</p>
        </div>
      )}
    </div>
  );
};

export default ReadOnlyCalendar;
