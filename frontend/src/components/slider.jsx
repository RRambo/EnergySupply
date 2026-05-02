import { useState } from "react";
import "./style/slider.css";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(dayOfYear);

const Slider = ({ value, onChange }) => {
  const percentage = ((value - 1) / (365 - 1)) * 100;

  const dateLabel = dayjs().year(2023).dayOfYear(value).format("DD. MMMM");

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (onChange) onChange(value); // gibt den tag an app.jsx weiter
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="1"
        max="365"
        value={value}
        onChange={handleChange}
        className="year-input"
        style={{ "--range-progress": `${percentage}%` }}
      />
      <div className="slider-label">
        <strong>{dateLabel}</strong>
      </div>
    </div>
  );
};

export default Slider;
