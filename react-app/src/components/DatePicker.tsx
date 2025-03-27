import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const DatePicker = ({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (datePickerRef) {
      window.addEventListener("click", (event) => {
        if (
          datePickerRef.current &&
          !datePickerRef.current.contains(event.target as Node)
        ) {
          setShowCalendar(false);
        }
      });
    }
  }, []);

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
    // Formats and updates the date state for the Devvit app to get the match details
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
    <div className="relative w-72 flex justify-end" ref={datePickerRef}>
      <motion.button
        className={`p-2 w-1/2  text-theme-white  shadow-md  focus:outline-none border border-theme-white rounded-full ml-auto hover:bg-theme-red/80 cursor-pointer transition-colors ease-in-out duration-75 ${
          showCalendar ? "bg-theme-red " : "bg-theme-blue"
        }`}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {selectedDate.toLocaleDateString()}
      </motion.button>

      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full z-50 right-0 top-10"
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

          <div className="mt-4 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#E31837] text-white rounded-full text-sm font-medium hover:bg-[#002D72] transition-colors"
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                const [month, date, year] = today
                  .toLocaleDateString()
                  .split("/") as string[];
                const formattedDate = `${year}-${month.padStart(
                  2,
                  "0"
                )}-${date.padStart(2, "0")}`;
                setDate(formattedDate);
                setShowCalendar(false);
              }}
            >
              Today
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DatePicker;
