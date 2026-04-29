import { useState } from 'react'
import House from './House'

import { houseShapes } from './houseShapeHelper'
import './style/Neighborhood.css'

function Neighborhood() {
    const [error, setError] = useState('')

    return (
        <>
            {Object.entries(houseShapes).map(([id, shape]) => {
                const left = shape.positionPercent.x
                const top = shape.positionPercent.y

                return (
                    <div key={id}
                        style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            pointerEvents: 'auto',
                            opacity: 1 // Helpful for getting the positions and shapes correct
                        }}
                    >
                        <House
                            houseNumber={id}
                            shape={shape}
                            houseWidth={shape.width}
                            houseHeight={shape.height}
                            houseRotation={`rotate(${shape.rotation}deg)`}
                            error={error}
                            setError={setError}
                        />
                    </div>
                )
            })}
            <div className='road'>
                {/* road made with: https://editsvgcode.com/ */}
                <svg viewBox='0 0 800 390' fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="1">
                        <rect x="3" y="324.167" width="793.489" height="28.6948" rx="14.3474" transform="rotate(2.31639 1.15973 273.167)" fill="#d4d4d4" />
                        <rect x="222.055" y="19.3645" width="502.935" height="30.8319" rx="15.4159" transform="rotate(-2.2066 222.055 19.3645)" fill="#d4d4d4" />
                        <rect x="162.701" y="299.665" width="331.793" height="32.4859" rx="16.243" transform="rotate(-87.9809 212.701 299.665)" fill="#d4d4d4" />
                        <rect x="519.72" y="315.212" width="346.968" height="34.0875" rx="17.0438" transform="rotate(-90.8936 559.72 325.212)" fill="#d4d4d4" />
                    </g>
                </svg>
            </div>
            {/* Errors generated in house components are displayed here */}
            {error && <p className="card-error">{error}</p>}
        </>
    )
}

export default Neighborhood