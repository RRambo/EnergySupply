import React, { useEffect, useState } from 'react'
import House from './House'

import { houseShapes } from './houseShapeHelper'
import './style/Neighborhood.css'

function Neighborhood() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [householdData, setHouseholdData] = useState([])
    const [householdPowerData, setHouseholdPowerData] = useState([])

    const fetchHouseInfo = async () => {
        try {
            // fetch household data from backend
            /*
            const res = await fetch(`/endpoint`)
            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                return
            } else {
                setHouseData(data)
            }
            */
            
            // mocked values for testing (only has first 2 houses)
            const data = [
                {
                    id: '1',
                    solar_p: true,
                    people: 1,
                    heat_pump: true,
                    ev: 0,
                    opted: true
                },
                {
                    id: '3',
                    solar_p: false,
                    people: 2,
                    heat_pump: false,
                    ev: 1,
                    opted: false
                }
            ]
            setHouseholdData(data)
        } catch {
            setError('Connection error')
        } finally {
            setLoading(false)
        }
    }

    const handleInfoChange = async () => {
        try {
            // fetch household data from backend
            /*
            const res = await fetch(`/endpoint`)
            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                return
            } else {
                setDayPowerData(data)
            }
            */

            // mocked values for testing (only has first 2 houses)
            const data = [
                {
                    id: '1',
                    cur_power_gen: 0.0,
                    cur_power_cons: 1.0,
                    cur_savings: 6.0,
                    cur_gains: 6.0,
                    total_power_gen: 0.0,
                    total_power_cons: 0.0,
                    total_savings: 10.0,
                    total_gains: 64.0,
                    total_power_gen: 0.0
                },
                {
                    id: '3',
                    cur_power_gen: 0.0,
                    cur_power_cons: 1.0,
                    cur_savings: 6.0,
                    cur_gains: 6.0,
                    total_power_gen: 0.0,
                    total_power_cons: 0.0,
                    total_savings: 10.0,
                    total_gains: 64.0,
                    total_power_gen: 0.0
                }
            ]
            setHouseholdPowerData(data)
        } catch {
            setError('Connection error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setError('')
        setLoading(true)
        fetchHouseInfo()
        handleInfoChange()
    }, [])

    return (
        <>
            {!loading && Object.entries(houseShapes).map(([id, shape]) => {
                let singleHouseholdData = householdData.find((e) => e.id === id)                
                let singleHouseholdPowerData = householdPowerData.find((e) => e.id === id)

                if (!singleHouseholdData) {
                    // ∨∨∨ mocked values for testing
                    singleHouseholdData = {
                        id: id,
                        solar_p: true,
                        people: 12,
                        heat_pump: true,
                        ev: 2,
                        opted: false
                    }
                }

                if (!singleHouseholdPowerData) {
                    // ∨∨∨ mocked values for testing
                    singleHouseholdPowerData = {
                        id: id,
                        cur_power_gen: 12.8,
                        cur_power_cons: 12.8,
                        cur_savings: 3.4,
                        cur_gains: 3.4,
                        total_power_gen: 12.8,
                        total_power_cons: 112.8,
                        total_savings: 13.4,
                        total_gains: 13.4
                    }
                }

                const left = shape.positionPercent.x
                const top = shape.positionPercent.y

                return (
                    <div key={id}
                        style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            pointerEvents: 'auto',
                            opacity: 1 // Helpful for getting the house positions and shapes correct
                        }}
                    >
                        <House
                            houseNumber={id}
                            shape={shape}
                            houseWidth={shape.width}
                            houseHeight={shape.height}
                            houseRotation={`rotate(${shape.rotation}deg)`}

                            householdData={singleHouseholdData}
                            householdPowerData={singleHouseholdPowerData}
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
            {error && <p className="card-error">{error}</p>}
        </>
    )
}

export default Neighborhood