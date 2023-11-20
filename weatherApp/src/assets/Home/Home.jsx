import React, { useState } from 'react'
import './Home.css'


const Home = () => {

  const api = {
    apiKey: "c905bf000a8af478620c9a03de9985f7",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [ search, setSearch ] = useState(null)
  const [ weather, setWeather ] = useState({})
  const [ temperature, setTemperature ] = useState("")
  const [ kelvin, setKelvin ] = useState("")
  const [ condition, setCondition ] = useState("")
  const [ longitude, setLongitude ] = useState("")
  const [ latitude, setLatitude ] = useState("")
  const [ icon, setIcon ] = useState("")
 

  
    const getLocation = async () => {
      const response = await fetch(`${api.base}weather?q=${search}&appid=${api.apiKey}`)
      const data = await response.json()

      setWeather(data)

      const kelvin = data.main.temp
      const celcius  = kelvin - 273.15
      const longitude = data.coord.lat
      const latitude = data.coord.lon
      const wicon = data.weather[0].icon
      const png = ".png"

      const baseIconUrl = "https://openweathermap.org/img/wn/"
      const finalIcon = baseIconUrl +  wicon + png

     let temp = parseFloat(celcius.toFixed(2))
     

     setTemperature(temp)
     setKelvin(kelvin)
     setCondition(data.weather[0].description)
     setLongitude(longitude)
     setLatitude(latitude)
     setIcon(finalIcon)
     
 }
  
 


  return (
    <>
      <div className="wrapper">
      <div className="search-container">
    <input className="search-box" type="search" placeholder="Search city" onChange= { (e) => setSearch(e.target.value)} />
   <img src='images/searchicon.png' className="search-icon" onClick={getLocation} />
  </div>
        <p>{weather.name}</p>
        <p>{temperature}</p>
        <p>{kelvin}</p>
        <img className="weather-icon" src={icon} alt='Image not found' />
        <p>{condition}</p>
        <p>{longitude}</p>
        <p> {latitude}</p>
      </div>
    </>
  )
}

export default Home