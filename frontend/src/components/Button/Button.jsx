/**
 * Filename      : Button.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-19
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */

import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick }) => {
  return <button className={styles.btn} onClick={onClick}></button>;
};

export default Button;
