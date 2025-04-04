const API_URL = "http://localhost:3000/api/events";

// 🟡 1. Fetch all events
export const fetchEvents = async () => {
  const res = await fetch(API_URL);
  return res.json(); // returns [{ id, title, date, type, ... }]
};

// 🟢 2. Create an event
export const createEvent = async (eventData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return res.json();
};

// 🔴 3. Delete by ID
export const deleteEvent = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
