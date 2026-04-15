
import { useState } from 'react'
import './App.css'
import HouseCard from './components/house'
import backGround from './assets/backGround.png';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='base-shell' style={{ backgroundImage: `url(${backGround})` }}>
        <HouseCard
          residents={2}
          hasEVehicle={true}
          hasHeatPump={true}
          hasSolarPanel={true}
          optedIn={true}
        />

        <HouseCard
          residents={1}
          hasEVehicle={false}
          hasHeatPump={false}
          hasSolarPanel={false}
          optedIn={false}
        />
      </div>
    </>
  )
}

export default App
