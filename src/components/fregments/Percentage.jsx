import React from "react";

const CircularProgressBar = ({ percentage }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;
  return (
    <div className="flex items-center justify-center">
      <svg
        width="80"
        height="80"
        viewBox="0 0 120 120"
        className="transform -rotate-90"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#D3D3D3"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#000000"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        <span className="text-xl font-bold text-black">{percentage}%</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
