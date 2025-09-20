import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-wide text-gray-900 dark:text-white">
          Digital Clock
        </h2>

        {/* Time Display */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg border-2 sm:border-4 border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl md:text-7xl font-mono font-bold text-orange-500 dark:text-orange-400 drop-shadow-lg break-words">
            {formattedTime}
          </div>
        </div>

        {/* Date */}
        <p className="text-base sm:text-lg md:text-xl font-light text-gray-600 dark:text-gray-300">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default DigitalClock;
