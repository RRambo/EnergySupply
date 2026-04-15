
import { useState } from 'react'
import './App.css'
import HouseCard from './components/house'
import backGround from './assets/backGround.png';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='base-shell' style={{ backgroundImage: `url(${backGround})` }}>
        <HouseCard />
      </div>
    </>
  )
}

export default App
