import { use, useState } from "react";
import "./App.css";
import Neighborhood from "./components/Neighborhood";
import backGround from "./assets/backGround.png";
import Panel from "./components/panel";
import Slider from "./components/slider";
import Calendar from "./components/calender";
import dayjs from "dayjs";
import usePanelDetails from "./Fetch";

function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const panelDetails = usePanelDetails();
  const dayData = panelDetails.find((d) => d.day === currentDay) || {};
  const activeData = dayData && dayData.panel ? dayData.panel : {};

  return (
    <div className="main-wrapper">
      {console.log(activeData)}
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
            <div
              style={{
                /* in order to have the values on the right side, and the variable names on the left*/
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Total Generation</span>
              <span>{activeData.total_generation} kWh</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Total Consumption</span>
              <span>{activeData.total_consumption} kWh</span>
            </div>
            <hr></hr>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <b>Net Flow</b>
              <b>{activeData.net_flow} kWh</b>
            </div>
          </Panel>
          <Panel width="80%" height="auto">
            <h3>Current Price</h3>
            <h3>{(activeData.current_price * 100).toFixed(0)} ct/kWh</h3>
          </Panel>
          <Panel width="80%" height="auto">
            <h3>Grid Average (Last Year)</h3>
            <h3>{activeData.average_price * 100} ct/kWh</h3>
          </Panel>
          <Panel width="80%" height="auto">
            <h3>Provider Average (Last Year)</h3>
            <h3>40 ct/kWh</h3>
          </Panel>
        </aside>

        <main className="neighborhood-container">
          <Neighborhood currentDay={currentDay} />
        </main>
        <details>
          <summary>Calendar</summary>
          <Calendar value={currentDay} onChange={setCurrentDay} />
        </details>
      </div>
      <Slider value={currentDay} onChange={setCurrentDay}></Slider>
    </div>
  );
}

export default App;
