import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import LecturesPage from "./pages/LecturesPage";
import NavigationBar from "./components/NavigationBar";
import NotesPage from "./pages/NotesPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/themes.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lectures" element={<LecturesPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
