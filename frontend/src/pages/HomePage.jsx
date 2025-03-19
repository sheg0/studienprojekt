/* HomePage.jsx */
import React from "react";
import styles from "../styles/HomePageStyles.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      Dies ist die Startseite
      <p>Hier Anzeige von Stundenplan, Kalender, To-Do-Liste</p>
    </div>
  );
};
export default HomePage;
