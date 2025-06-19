/**
 * Filename      : pdfUpload.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-20
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState } from "react";
import styles from "../../styles/NotesPageStyles.module.css";

const PdfUpload = ({ lectureId, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return;

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("title", title);
    formData.append("lecture_id", lectureId);

    try {
      const res = await fetch("http://localhost:3000/api/notes_lectures", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      window.dispatchEvent(new Event("pdf-upload-success"));
      setTitle("");
      setFile(null);
      if (onUploaded) {
        onUploaded();
      }
    } catch (err) {
      console.error("Fehler beim Hochladen:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.searchInput}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className={styles.fileInput}
      />
      <button type="submit" className={styles.submitButton}>
        Hochladen
      </button>
    </form>
  );
};

export default PdfUpload;
