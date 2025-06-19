/**
 * Filename      : NavigationBar.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/NavigationBarStyles.module.css";
import { GoHomeFill } from "react-icons/go";
import { IoBookSharp, IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdAssignment } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      {/* Mobile Hamburger Button */}
      <div className={styles.mobileHeader}>
        <button onClick={toggleMenu} className={styles.hamburgerButton}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`${styles.container} ${
          menuOpen ? styles.showMenu : styles.hideMenu
        }`}
      >
        <h1 className={styles.box}>
          <NavLink
            to="/"
            className={styles.text}
            onClick={() => setMenuOpen(false)}
          >
            <GoHomeFill></GoHomeFill>
            Startseite
          </NavLink>
        </h1>
        <h1 className={styles.box}>
          <Link
            to="/lectures"
            className={styles.text}
            onClick={() => setMenuOpen(false)}
          >
            <SlCalender />
            Stundenplan
          </Link>
        </h1>
        <h1 className={styles.box}>
          <Link
            to="/notes"
            className={styles.text}
            onClick={() => setMenuOpen(false)}
          >
            <IoBookSharp />
            Notizen
          </Link>
        </h1>
        <h1 className={styles.box}>
          <Link
            to="/calendar"
            className={styles.text}
            onClick={() => setMenuOpen(false)}
          >
            <MdAssignment />
            Kalendar
          </Link>
        </h1>
        <h1 className={styles.box}>
          <Link
            to="/settings"
            className={styles.text}
            onClick={() => setMenuOpen(false)}
          >
            <IoSettingsOutline />
            Einstellungen
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default NavigationBar;
