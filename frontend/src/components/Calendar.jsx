import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FrontendCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});

  // Laden der Ereignisse aus dem localStorage, falls vorhanden
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // Ereignis speichern
  const handleEventChange = (event) => {
    const eventDate = date.toDateString();
    const updatedEvents = { ...events, [eventDate]: event };

    // Ereignisse im localStorage speichern
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Kalender</h1>
      <Calendar onChange={setDate} value={date} />
      <div>
        <h2>Aktuelles Datum: {date.toDateString()}</h2>
        <input
          type="text"
          placeholder="Ereignis hinzufügen"
          onBlur={(e) => handleEventChange(e.target.value)}
        />
        <div>
          <h3>Ereignisse für {date.toDateString()}:</h3>
          <p>{events[date.toDateString()] || "Keine Ereignisse"}</p>
        </div>
      </div>
    </div>
  );
};

export default FrontendCalendar;
