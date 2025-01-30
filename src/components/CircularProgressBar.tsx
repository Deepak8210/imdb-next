"use client";
import React, { useState, useEffect } from "react";
import "./styles/custom.css";

const CircularProgressBar = ({
  percentage,
  size = 90,
  strokeWidth = 8,
  stroke = "#FF0000",
}: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={
            percentage >= 70
              ? "#008000"
              : percentage >= 50
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
        {percentage / 10}
      </div>
    </div>
  );
};

export default CircularProgressBar;
