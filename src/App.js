import React, { useEffect, useState } from 'react'
import cold from "./Assets/cold.jpg";
import hot from "./Assets/sunny.jpg";
import Description from './Description';
import FormattedData from './Service'
import rainBG from './Assets/RainyBG.png'
import cloudyBG from './Assets/cloudyBG.jpg'
import mistbg from './Assets/mist.jpg'
// const API="https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=40ea1d2ba6ec059073b04e857a884579"

const App = () => {

  const [city,setCity]=useState('paris');
  const [weather,setWeather]=useState()
  const [units, setUnits] = useState('metric')
  const [bg,setbg]=useState(cold);
  
  const enterPressed=(e)=>{
    if(e.keyCode===13){

      setCity(e.currentTarget.value);
      e.currentTarget.blur();
      e.currentTarget.value="";
      
    }
  }

  useEffect(()=>{
    const fetchWeatherData=async()=>{
      const data = await FormattedData(city,units)

      setWeather(data);
      console.log(data);
      console.log(data.main.toLowerCase());
      // Dynamic Bg
      let con=data.main;
      if(con==="Clear"){
        setbg(hot);
      }
      else if(con==="Clouds") setbg(cloudyBG);
      else if(con==="Snow") setbg(cold);
      else if(con==="Rain" || con==="Drizzle" || con==="Thunderstorm")setbg(rainBG);
      else  setbg(mistbg)
    };

    fetchWeatherData();

  },[units,city]);

  const handleUnitClick=(e)=>{
    const button =e.currentTarget;
    const currentUnit=button.innerText.slice(1);
    const isCelsius=currentUnit==='C';
    button.innerText=isCelsius?'°F':'°C';
    setUnits(isCelsius?"metric":"imperial");
  };

  

  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {/* We want to render weather only when we have the weather */}

        {
          weather && 
          <div className="container">
            <div className="section section_inputs">
              <input onKeyDown={enterPressed} type="text" name="city" placeholder='Enter City' />
              {/* This Input in to take input of new cities */}
              <button onClick={(e)=>handleUnitClick(e)}>°F</button>
            </div>

            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units==='metric' ? 'C':'F'}`}</h1>
              </div>
            </div>
              <Description weather={weather} units={units}/>
          </div>
        }
        
      </div>
    </div>
  )
}

export default App
