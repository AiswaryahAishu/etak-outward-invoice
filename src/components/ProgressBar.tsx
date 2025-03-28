import React from "react";
import "../progressbar.css";

interface Step {
  label: string;
  color: string;
  active: boolean;
}

interface ProgressBarProps {
  steps: Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps = [] }) => {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <svg
          key={index}
          width="80"
          height="40"
          viewBox="0 0 120 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="0,0 100,0 120,25 100,50 0,50 20,25"
            fill={step.color}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="14"
            fill="white"
            fontWeight="bold"
          >
            {step.label}
          </text>
        </svg>
      ))}
      <span className="status">Submission Pending</span>
    </div>
  );
};

export default ProgressBar;
