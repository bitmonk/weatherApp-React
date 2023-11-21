import React from 'react'
import './Weather.css'
import { Link } from 'react-router-dom'

const Weather = () => {

    const weatherPage = () => {
        window.location.href = './Home'
    }

  return (
    <>
    <div className="wrapper">
    <div className="search-container">
  <input className="search-box" type="search" placeholder="Search city"/>
 <img src='images/searchicon.png' className="search-icon" onClick={weatherPage}/>
</div>
</div>
</>
  )
}


export default Weather