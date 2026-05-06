import { useState, useEffect } from "react";

const useYearSimulation = (initialDay = 1, maxDays = 365, speed = 500) => {
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentDay((prev) => {
          if (prev >= maxDays) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }

    return () => clearInterval(interval);
  }, [isPlaying, maxDays, speed]);

  const toggleSimulation = () => setIsPlaying(!isPlaying);
  const stopSimulation = () => setIsPlaying(false);

  return {
    currentDay,
    setCurrentDay,
    isPlaying,
    toggleSimulation,
    stopSimulation,
  };
};

export default useYearSimulation;
