import React, { useEffect, useState } from 'react'
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
  const [ locationName, setLocationName ] = useState("")
  const [ longitude, setLongitude ] = useState("")
  const [ latitude, setLatitude ] = useState("")
  const [ icon, setIcon ] = useState("")
  const [ currentTime, setCurrentTime ] = useState(new Date())
  const [ currentDate, setCurrentDate ] = useState(new Date())
  const [ searchClicked, setSearchClicked ] = useState(false)
  const [ handleBack, setHandleBack ] = useState(false)
  const [ feelsLike, setFeelsLike ] = useState("")
  const [ weatherWrapper, setWeatherWrapper ] = useState(false)

  const [inputEnabled, setInputEnabled] = useState(true)
 

  
    const getLocation = async () => {
      const response = await fetch(`${api.base}weather?q=${search}&appid=${api.apiKey}`)
      const data = await response.json()

      setWeather(data)
      console.log(data)

      const kelvin = data.main.temp
      const celcius  = kelvin - 273.15
      const longitude = data.coord.lat
      const latitude = data.coord.lon
      const wicon = data.weather[0].icon
      const png = ".png"
      const degreeIcon = "°"
      const locationData = data.name


      const feelsLikeData = data.main.feels_like
      const feelsLikeTemp = feelsLikeData - 273.15

      const baseIconUrl = "https://openweathermap.org/img/wn/"
      const finalIcon = baseIconUrl +  wicon + png

     let temp = parseFloat(celcius.toFixed(0)) + degreeIcon
     let feelsLikeCelcius = parseFloat(feelsLikeTemp.toFixed(0)) + degreeIcon
     

     setTemperature(temp)
     setKelvin(kelvin)
     setCondition(data.weather[0].description)
     setLongitude(longitude)
     setLatitude(latitude)
     setIcon(finalIcon)     
     setLocationName(locationData)
     setFeelsLike(feelsLikeCelcius)

     setWeatherWrapper(true)
 }

const handleSearchClick = () => {
  if(inputEnabled){
    setSearchClicked(!searchClicked)
    setInputEnabled(false)
    setHandleBack(true)
  }
 }

 const handleBackClick = () => {
  setSearchClicked(false)
  setInputEnabled(true)
  setHandleBack(false)
  setWeatherWrapper(false)
 }

 useEffect(() => {
  const timeIntervalId = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000)

  const dateIntervalId = setInterval(() => {
    setCurrentDate(new Date());
  }, 24 * 60 * 60 * 1000)

  return () => {
    clearInterval(timeIntervalId)
    clearInterval(dateIntervalId)
  }
  
 }, [])


  return (
    <>
      <div className={`wrapper${searchClicked ? 'Clicked' : ''}`}>
      <div className={`search-container${searchClicked ? 'Clicked' : ''}`}>

     {handleBack && (
      <img className='back-button' src='images/backk.png' onClick={handleBackClick} />
     )}

    <input className="search-box" type="search" placeholder="Search city" onChange= { (e) => setSearch(e.target.value)} onClick={handleSearchClick} />
   <img src='images/searchicon.png' className="search-icon"  onClick={getLocation} />
  </div>
  
  
        <p className='weather-data'>{weather.name}</p>
        
        <p className='weather-data'>{kelvin}</p>




        {weatherWrapper &&(
        <div className='weather-wrapper'>

        <img className='weather-icon' src={icon} alt='Image not found' />
        <div className='location-data'>
        <img className='location-icon' src='/images/location.svg' />
        <p className='location-name'>{locationName}</p>
        <p className='temperature-data'>{temperature}</p>
        <p className='feels-like'>Feels Like {feelsLike}</p>

        </div>



        <p className='condition-data'>{condition}</p>
        </div>
        )}

        <p className='weather-data'>{longitude}</p>
        <p className='weather-data'> {latitude}</p>
        <p className={`time${searchClicked ? 'Clicked' : ''}`}> {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</p>
        <p className={`date${searchClicked ? 'Clicked' : ''}`}> {currentDate.toLocaleDateString('en-US', { weekday : 'short', day : 'numeric', month : 'short' })}</p>
      </div>
    </>
  )
}

export default Home