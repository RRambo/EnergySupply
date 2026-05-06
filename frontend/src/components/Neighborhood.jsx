import React, { useEffect, useState } from 'react'
import House from './House'
import { houseShapes } from './houseShapeHelper'
import './style/Neighborhood.css'

function Neighborhood({ currentDay }) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [householdData, setHouseholdData] = useState([])
    const [householdPowerData, setHouseholdPowerData] = useState([])
    const [currentHouseholdPowerData, setCurrentHouseholdPowerData] = useState([])

    const fetchHouseInfo = async () => {
        // Gets the household details of all the houses once on page load
        try {
            const res = await fetch('/houses')

            if (res.ok) {
                const data = await res.json()
                setHouseholdData(data)
                return data
            } else {
                const data = await res.json()
                setError(data.error)
                console.error('Failed to fetch household data')
                return null
            }
        } catch {
            setError('Connection error')
            return null
        }
    }

    const fetchHousePowerDetails = async () => {
        // Gets the powerdetails of all the days and all opted in houses once on page load
        try {
            const res = await fetch('/houses-details')
            const data = await res.json()

            if (res.ok) {
                setHouseholdPowerData(data)
                return data
            } else {
                setError(data.error)
                console.error('Failed to fetch household power related data')
                return null
            }
        } catch {
            setError('Connection error')
            return null
        }
    }

    const fetchSavingsGains = async () => {
        try {
            const res = await fetch('/savings-gains')
            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                console.error('Failed to fetch savings/gains')
                return null
            }
            return data
        } catch {
            setError('Connection error')
            return null
        }
    }

    const mergeDaySavings = (currentDayData, savingsDayData) => {
        if (!currentDayData) {
            return savingsDayData
        }
        if (!savingsDayData) {
            return currentDayData
        }

        const mergedHouses = {
            ...currentDayData.houses,
            ...Object.fromEntries(
                Object.entries(savingsDayData.houses || {}).map(([houseId, savingsGains]) => [
                    houseId,
                    {
                        ...currentDayData.houses?.[houseId],
                        ...savingsGains,
                    },
                ])
            ),
        }

        return {
            ...currentDayData,
            houses: mergedHouses,
        }
    }

    const getCurrentDaySavings = (data = []) => {
        return data.find((e) => e.day === currentDay) || null
    }

    const handleDayChange = (data = householdPowerData) => {
        // Finds data for a specific day from the originally fetched data
        if (data && data.length > 0) {
            const newDayData = data.find((e) => e.day == currentDay)
            setCurrentHouseholdPowerData(newDayData)
        }
    }

    const handleOpting = async (reqBody) => {
        try {
            const res = await fetch('/update-grid', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody)
            })

            if (res.ok) {
                await updatePowerData()
            } else {
                const data = await res.json()
                setError(data.error)
                console.error('Failed to update household grid opting')
                return null
            }
        } catch {
            setError('Connection error')
            return null
        }
    }

    const updatePowerData = async () => {
        setError('')
        setLoading(true)
        // ∨∨∨ Reloads all powerdata after a house has opted in/out of the grid
        /*const powerData = await fetchHousePowerDetails()
        handleDayChange(powerData)
        setLoading(false)*/

        // ∨∨∨ Reloads savings and gains after a house has opted in/out of the grid and merges that with the already fetched power data (a little faster)
        const savingsData = await fetchSavingsGains()
        const currentDaySavings = getCurrentDaySavings(savingsData)

        if (currentDaySavings) {
            setCurrentHouseholdPowerData((prev) => mergeDaySavings(prev, currentDaySavings))
            setHouseholdPowerData((prev) =>
                prev.map((e) =>
                    e.day === currentDay ? mergeDaySavings(e, currentDaySavings) : e
                )
            )
        }
    }

    useEffect(() => {
        // Initially loads all data on first page render
        // (is run twice in dev mode, due to StrictMode in main.jsx, which is used to detect bugs)
        const loadData = async () => {
            setError('')
            setLoading(true)
            const [houseData, powerData] = await Promise.all([fetchHouseInfo(), fetchHousePowerDetails()])
            handleDayChange(powerData)
            setLoading(false)
        }
        loadData()
    }, [])

    useEffect(() => {
        // Changes the power data when the day has been changed
        setError('')
        setLoading(true)
        handleDayChange()
        setLoading(false)
    }, [currentDay])

    useEffect(() => {
        // Makes sure all the necessary data has been fetched and parsed/formatted before rendering the neighborhood
        if (householdData.length === 0 || householdPowerData.length === 0 || !currentHouseholdPowerData) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [error, householdData, householdPowerData, currentHouseholdPowerData, houseShapes])

    if (loading) {
        return (
            <div className='loader-wrapper'>
                <div className='loader' />
                <p className='loader-text'>Loading neighborhood data…</p>
                {error && <p className='card-error'>{error}</p>}
            </div>
        )
    }

    return (
        <>
            {Object.entries(houseShapes).map(([id, shape]) => {
                const singleHouseholdData = householdData.find((e) => e.id === id)
                const singleHouseholdPowerData = currentHouseholdPowerData.houses?.[id] || {}

                const left = shape.positionPercent.x
                const top = shape.positionPercent.y

                return (
                    <div key={id}
                        style={{
                            // Position of the house relative to the parent container (neighborhood)
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            pointerEvents: 'auto',
                            // Size of the house relative to the parent container (house_width_px / container_width_px * 100)
                            width: `${shape.widthPercent}%`,
                            height: `${shape.heightPercent}%`,
                            // CAN'T add the rotation here!!!
                            opacity: 1 // Helpful for getting the house positions and shapes correct
                            // (NOTE!, only change the opacity to < 0 for the duration of modifying the shapes, as it will cause other problems)
                        }}
                    >
                        <House
                            houseId={id}
                            shape={shape}
                            householdData={singleHouseholdData}
                            householdPowerData={singleHouseholdPowerData}
                            handleOpting={handleOpting}
                        />
                    </div>
                )
            })}
            <div className='road'>
                {/* road made with: https://editsvgcode.com/ */}
                <svg viewBox='0 0 800 390' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g opacity='1'>
                        <rect x='3' y='324.167' width='793.489' height='28.6948' rx='14.3474' transform='rotate(2.31639 1.15973 273.167)' fill='#d4d4d4' />
                        <rect x='222.055' y='19.3645' width='502.935' height='30.8319' rx='15.4159' transform='rotate(-2.2066 222.055 19.3645)' fill='#d4d4d4' />
                        <rect x='162.701' y='299.665' width='331.793' height='32.4859' rx='16.243' transform='rotate(-87.9809 212.701 299.665)' fill='#d4d4d4' />
                        <rect x='519.72' y='315.212' width='346.968' height='34.0875' rx='17.0438' transform='rotate(-90.8936 559.72 325.212)' fill='#d4d4d4' />
                    </g>
                </svg>
            </div>
            {error && <p className='card-error'>{error}</p>}
        </>
    )
}

export default Neighborhood