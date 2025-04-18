/**
 * Filename      : LecturesPage.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-18
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState, useEffect } from "react";
import { fetchLectures } from "../services/api";
import styles from "../styles/LecturesPageStyles.module.css";
import Lectures from "../components/Lectures";

const LecturesPage = () => {
  return (
    <div>
      <Lectures></Lectures>
    </div>
  );
};

export default LecturesPage;
