import { useState, useEffect } from "react";

const usePanelDetails = () => {
  const [panelDetails, setPanelDetails] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/panel-details")
      .then((res) => res.json())
      .then((data) => {
        setPanelDetails(data);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  return panelDetails;
};

export default usePanelDetails;
