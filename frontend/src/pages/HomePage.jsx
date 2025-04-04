/* HomePage.jsx */
import React, { useEffect } from "react";
import styles from "../styles/HomePageStyles.module.css";
import { getGreeting } from "../services/api";

const HomePage = () => {
  const [greeting, setGreeting] = React.useState("");

  useEffect(() => {
    getGreeting().then((data) => setGreeting(data.greeting));
  }, []);

  return (
    <div className={styles.container}>
      Dies ist die Startseite
      <p>Hier Anzeige von Stundenplan, Kalender, To-Do-Liste</p>
      <p>Backend says: {greeting}</p>
    </div>
  );
};
export default HomePage;
