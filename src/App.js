import './App.css';

import React, {useState, useRef, useEffect} from "react";
import {v4 as uuidv4} from 'uuid';


const api = {
    key: "1b0c59760e957e7ef056b34901746906",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {

            setWeather(result)
            setQuery('')
            console.log(result)
          })
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`

  }

  return (
      <div className={
        (typeof weather.main != "undefined")
            ? ((weather.main.temp > 20) ? 'App-warm' : 'App') && ((weather.main.temp > 26) ? 'App-hot' : 'App') :
            'App'}>
        <main>
          <div className="search-box">
            <input type="text"
                   className="search-bar"
                   placeholder="Search..."
                   onChange={e => setQuery(e.target.value)}
                   value={query}
                   onKeyPress={search}
            />

          </div>
          {(typeof weather.main != "undefined") ? (
              <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className="weather">
                    {weather.weather[0].main}
                  </div>
                </div>
              </div>
          ) : ('')}
        </main>
      </div>
  )
}

export default App


