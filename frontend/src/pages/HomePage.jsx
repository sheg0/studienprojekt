/**
 * Filename      : HomePage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useEffect } from "react";
import styles from "../styles/HomePageStyles.module.css";
import { getGreeting } from "../services/api";
import ToDoList from "../components/ToDo/ToDoList";
import ReadOnlyCalendar from "../components/ReadOnly/ReadOnlyCalendar";
import ReadOnlyTimetable from "../components/ReadOnly/ReadOnlyTimetable";

const HomePage = () => {
  const [greeting, setGreeting] = React.useState("");

  useEffect(() => {
    getGreeting().then((data) => setGreeting(data.greeting));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.todoRow}>
        <ToDoList />
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.calendar}>
          <ReadOnlyCalendar />
        </div>
        <div className={styles.timetable}>
          <ReadOnlyTimetable />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
