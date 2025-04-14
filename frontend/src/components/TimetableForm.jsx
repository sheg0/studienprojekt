import React, { useState, useEffect } from "react";

const TimetableForm = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState("");
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
    const newEntry = {
      user_id: 1, // statisch für jetzt
      lecture_id: selectedLecture,
      weekday,
      slot_start: slotStart,
      slot_end: slotEnd,
    };
    if (!selectedLecture || !weekday || !slotStart || !slotEnd) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }
    if (slotEnd < slotStart) {
      alert("Die Endzeit darf nicht vor der Startzeit liegen.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      const data = await res.json();
      alert("Eintrag hinzugefügt! ✅");
    } catch (err) {
      console.error("Fehler beim Einfügen:", err);
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "1rem",
      }}
    >
      <h2>📅 Vorlesung zum Stundenplan hinzufügen</h2>

      <select
        value={selectedLecture}
        onChange={(e) => setSelectedLecture(e.target.value)}
      >
        <option value="">-- Vorlesung wählen --</option>
        {lectures.map((lec) => (
          <option key={lec.id} value={lec.id}>
            {lec.title} ({lec.room})
          </option>
        ))}
      </select>

      <div>
        <label>Wochentag:</label>
        <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
          <option value="Mo">Mo</option>
          <option value="Di">Di</option>
          <option value="Mi">Mi</option>
          <option value="Do">Do</option>
          <option value="Fr">Fr</option>
        </select>
      </div>

      <div>
        <label>Von Stunde:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={slotStart}
          onChange={(e) => setSlotStart(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Bis Stunde:</label>
        <input
          type="number"
          min={slotStart}
          max="10"
          value={slotEnd}
          onChange={(e) => setSlotEnd(Number(e.target.value))}
        />
      </div>

      <button onClick={handleAdd} style={{ marginTop: "1rem" }}>
        ➕ Eintragen
      </button>
    </div>
  );
};

export default TimetableForm;
