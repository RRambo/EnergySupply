import { useState } from "react";
import "./App.css";
import Neighborhood from "./components/Neighborhood";
import backGround from "./assets/backGround.png";
import Panel from "./components/panel";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="main-wrapper">
      <Panel height="100px" width="80%">
        <div className="header-inner">
          <h2 style={{ margin: 0 }}>Neighborhood Energy Simulation</h2>
          <h4 style={{ margin: 0, opacity: 0.7 }}>
            Monitoring and simulation dashboard
          </h4>
        </div>
      </Panel>
      <div className="app-container">
        <aside className="sidebar">
          <Panel width="100%" height="20%">
            <h3>Neighborhood Summary</h3>
          </Panel>
        </aside>

        <main className="base-shell">
          <div className="neighborhood-container">
            <Neighborhood />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
