import { useEffect, useState } from 'react'
import './house.css'
import heatPumpIcon from '../assets/heatPumpIcon.png'
import eVehicleIcon from '../assets/eVehicle.png'

function HouseCard({ residents, hasEVehicle, hasHeatPump, hasSolarPanel, optedIn }) {
    const [powerGen, setPowerGen] = useState(0.0)
    const [powerConsumption, setPowerConsumption] = useState(0.0)
    const [savings, setSavings] = useState(0.0)
    const [error, setError] = useState('')
    const [showInfo, setShowInfo] = useState(false)

    const handleInfoChange = async () => {
        try {
            // fetch house data (powerGen, powerConsumption) from backend, then set them below
            // setPowerGen()
            // setPowerConsumption()
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        handleInfoChange()
    }, [])


    return (
        <div className="house-container">
            <div
                className="house-icon"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
            >
                {/* House SVG */}
                <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
                    <rect x="16" y="28" width="32" height="20" fill="#828282" stroke="#000000" strokeWidth="2" />
                    <polygon points="32,12 12,28 52,28" fill="#828282" />

                    {/* Solar panel */}
                    {hasSolarPanel && (
                        <svg x="20" y="18" width="24" height="12" viewBox="0 0 24 12" fill="none"
                            stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="1" width="22" height="10" fill="#90caf9" />
                            <line x1="1" y1="4" x2="23" y2="4" />
                            <line x1="1" y1="8" x2="23" y2="8" />
                            <line x1="8" y1="1" x2="8" y2="11" />
                            <line x1="16" y1="1" x2="16" y2="11" />
                        </svg>
                    )}
                    <rect x="28" y="38" width="8" height="10" fill="#fff" stroke="#000000" strokeWidth="1.5" />
                </svg>

                {showInfo && (
                    <div className="house-tooltip">
                        <div>Power Consumption: {powerConsumption} kWh</div>
                        <div>Power Production: {powerGen} kWh</div>
                        <div>Savings: {savings} €</div>

                        <div className="icons-row">
                            {/* Residents */}
                            {[...Array(residents)].map((_, i) => (
                                <svg key={i} width="30" height="30" viewBox="0 0 24 24" fill="none"
                                    stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                </svg>
                            ))}

                            {/* Heat Pump */}
                            {hasHeatPump && (<img className='small-icon' src={heatPumpIcon}></img>)}

                            {/* Electric Vehicle */}
                            {hasEVehicle && (<img className='small-icon' src={eVehicleIcon}></img>)}
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="card-error">{error}</p>}
        </div>
    )
}

export default HouseCard