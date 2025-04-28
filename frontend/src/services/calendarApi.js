const API_URL = "http://localhost:3000";

export const fetchEvents = async () => {
  const res = await fetch("http://localhost:3000/api/events");
  return res.json();
};

export const createEvent = async (event) => {
  const res = await fetch("http://localhost:3000/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return res.json();
};

export const deleteEvent = async (id) => {
  await fetch(`${"http://localhost:3000/api/events"}/${id}`, {
    method: "DELETE",
  });
};
