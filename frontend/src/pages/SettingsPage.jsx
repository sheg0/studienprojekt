/**
 * Filename      : SettingsPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { useState } from "react";
import styles from "../styles/SettingsPageStyles.module.css";
import { useTheme } from "../hook/useTheme";

const SettingsPage = () => {
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [theme, toggleTheme] = useTheme();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-semibold mb-6">Einstellungen</h1>

      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <div className="mb-6">
        <label className="block text-xl mb-2">Sprache</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded-md"
        >
          <option value="en">Englisch</option>
          <option value="de">Deutsch</option>
          <option value="fr">Französisch</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xl mb-2">Benachrichtigungen</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={handleNotificationsChange}
          className="mr-2"
        />
        <span>Benachrichtigungen aktivieren</span>
      </div>

      <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
        Einstellungen speichern
      </button>
    </div>
  );
};

export default SettingsPage;
