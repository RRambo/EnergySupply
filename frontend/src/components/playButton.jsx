import React from "react";
import "./style/playButton.css";

const PlayButton = ({ isPlaying, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {" "}
      {isPlaying ? "⏸" : "▶"}{" "}
    </button>
  );
};
export default PlayButton;
