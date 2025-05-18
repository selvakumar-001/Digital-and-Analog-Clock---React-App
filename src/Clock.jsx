import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const radius = 125; // Set radius for correct positioning
  const hours = ((time.getHours() % 12) + time.getMinutes() / 60) * 30;
  const minutes = time.getMinutes() * 6;
  const seconds = time.getSeconds() * 6;
  const paddZero = (number) => {
    return (number < 10 ? "0" : "") + number;
  };
  function handleTimeFormat() {
    let hour = time.getHours();
    const minute = time.getMinutes();
    const seconds = time.getSeconds();
    const meridium = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${paddZero(hour)}:${paddZero(minute)}:${paddZero(seconds)} ${paddZero(meridium)}`;
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
        
      {/* Clock Container */}
      <div className="relative w-80 h-80 bg-white border-4 border-white  shadow-[inset_2px_3px_8px_0_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center">
        {/* Dynamically Position Numbers in a Circle */}
        {numbers.map((num, index) => {
          const angle = index * 30 - 90; // 30° apart, starts from 12 o'clock
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <span
              key={num}
              className="absolute text-xl font-bold"
              style={{
                left: `calc(50% + ${x}px)`, // Moves from center
                top: `calc(50% + ${y}px)`, // Moves from center
                transform: "translate(-50%, -50%)", // Centers the text correctly
              }}
            >
              {num}
            </span>
          );
        })}
        {/* Hour Hand */}
        <div
          className="absolute w-1.5 h-24 m-auto -mt-38 bg-black origin-bottom translate-y-6 "
          style={{ transform: `rotate(${hours}deg)` }}
        ></div>

        {/* Minute Hand */}
        <div
          className="absolute w-1 h-28 m-auto -mt-48 bg-black origin-bottom translate-y-10 "
          style={{ transform: `rotate(${minutes}deg)` }}
        ></div>

        {/* Second Hand */}
        <div
          className="absolute w-0.5 h-29 m-auto -mt-58 bg-red-500 origin-bottom translate-y-15 rounded-lg"
          style={{ transform: `rotate(${seconds}deg)` }}
        ></div>

        {/* Center Dot */}
        <div className="absolute w-3.5 h-3.5 bg-white border-2 border-black rounded-full"></div>
        <h1 className=" inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-insetbg-gray-300 p-1.5 text-xs -mr-28 -mb-3 border rounded">{handleTimeFormat()}</h1>
      </div>
    </div>
  );
};

export default Clock;
