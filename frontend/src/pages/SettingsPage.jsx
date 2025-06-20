/**
 * Filename      : SettingsPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-03-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React, { useState, useEffect } from "react";
import styles from "../styles/SettingsPageStyles.module.css";
import { useTheme } from "../hook/useTheme";
// import { useTranslation } from "react-i18next";
const SettingsPage = () => {
  // const { t, i18n } = useTranslation();
  const [theme, toggleTheme, setTheme] = useTheme();

  const [firstName, setFirstName] = useState("Esra");
  const [lastName, setLastName] = useState("Balci");
  const [email, setEmail] = useState("esbait01@hs-esslingen.de");

  const handleSave = (e) => {
    e.preventDefault();
    // Provisorisch: Ausgabe in der Konsole
    console.log("Benutzerdaten gespeichert:", {
      firstName,
      lastName,
      email,
    });
    alert("Benutzerdaten gespeichert (provisorisch)");
  };

  // const changeLanguage = (e) => {
  //   const selectedLanguage = e.target.value;
  //   i18n.changeLanguage(selectedLanguage);
  //   localStorage.setItem("i18nextLng", selectedLanguage);
  // };

  // useEffect(() => {
  //   const savedLang = localStorage.getItem("lang");
  //   if (savedLang) i18n.changeLanguage(savedLang);
  // }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.headerText}>Einstellungen</h1>

      <section className={styles.settingsSection}>
        <h2 className={styles.headerText}>Benutzerdaten</h2>
        <form className={styles.userSettingsForm} onSubmit={handleSave}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Vorname"
            className={styles.typeInput}
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nachname"
            className={styles.typeInput}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            className={styles.typeInput}
          />
        </form>
      </section>

      <h2 className={styles.headerText}>Themen</h2>
      <div className={styles.themeOptions}>
        {[
          {
            value: "light",
            label: "Light",
            colors: ["#706c7a", "#5c5866"],
          },
          {
            value: "dark",
            label: "Dark",
            colors: ["#1e1e1e", "#2629d4"],
          },
          {
            value: "green",
            label: "Calm Green",
            colors: ["#eaf4ec", "#88b394"],
          },
          {
            value: "smoky",
            label: "Smoky Blue",
            colors: ["#1b1e23", "#3c5a77"],
          },
          {
            value: "gwbg",
            label: "Girls Will Be Girls",
            colors: ["#111111", "#d2232a"],
          },
        ].map((themeOption) => (
          <div key={themeOption.value} className={styles.themeCard}>
            <div className={styles.colorSwatch}>
              {themeOption.colors.map((color, idx) => (
                <span
                  key={idx}
                  className={styles.swatchBox}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button
              className={`${styles.themeButton} ${
                theme === themeOption.value ? styles.active : ""
              }`}
              onClick={() => setTheme(themeOption.value)}
            >
              {themeOption.label}
            </button>
          </div>
        ))}
      </div>

      {/* 
      <div>
        <h1>{t("settings")}</h1>

        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value="en">🇬🇧 English</option>
          <option value="de">🇩🇪 Deutsch</option>
        </select>
      </div> */}
    </div>
  );
};

export default SettingsPage;
