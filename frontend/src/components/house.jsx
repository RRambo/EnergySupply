import { useEffect, useState, useRef } from 'react'
import heatPumpIcon from '../assets/heatPumpIcon.png'
import eVehicleIcon from '../assets/eVehicle.png'
import './style/House.css'

function House({
    houseNumber,
    shape,

    householdData,
    householdPowerData
}) {
    const [showInfo, setShowInfo] = useState(false)
    const infoboxRef = useRef(null)

    const checkInfoboxLocation = () => {
        // Flips the location of the house infobox relative to the house, if it appears too close to the edge of the viewport 
        if (!showInfo || !infoboxRef.current) return

        const tooltip = infoboxRef.current
        tooltip.classList.remove('flip-x', 'flip-y', 'no-flip')

        requestAnimationFrame(() => {
            const rect = tooltip.getBoundingClientRect()

            // Horizontal overflow
            if (rect.right > window.innerWidth - 5) {
                tooltip.classList.add('flip-x')
            } else if (rect.left < 0) {
                tooltip.classList.add('flip-x')
            } else {
                tooltip.classList.add('no-flip')
            }

            // Vertical overflow
            if (rect.top < 100) {
                tooltip.classList.add('flip-y')
            } else if (rect.bottom > window.innerHeight - 5) {
                tooltip.classList.add('flip-y')
            } else {
                tooltip.classList.add('no-flip')
            }
        })
    }

    useEffect(() => {
        checkInfoboxLocation()
    }, [showInfo])

    const polygonPoints = shape.points.map(p => p.join(',')).join(' ')

    return (
        <div
            className='house-icon'
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
        >
            {/* House SVG */}
            <svg
                viewBox={`0 0 ${shape.width + 4} ${shape.height + 4}`}
                style={{ transform: `rotate(${shape.rotation}deg)` }}
            >
                {/* Drop shadow */}
                <polygon
                    points={polygonPoints}
                    fill='rgba(0,0,0,0.25)'
                    transform='translate(4,4)'
                />

                <polygon
                    points={polygonPoints}
                    fill={householdData.opted ? '#828282' : '#D9D9D9'}
                />

                {/* Solar panel */}
                {householdData.solar_p && (
                    <g transform={`translate(${shape.solarPosition.x} ${shape.solarPosition.y}) scale(${1.8})`}>
                        <rect
                            x='0.75'
                            y='0.75'
                            width='22.5'
                            height='14.5'
                            rx='1.5'
                            ry='1.5'
                            fill='#90CAF9'
                            stroke='#1976D2'
                            strokeWidth='1.5'
                        />
                        <line x1='0.75' y1='5.5' x2='23.25' y2='5.5' stroke='#1976D2' strokeWidth='1.2' />
                        <line x1='0.75' y1='10.5' x2='23.25' y2='10.5' stroke='#1976D2' strokeWidth='1.2' />
                        <line x1='8' y1='0.75' x2='8' y2='15.25' stroke='#1976D2' strokeWidth='1.2' />
                        <line x1='16' y1='0.75' x2='16' y2='15.25' stroke='#1976D2' strokeWidth='1.2' />
                        <line x1='4.5' y1='19' x2='19.5' y2='19' stroke='#424242' strokeWidth='1.5' strokeLinecap='round' />
                        <line x1='9' y1='17.5' x2='7' y2='21.5' stroke='#424242' strokeWidth='1.5' strokeLinecap='round' />
                        <line x1='15' y1='17.5' x2='17' y2='21.5' stroke='#424242' strokeWidth='1.5' strokeLinecap='round' />
                    </g>
                )}
            </svg>

            {/* Infobox */}
            {showInfo && (
                <div className='house-tooltip' ref={infoboxRef}>
                    <div className='stats-grid'>
                        <div className='stat-column current'>
                            <div className='stat-title'>CURRENT</div>

                            {/* Only displays power production if house has solar panel */}
                            {householdData.solar_p && (
                                <div className='stat-row'>
                                    <span className='stat-label'>Power Production</span>
                                    <span className='stat-value'>
                                        <span className='num'>{householdPowerData.cur_power_gen}</span>
                                        <span className='unit'>kWh</span>
                                    </span>
                                </div>
                            )}

                            <div className='stat-row'>
                                <span className='stat-label'>Power Consumption</span>
                                <span className='stat-value'>
                                    <span className='num'>{householdPowerData.cur_power_cons}</span>
                                    <span className='unit'>kWh</span>
                                </span>
                            </div>

                            {householdData.solar_p
                                ? (
                                    <div className='stat-row'>
                                        <span className='stat-label'>Gains</span>
                                        <span className='stat-value'>
                                            <span className='num'>{householdPowerData.cur_gains}</span>
                                            <span className='unit'>€</span>
                                        </span>
                                    </div>
                                )
                                : (
                                    <div className='stat-row'>
                                        <span className='stat-label'>Savings</span>
                                        <span className='stat-value'>
                                            <span className='num'>{householdPowerData.cur_savings}</span>
                                            <span className='unit'>€</span>
                                        </span>
                                    </div>
                                )
                            }
                        </div>

                        <div className='stat-column total'>
                            <div className='stat-title'>TOTAL FOR THE DAY</div>

                            {/* Only displays power production if house has solar panel */}
                            {householdData.solar_p && (
                                <div className='stat-row'>
                                    <span className='stat-label'>Power Production</span>
                                    <span className='stat-value'>
                                        <span className='num'>{householdPowerData.total_power_gen}</span>
                                        <span className='unit'>kWh</span>
                                    </span>
                                </div>
                            )}

                            <div className='stat-row'>
                                <span className='stat-label'>Power Consumption</span>
                                <span className='stat-value'>
                                    <span className='num'>{householdPowerData.total_power_cons}</span>
                                    <span className='unit'>kWh</span>
                                </span>
                            </div>

                            {householdData.solar_p
                                ? (
                                    <div className='stat-row'>
                                        <span className='stat-label'>Gains</span>
                                        <span className='stat-value'>
                                            <span className='num'>{householdPowerData.total_gains}</span>
                                            <span className='unit'>€</span>
                                        </span>
                                    </div>

                                )
                                : (
                                    <div className='stat-row'>
                                        <span className='stat-label'>Savings</span>
                                        <span className='stat-value'>
                                            <span className='num'>{householdPowerData.total_savings}</span>
                                            <span className='unit'>€</span>
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className='icons-row'>
                        {/* Resident icon */}
                        {householdData.people > 1
                            ? (
                                <svg
                                    width='30'
                                    height='30'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='#000'
                                    strokeWidth='1.8'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    style={{ position: 'relative', overflow: 'visible', marginRight: '2px' }}
                                >
                                    <circle cx='12' cy='8' r='4' />
                                    <path d='M4 20c0-4 4-6 8-6s8 2 8 6' />

                                    {/* Number of residents */}
                                    <foreignObject x='12' y='12' width='14' height='14'>
                                        <div className='icon-count person-count'>
                                            {householdData.people}
                                        </div>
                                    </foreignObject>
                                </svg>
                            )
                            : (
                                <svg
                                    width='26'
                                    height='26'
                                    viewBox='0 2 21 21'
                                    fill='none'
                                    stroke='#000'
                                    strokeWidth='1.6'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <circle cx='10' cy='8' r='4' />
                                    <path d='M2 20c0-4 4-6 8-6s8 2 8 6' />
                                </svg>
                            )}

                        {/* Heat Pump icon */}
                        {householdData.heat_pump && (<img className='small-icon' src={heatPumpIcon}></img>)}

                        {/* Electric Vehicle icon */}
                        {householdData.ev > 0 && (
                            <div style={{ position: 'relative', display: 'flex' }}>
                                <img className='small-icon' src={eVehicleIcon}
                                    style={{ marginLeft: householdData.heat_pump ? 0 : '4px' }}>
                                </img>
                                {/* Number of electric vehicles */}
                                {householdData.ev > 1 && (
                                    <div className='icon-count ev-count' style={{
                                        position: 'absolute',
                                        top: '11px',
                                        left: '17px'
                                    }}>
                                        {householdData.ev}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default House