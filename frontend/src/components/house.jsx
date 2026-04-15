import { useEffect, useState } from 'react'
import './house.css'

function HouseCard() {
    const [powerGen, setPowerGen] = useState(0.0)
    const [powerConsumption, setPowerConsumption] = useState(0.0)
    const [residents, setResidents] = useState(0)
    const [optIn, setOptIn] = useState(false)
    const [savings, setSavings] = useState(0.0)
    const [error, setError] = useState('')
    const [showInfo, setShowInfo] = useState(false)

    const handleInfoChange = async () => {
        try {
            // fetch house data from backend here
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
                {/* Simple SVG house icon */}
                <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="16" y="28" width="32" height="20" fill="#90caf9" stroke="#1976d2" strokeWidth="2" />
                    <polygon points="32,12 12,28 52,28" fill="#1976d2" />
                    <rect x="28" y="38" width="8" height="10" fill="#fff" stroke="#1976d2" strokeWidth="1.5" />
                </svg>
                {showInfo && (
                    <div className="house-tooltip">
                        <div>Power Consumption: {powerConsumption} kWh</div>
                        <div>Power Production: {powerGen} kWh</div>
                        <div>Savings: {savings} €</div>
                    </div>
                )}
            </div>
            {error && <p className="card-error">{error}</p>}
        </div>
    )
}

export default HouseCard