// src/services/api.js
const API_URL = "http://localhost:3000";

export async function getGreeting() {
  const res = await fetch(`${API_URL}/api/greeting`);
  return res.json();
}

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

export const fetchLectures = async () => {
  const res = await fetch("http://localhost:3000/api/lectures");
  return res.json();
};

export const createLecture = async (lecture) => {
  const res = await fetch("http://localhost:3000/api/lectures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lecture),
  });
  return res.json();
};

export const fetchLectureById = async (id) => {
  const res = await fetch(`${"http://localhost:3000/api/lectures"}/${id}`);
  return res.json();
};

export const deleteLecture = async (id) => {
  await fetch(`${"http://localhost:3000/api/lectures"}/${id}`, {
    method: "DELETE",
  });
};
