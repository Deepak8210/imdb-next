"use client";
import "./styles/custom.css";

const CircularProgressBar = ({
  percentage,
  size = 90,
  strokeWidth = 8,
  stroke = "#FF0000",
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  stroke?: string;
}) => {
  // Validate the percentage value
  const safePercentage = isNaN(percentage) ? 0 : percentage;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safePercentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          // stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={
            safePercentage >= 70
              ? "#008000"
              : safePercentage >= 50
              ? "#FFA500"
              : "#FF0000"
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {/* Percentage Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "24px",
          color: "#808080",
        }}
        className="font-semibold"
      >
        {safePercentage / 10} {/* Display the safe percentage */}
      </div>
    </div>
  );
};

export default CircularProgressBar;
