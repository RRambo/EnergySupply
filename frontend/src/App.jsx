import { useState } from "react";
import "./App.css";
import Neighborhood from "./components/Neighborhood";
import backGround from "./assets/backGround.png";
import Panel from "./components/panel";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="main-wrapper">
      <Panel height="100px" width="100%">
        <div className="header-inner">
          <h2 style={{ margin: 0 }}>Neighborhood Energy Simulation</h2>
          <h6 style={{ margin: 0, opacity: 0.7 }}>
            Monitoring and simulation dashboard
          </h6>
        </div>
      </Panel>
      <div className="app-container">
        <aside className="sidebar">
          <Panel width="200px" height="200px">
            <h3>Mini Panel</h3>
          </Panel>
        </aside>

        <main
          className="base-shell"
          style={{ backgroundImage: `url(${backGround})` }}
        >
          <Neighborhood />
        </main>
      </div>
    </div>
  );
}

export default App;
