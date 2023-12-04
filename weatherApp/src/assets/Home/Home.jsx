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
  const [ windSpeed, setWindSpeed ] = useState("")
  const [ humidity, setHumidity ] = useState("")
  const [ visibility, setVisibility ] = useState("")
  const [ sunrise, setSunrise ] = useState("")
  const [ sunset, setSunset ] = useState("")
  const [ error, setError ] = useState(null)

  const [ tiles, setTiles ] = useState(false)
  const [inputEnabled, setInputEnabled] = useState(true)
 

    //Get weather data from API
    const getLocation = async () => {

      try{
      const response = await fetch(`${api.base}weather?q=${search}&appid=${api.apiKey}`)
      
      if (!response.ok){

        let errorMessage = 'Failed to fetch data'
        
        try {

        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage

      } catch (jsonError) {
        console.error("JSON Error", jsonError)
      }

      throw new Error(errorMessage)
    }

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
      const wind = data.wind.speed
      const humidityData = data.main.humidity
      const visibilityData = data.visibility
      const sunriseData = data.sys.sunrise
      const sunsetData = data.sys.sunset
       


      const sunriseTime = formatTime(sunriseData)
      const sunsetTime = formatTime(sunsetData) 
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
     setWindSpeed(wind)
     setHumidity(humidityData)
     setVisibility(visibilityData)
     setSunrise(sunriseTime)
     setSunset(sunsetTime)

     setTiles(true)
     setWeatherWrapper(true)
     setError(null)

     handleSearchClick()
      
     
    }catch (error) {
      console.error('Error fetching weather data :', error.message)
      setError(`Error : ${error.message}`)
    }

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
  setTiles(false)
  setError(null)
 }


 const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString([], {hour: '2-digit', minute: 'numeric'})
 }

 useEffect(() => {

  const handlePopstate = () => {

    setError(null)

  }
  
  window.addEventListener('popstate', handlePopstate)

  return () => {
    window.removeEventListener('popstate', handlePopstate)
  }


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
      <div className='wrapper-image'></div>
      <div className={`search-container${searchClicked ? 'Clicked' : ''}`}>

     {handleBack && (
      <img className='back-button' src='images/backk.png' onClick={handleBackClick} />
     )}

    <input className="search-box" type="search" placeholder="Search city" onChange= { (e) => setSearch(e.target.value)} 
      onKeyDown={(e) => {
          if(e.key === 'Enter'){getLocation()
        }
    }}
    onClick={handleSearchClick}    
    />

   <img src='images/searchicon.png' className="search-icon"  onClick={getLocation} />
  </div>


  {error && 
<div className='error-text'>{error}
</div>
}

        {weatherWrapper &&(
        <div className='weather-wrapper'>

        <img className='weather-icon' src={icon} alt='Image not found' />
        <div className='location-data'>


        <div className='location-wrapper'>
        <img className='location-icon' src='/images/location.svg' />
        <p className='location-name'>{locationName}</p>
        </div>


        <p className='temperature-data'>{temperature}</p>
        <p className='feels-like'>Feels Like {feelsLike}</p>

        </div>



        <p className='condition-data'>{condition}</p>
        </div>
        )}
        <p className={`time${searchClicked ? 'Clicked' : ''}`}> {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</p>
        <p className={`date${searchClicked ? 'Clicked' : ''}`}> {currentDate.toLocaleDateString('en-US', { weekday : 'short', day : 'numeric', month : 'short' })}</p>


        {tiles &&(
        <div className='weather-info'>

          <div className='grid-item tile'>
          <img className='grid-image' src='/images/wind.svg' />
          <p className='weather-info-title'>Wind</p>
          <p className='weather-info-text'>{windSpeed}</p>
          </div>



          <div className='grid-item tile'>
          <img className='grid-image' src='/images/humidity.svg' />
          <p className='weather-info-title'>Humidity</p>
          <p className='weather-info-text'>{humidity}</p>
          </div>



          <div className='grid-item tile'>
          <img className='grid-image' id='visibility-icon' src='/images/visibility.svg' />
          <p className='weather-info-title'>Visibility</p>
          <p className='weather-info-text'>{visibility}</p>
          </div>



          <div className='grid-item tile'>
          <img className='grid-image' src='/images/sunrise.svg' />
          <p className='weather-info-title'>Sunrise</p>
          <p className='weather-info-text'>{sunrise}</p>
          </div>



          <div className='grid-item tile'>
          <img className='grid-image' id='sunset-icon' src='/images/sunsetAlt.svg' />
          <p className='weather-info-title'>Sunset</p>
          <p className='weather-info-text'>{sunset}</p>
          </div>



          <div className='grid-item tile'>
          <img className='grid-image' src='/images/map.svg' />

          <p className='weather-info-title'>Location</p>
          <div className='weather-info-location-longitude'>
          <p className='weather-info-longitude'>Lon:</p>
          <p className='weather-info-location-lon'>{longitude}</p>
          </div>

          <div className='weather-info-location-latitude'>
          <p className='weather-info-latitude'>Lat:</p>
          <p className='weather-info-location-lat'>{latitude}</p>
          </div>
        
          
          </div>
          <div>
      

      
      


    </div>
        </div>
        )}
      </div>
    </>
  )
}

export default Home