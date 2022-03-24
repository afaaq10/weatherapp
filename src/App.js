
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'

import './im.jpeg'


function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Srinagar');

  const getData = () => {
    // const APIKey = '99b72ecbbf458bcf9abee98ce7ca2415';

    const APIKey = '546b8e7bc2e42c8c92a2572386d39b0a'; // change this to your api key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;


    // const url = "https://api.openweathermap.org/data/2.5/weather?city=London&appid='99b72ecbbf458bcf9abee98ce7ca2415'";
    axios.get(url).then((res) => setWeatherData(res.data)).catch((err) => console.log(err))

  }



  const name = weatherData ? weatherData.name : '';
  const desc = weatherData ? weatherData.weather[0].description : '';
  const temp = weatherData ? weatherData.main.temp : '';
  document.body.style = 'background-color:violet '
  document.body.style = 'background-image:url("https://images.news18.com/ibnlive/uploads/2021/07/1627207399_space-1600x1200.jpg") '


  const typing = (e) => {
    setCity(e.target.value);
  }
  const click = () => {
    getData();

  }

  useEffect(() => {
    getData();

    document.getElementById('in').focus();

  }, [])



  return (
    <>


      <div className="weather">

        {/* <input type="text" onChange={typing} /> */}
        {/* <button onClick={click} >Get weather</button> */}
        <input id="in" class="form-control form-control-lg mt-1" type="text" onChange={typing} placeholder="Enter your city here" aria-label=".form-control-lg example" />
        <div class="text-center">
          <button type="button" onClick={click} class="btn btn-outline-primary mt-3 text-center">Get weather</button>
          {/* <button onClick={click} >Get weather</button> */}
        </div>
      </div>

      <div className="cen">
        <h1>{name}</h1>
        <h1>  {temp}°C</h1>
        <h1>{desc}</h1>
      </div>




    </>

  )
}

export default App

