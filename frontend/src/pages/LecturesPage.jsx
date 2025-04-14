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
