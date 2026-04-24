import { useEffect, useState } from 'react'
import heatPumpIcon from '../assets/heatPumpIcon.png'
import eVehicleIcon from '../assets/eVehicle.png'
import './style/House.css'

function House({ houseNumber, shape, houseWidth, houseHeight, houseRotation, error, setError }) {
    // House data (used for icons in hoverbox)
    const [residents, setResidents] = useState(0)
    const [ev, setEv] = useState(0)
    const [heatPump, setHeatPump] = useState(false)
    const [sPanel, setSPanel] = useState(false)
    const [optedIn, setOptedIn] = useState(false)

    // Hoverbox info 
    const [curPowerGen, setCurPowerGen] = useState(0.0)
    const [curPowerCons, setCurPowerCons] = useState(0.0)
    const [curSavings, setCurSavings] = useState(0.0)
    const [totalPowerGen, setTotalPowerGen] = useState(0.0)
    const [totalPowerCons, setTotalPowerCons] = useState(0.0)
    const [totalSavings, setTotalSavings] = useState(0.0)

    const [showInfo, setShowInfo] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchHouseInfo = async () => {
        try {
            setLoading(true)
            /* fetch house data from backend, then set them below ∨∨∨

            const res = await fetch(`/api/house/${houseNumber}`)
            const data = await res.json()
            
            if (!res.ok) {
                setError(data.error)
                return
            } else {
                setResidents(data.people)
                setEv(data.ev)
                setHeatPump(data.heat_pump)
                setSPanel(data.solar_p)
                setOptedIn(data.opted)
            }
            */

            // mocked values for testing
            setResidents(12)
            setEv(2)
            setHeatPump(true)
            setSPanel(true)

            setOptedIn(false)
        } catch {
            setError('Connection error')
        } finally {
            setLoading(false)
        }
    }

    const handleInfoChange = async (clicked) => {
        try {
            setLoading(true)
            if (clicked) optedIn ? setOptedIn(false) : setOptedIn(true)
            /* fetch house data (powerGen, powerConsumption...) from backend, then set them below ∨∨∨

            const res = await fetch(`/api/day/house/${houseNumber}`)
            const data = await res.json()
            
            if (!res.ok) {
                setError(data.error)
                return
            } else {
                setCurPowerConsumption(data?.cur_power_cons)
                setCurSavings(data?.cur_savings)

                setTotalPowerConsumption(data?.total_power_cons)
                setTotalSavings(data?.total_savings)

                if (data?.solar_p || sPanel) {
                    setCurPowerGen(data?.cur_power_gen)
                    setTotalPowerGen(data?.total_power_gen)
                }
            }
            */

            // mocked values for testing
            setCurPowerCons(12.8)
            setCurSavings(3.4)

            setTotalPowerCons(112.8)
            setTotalSavings(13.4)

            // I think there might be a race condition where sPanel may not be set at this point on first render.
            // Might be better to use the fetched house data (data.solar_p) directly instead
            if (sPanel) {
                setCurPowerGen(5.2)
                setTotalPowerGen(10.2)
            }
        } catch {
            setError('Connection error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHouseInfo()
        handleInfoChange()
    }, [houseNumber])

    const polygonPoints = shape.points.map(p => p.join(",")).join(" ")

    return (
        <div
            className="house-icon"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            onClick={handleInfoChange}
            style={{
                position: 'absolute',
                width: `${houseWidth}px`,
                height: `${houseHeight}px`
            }}
        >
            {/* House SVG */}
            <svg viewBox={`0 0 ${houseWidth} ${houseHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{
                    transform: houseRotation,
                    width: `${houseWidth}px`,
                    height: `${houseHeight}px`
                }}
            >
                <polygon
                    points={polygonPoints}
                    fill={optedIn ? "#8bb4ff" : "#828282"}
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Solar panel */}
                {sPanel && (
                    <g transform={`translate(${shape.solarPosition.x} ${shape.solarPosition.y})`}>
                        <rect
                            x="0.75"
                            y="0.75"
                            width="22.5"
                            height="14.5"
                            rx="1.5"
                            ry="1.5"
                            fill="#90CAF9"
                            stroke="#1976D2"
                            strokeWidth="1.5"
                        />
                        <line x1="0.75" y1="5.5" x2="23.25" y2="5.5" stroke="#1976D2" strokeWidth="1.2" />
                        <line x1="0.75" y1="10.5" x2="23.25" y2="10.5" stroke="#1976D2" strokeWidth="1.2" />
                        <line x1="8" y1="0.75" x2="8" y2="15.25" stroke="#1976D2" strokeWidth="1.2" />
                        <line x1="16" y1="0.75" x2="16" y2="15.25" stroke="#1976D2" strokeWidth="1.2" />

                        <line x1="4.5" y1="19" x2="19.5" y2="19" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="9" y1="17.5" x2="7" y2="21.5" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="15" y1="17.5" x2="17" y2="21.5" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                )}
            </svg>

            {/* Infobox */}
            {showInfo && (
                loading ? (
                    <div>loading...</div>
                ) : (
                    <div className="house-tooltip">
                        <div className="stats-grid">
                            <div className="stat-column current">
                                <div className="stat-title">CURRENT</div>

                                {/* Only displays power production if house has solar panel */}
                                {sPanel && (
                                    <div className="stat-row">
                                        <span className="stat-label">Power Production</span>
                                        <span className="stat-value">
                                            <span className="num">{curPowerGen}</span>
                                            <span className="unit">kWh</span>
                                        </span>
                                    </div>
                                )}

                                <div className="stat-row">
                                    <span className="stat-label">Power Consumption</span>
                                    <span className="stat-value">
                                        <span className="num">{curPowerCons}</span>
                                        <span className="unit">kWh</span>
                                    </span>
                                </div>

                                <div className="stat-row">
                                    <span className="stat-label">Savings</span>
                                    <span className="stat-value">
                                        <span className="num">{curSavings}</span>
                                        <span className="unit">€</span>
                                    </span>
                                </div>
                            </div>

                            <div className="stat-column total">
                                <div className="stat-title">TOTAL</div>

                                {/* Only displays power production if house has solar panel */}
                                {sPanel && (
                                    <div className="stat-row">
                                        <span className="stat-label">Power Production</span>
                                        <span className="stat-value">
                                            <span className="num">{totalPowerGen}</span>
                                            <span className="unit">kWh</span>
                                        </span>
                                    </div>
                                )}

                                <div className="stat-row">
                                    <span className="stat-label">Power Consumption</span>
                                    <span className="stat-value">
                                        <span className="num">{totalPowerCons}</span>
                                        <span className="unit">kWh</span>
                                    </span>
                                </div>

                                <div className="stat-row">
                                    <span className="stat-label">Savings</span>
                                    <span className="stat-value">
                                        <span className="num">{totalSavings}</span>
                                        <span className="unit">€</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='icons-row'>
                            {/* Resident icon */}
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ position: "relative", overflow: "visible" }}
                            >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />

                                {/* Number of residents */}
                                <foreignObject x="12" y="12" width="14" height="14">
                                    <div className="person-count"
                                        style={{
                                            background: "#67768b",
                                            color: "#fff",
                                            borderRadius: "50%",
                                            width: "14px",
                                            height: "14px",
                                            fontSize: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 650,
                                        }}
                                    >
                                        {residents}
                                    </div>
                                </foreignObject>
                            </svg>

                            {/* Heat Pump icon */}
                            {heatPump && (<img className='small-icon' src={heatPumpIcon}></img>)}

                            {/* Electric Vehicle(s) icon */}
                            {[...Array(ev)].map((_, i) => (
                                <img key={i} className='small-icon' src={eVehicleIcon}></img>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default House