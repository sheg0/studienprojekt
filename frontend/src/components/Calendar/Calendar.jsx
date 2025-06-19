/**
 * Filename      : Calendar.jsx
 * Author        : Esra Balci
 * Created on    : 2025-04-27
 * Description   : Short description of the file
 * Version       : 1.0
 * Dependencies  : e.g. React, Axios, etc.
 */
import React, { useState, useEffect } from "react";
import styles from "../../styles/CalendarPageStyles.module.css";
import {
  fetchEvents,
  createEvent,
  deleteEvent,
} from "../../services/calendarApi.js";
import AddEventModal from "./AddEventModal.jsx";
import DetailEventModal from "./DetailEventModal.jsx";
import DeleteEventModal from "./DeleteEventModal.jsx";
import Modal from "../Modal.jsx";
import { FaRegBell } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { GoBook } from "react-icons/go";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const Calendar = () => {
  const getCSSVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const typeColors = {
    exam: getCSSVar("--event-type-color-exam"),
    lecture: getCSSVar("--event-type-color-lecture"),
    reminder: getCSSVar("--event-type-color-reminder"),
    study: getCSSVar("--event-type-color-study"),
  };

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const daysOfWeek = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  /* State for events */
  const [events, setEvents] = useState({});

  const [detailEvent, setDetailEvent] = useState(null);

  const [activeFilter, setActiveFilter] = useState("all");

  /* Fetching all the events */
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Fetched data is not an array:", data);
          return;
        }

        const mapped = {};

        data.forEach((event) => {
          const date = new Date(event.date).toDateString();
          if (!mapped[date]) mapped[date] = [];
          mapped[date].push({
            id: event.id,
            text: event.title,
            type: event.type,
            color: typeColors[event.type] || "#999",
            time: event.description || "",
          });
        });
        setEvents(mapped);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  /* Date variables */
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  /* Modal states */
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  /* States for the three Modals */
  // const [isAddModalOpen, setAddModalOpen] = useState(false);
  // const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  // const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  /* Show Modals */
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* Which event is current */
  const [selectedEvent, setSelectedEvent] = useState({ id: null });
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventInput, setEventInput] = useState("");

  /* Modal opening */
  const handleCellClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day).toDateString());
    setShowAddModal(true);
  };
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowDetailModal(true);
  };
  const handleEventListDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  /* Modal functions */
  const handleAdd = ({ title, type, time }) => {
    const date = new Date(selectedDate);
    const formatted = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    createEvent({
      title,
      type,
      date: formatted,
      description: time,
      user_id: 1,
      lecture_id: null,
    })
      .then((newEvent) => {
        const key = new Date(newEvent.date).toDateString();
        setEvents((prev) => ({
          ...prev,
          [key]: [
            ...(prev[key] || []),
            {
              id: newEvent.id,
              text: newEvent.title,
              type: newEvent.type,
              color: typeColors[newEvent.type],
              time: newEvent.description,
            },
          ],
        }));
      })
      .finally(() => setShowAddModal(false));
  };

  const handleDelete = (id) => {
    deleteEvent(id).then(() => {
      setEvents((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach((key) => {
          copy[key] = copy[key].filter((e) => e.id !== id);
          if (copy[key].length === 0) delete copy[key];
        });
        return copy;
      });
    });
  };

  /* get days in Month*/
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay() || 7; // 0 is Sunday, we want 7 for our calendar
  };

  /* go to previous and next month */
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  /* More date variables */
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
  const prevMonthDaysToShow = firstDay - 1;

  const calendarCells = [];

  /* Days in the previous month */
  for (let i = prevMonthDaysToShow; i > 0; i--) {
    const day = daysInPrevMonth - i + 1;
    const date = new Date(prevYear, prevMonth, day);
    const fullDate = date.toDateString();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    calendarCells.push(
      <div
        key={`prev-${day}`}
        className={`${styles.calendarCell} ${styles.outsideMonth} ${
          isWeekend ? styles.weekend : ""
        }`}
      >
        <div className={styles.dayInCell}>{day}</div>

        {events[fullDate] &&
          (events[fullDate].length <= 2 ? (
            events[fullDate].map((evt, idx) => (
              <div
                key={idx}
                className={styles.eventInCalendar}
                style={{
                  backgroundColor: evt.color,
                  opacity: 0.5,
                }}
              >
                {evt.text}
              </div>
            ))
          ) : (
            <div className={styles.eventDotsContainer}>
              {events[fullDate].map((evt, idx) => (
                <div
                  key={idx}
                  className={styles.eventDot}
                  style={{
                    backgroundColor: evt.color,
                    opacity: 0.5,
                  }}
                  title={evt.text}
                />
              ))}
            </div>
          ))}
      </div>
    );
  }

  /* Days in the current month */
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const fullDate = date.toDateString();
    const dayOfWeek = date.getDay(); // 0 is Sunday, we want 7 for our calendar
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    calendarCells.push(
      <div
        key={day}
        className={`${styles.calendarCell} ${isToday ? styles.today : ""} ${
          isWeekend ? styles.weekend : ""
        }`}
        onClick={() => handleCellClick(day)}
        title={
          events[fullDate]?.map((e) => e.text).join(", ") || "Kein Ereignis"
        }
      >
        <div className={styles.dayInCell}>{day}</div>
        {events[fullDate] &&
          (events[fullDate].length <= 2 ? (
            events[fullDate].map((evt, idx) => (
              <div
                key={idx}
                className={styles.eventInCalendar}
                style={{ backgroundColor: evt.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(evt);
                  setShowDetailModal(true);
                }}
              >
                {evt.text}
              </div>
            ))
          ) : (
            <div className={styles.eventDotsContainer}>
              {events[fullDate].map((evt, idx) => (
                <div
                  key={idx}
                  className={styles.eventDot}
                  style={{ backgroundColor: evt.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(evt);
                    setShowDetailModal(true);
                  }}
                  title={evt.text}
                />
              ))}
            </div>
          ))}
      </div>
    );
  }

  /* Days in next month */
  const totalDisplayedCells = calendarCells.length;
  const nextMonthDaysToShow = (7 - (totalDisplayedCells % 7)) % 7;
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  /* Days in next month */
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    const date = new Date(nextMonthYear, nextMonth, i);
    const fullDate = date.toDateString();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    calendarCells.push(
      <div
        key={`next-${i}`}
        className={`${styles.calendarCell} ${styles.outsideMonth} ${
          isWeekend ? styles.weekend : ""
        }`}
      >
        <div className={styles.dayInCell}>{i}</div>

        {events[fullDate] &&
          (events[fullDate].length <= 2 ? (
            events[fullDate].map((evt, idx) => (
              <div
                key={idx}
                className={styles.eventInCalendar}
                style={{
                  backgroundColor: evt.color,
                  opacity: 0.5,
                }}
              >
                {evt.text}
              </div>
            ))
          ) : (
            <div className={styles.eventDotsContainer}>
              {events[fullDate].map((evt, idx) => (
                <div
                  key={idx}
                  className={styles.eventDot}
                  style={{
                    backgroundColor: evt.color,
                    opacity: 0.5,
                  }}
                  title={evt.text}
                />
              ))}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left side with events */}
      <div className={styles.calendarContent}>
        <div className={styles.eventListLeft}>
          <h2>Termine</h2>
          <div className={styles.eventFilter}>
            {["all", "exam", "lecture", "reminder", "study"].map((type) => (
              <button
                key={type}
                className={`${styles.filterButton} ${
                  activeFilter === type ? styles.active : ""
                }`}
                onClick={() => setActiveFilter(type)}
              >
                {type === "all"
                  ? "Alle"
                  : {
                      exam: "Prüfungen",
                      lecture: "Vorlesungen",
                      reminder: "Erinnerungen",
                      study: "Studium",
                    }[type]}
              </button>
            ))}
          </div>
          {Object.entries(events).length === 0 && (
            <p>Keine Termine vorhanden.</p>
          )}
          {Object.entries(events)
            .filter(
              ([date]) => new Date(date) >= new Date().setHours(0, 0, 0, 0)
            )
            .map(([date, items]) => {
              const filteredItems =
                activeFilter === "all"
                  ? items
                  : items.filter((evt) => evt.type === activeFilter);

              if (filteredItems.length === 0) return null;

              return (
                <div key={date}>
                  <h4 className={styles.eventName}>
                    {new Date(date).toLocaleDateString("de-DE")}
                  </h4>
                  {filteredItems.map((evt, idx) => (
                    <div
                      key={idx}
                      className={styles.eventItem}
                      style={{ background: evt.color }}
                      onClick={() => {
                        setSelectedEvent(evt);
                        setShowDetailModal(true);
                      }}
                    >
                      <div className={styles.eventContent}>
                        <p className={styles.eventName}>{evt.text}</p>
                        {evt.time && (
                          <div className={styles.eventTime}>{evt.time}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>

        {/* Right side with calendar */}
        <div className={styles.calendarRight}>
          <div className={styles.calendarHeader}>
            <button onClick={goToPrevMonth}>❮</button>
            <button onClick={goToNextMonth}>❯</button>
            <h2>
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={() => {
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
                setSelectedDate(today.getDate());
              }}
            >
              Heute
            </button>
          </div>

          <div className={styles.calendarContainer}>
            <div className={styles.calendarWrapper}>
              {daysOfWeek.map((day) => (
                <div key={day} className={styles.calendarDayNames}>
                  {day}
                </div>
              ))}
              {calendarCells}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Add Event */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <AddEventModal
            selectedDate={selectedDate}
            onClose={() => setShowAddModal(false)}
            onAddEvent={(data) => {
              handleAdd(data);
            }}
          />
        </Modal>
      )}

      {/* Detail Event */}
      {showDetailModal && (
        <Modal onClose={() => setShowDetailModal(false)}>
          <DetailEventModal
            event={selectedEvent}
            onClose={() => setShowDetailModal(false)}
            onDelete={(id) => handleDelete(id)}
          />
        </Modal>
      )}

      {/* Delete Event */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteEventModal
            onConfirm={() => handleDelete(eventToDelete.id)}
            onCancel={() => setShowDeleteModal(false)}
            onClose={() => setShowDeleteModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
