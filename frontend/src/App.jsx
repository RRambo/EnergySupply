import { useState } from "react";
import "./App.css";
import Neighborhood from "./components/Neighborhood";
import backGround from "./assets/backGround.png";
import Panel from "./components/panel";
import Slider from "./components/slider";
import Calendar from "./components/calender";
import dayjs from "dayjs";

function App() {
  // const [count, setCount] = useState(0)
  const [currentDay, setCurrentDay] = useState(1);

  return (
    <div className="main-wrapper">
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
            <h2>Neighborhood Summary</h2>
            <p>Total Generation</p>
            <p>Total Consumption</p>
            <hr></hr>
            <b>Net Flow</b>
          </Panel>
          <Panel width="80%" height="auto">
            <h2>Current Price</h2>
            <h2>0.20 €/kWh</h2>
          </Panel>
          <Panel width="80%" height="auto">
            <h2>Average (Last Year)</h2>
            <h2>0.29 €/kWh</h2>
          </Panel>
          <details>
            <summary>Calender</summary>
            <Calendar value={currentDay} onChange={setCurrentDay} />
          </details>
        </aside>

        <main className="base-shell">
          <div className="neighborhood-container">
            <Neighborhood />
          </div>
        </main>
      </div>
      <Slider value={currentDay} onChange={setCurrentDay}></Slider>
    </div>
  );
}

export default App;
