import { useState } from "react";
import "./App.css";
import Neighborhood from "./components/Neighborhood";
import backGround from "./assets/backGround.png";
import Panel from "./components/panel";
import Slider from "./components/slider";
import Calendar from "./components/calender";
import dayjs from "dayjs";
import usePanelDetails from "./Fetch";
import { use } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const [currentDay, setCurrentDay] = useState(1);
  const panelDetails = usePanelDetails();
  const dayData = panelDetails.find((d) => d.day === currentDay) || {};
  const activeData = dayData && dayData.panel ? dayData.panel : {};

  return (
    <div className="main-wrapper">
      <p>{console.log(activeData)}</p>
      <Panel height="100px" width="80%">
        <div className="header-inner">
          <h2 style={{ margin: 0 }}>Neighborhood Energy Simulation</h2>
          <h4 style={{ margin: 0, opacity: 0.6 }}>
            Monitoring and simulation dashboard
          </h4>
        </div>
      </Panel>
      <div className="app-container">
        <aside className="sidebar">
          <Panel width="100%" height="auto">
            <h3>Neighborhood Summary</h3>
            <p>Total Generation {activeData.total_generation}</p>
            <p>Total Consumption {activeData.total_consumption}</p>
            <hr></hr>
            <b>Net Flow {activeData.net_flow}</b>
          </Panel>
          <Panel width="80%" height="auto">
            <h3>Current Price</h3>
            <h3>{activeData.current_price} €/kWh</h3>
          </Panel>
          <Panel width="80%" height="auto">
            <h3>Average (Last Year)</h3>
            <h3>{activeData.average_price} €/kWh</h3>
          </Panel>
          <details>
            <summary>Calender</summary>
            <Calendar value={currentDay} onChange={setCurrentDay} />
          </details>
        </aside>

          <main className="neighborhood-container">
            <Neighborhood />
          </main>
      </div>
      <Slider value={currentDay} onChange={setCurrentDay}></Slider>
    </div>
  );
}

export default App;
