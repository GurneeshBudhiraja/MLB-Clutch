import { motion } from "framer-motion";
import React, { useState } from "react";

const DatePicker = ({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    setDate(newDate.toISOString().split("T")[0]);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const changeMonth = (increment: number) => {
    setSelectedDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + increment,
        1
      )
    );
  };

  return (
    <div className="relative w-72">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-2 text-white bg-[#002D72] rounded-lg shadow-md hover:bg-[#003087] focus:outline-none"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {selectedDate.toLocaleDateString()}
      </motion.button>

      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#E31837] hover:text-[#002D72]"
              onClick={() => changeMonth(-1)}
            >
              &#8249;
            </motion.button>
            <span className="font-semibold text-[#002D72]">
              {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-[#E31837] hover:text-[#002D72]"
              onClick={() => changeMonth(1)}
            >
              &#8250;
            </motion.button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-[#002D72]"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isSelected =
                day === selectedDate.getDate() &&
                selectedDate.getMonth() === new Date().getMonth() &&
                selectedDate.getFullYear() === new Date().getFullYear();

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    p-2 rounded-full text-sm
                    ${
                      isSelected
                        ? "bg-[#E31837] text-white"
                        : "hover:bg-[#002D72] hover:text-white text-gray-700"
                    }
                  `}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DatePicker;
