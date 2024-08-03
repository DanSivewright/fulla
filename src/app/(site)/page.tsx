'use client'

import { useState } from 'react'

type Props = {}
export const Test = ({}) => {
  const [previousSearches, setPreviousSearches] = useState([])

  const [search, setSearch] = useState('')
  const [city, setCity] = useState(null)

  const mockWeatherData = {
    'New York': {
      temperature: '22˚C',
      humidity: '56%',
      windSpeed: '15 km/h',
    },
    'Los Angeles': {
      temperature: '27˚C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
  }

  const simulateWeatherApiCall = () => {
    if (mockWeatherData[search]) {
      setCity(search)
      setSearch('')
    } else {
      setCity(null)
    }
    setPreviousSearches((prev) => [...prev, search])
  }

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        id="citySearch"
        placeholder="Search for a city..."
      />
      <button
        onClick={() => {
          simulateWeatherApiCall()
        }}
        id="searchButton"
      >
        Search
      </button>
      <div id="weatherData">
        <div>Temperature: </div>
        <div>Humidity: </div>
        <div>Wind Speed: </div>
        {previousSearches?.length && !city ? <div>City not found.</div> : null}
      </div>
      <div id="previousSearches">
        {previousSearches?.length ? (
          <>
            <p>Previous Searches:</p>
            <ul>
              {previousSearches.map((search, index) => (
                <li key={search + index}>{search}</li>
              ))}
            </ul>
          </>
        ) : (
          'No previous searches'
        )}
      </div>
    </div>
  )
}
export default Test
