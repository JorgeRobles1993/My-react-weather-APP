import './App.css';
import Search from "./components/search/search";
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
import Popup from './components/popup/popup';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecast] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(forecastWeather);

  return (
    <div className="container">
      <div className='titulo'> My Weather APP</div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather &&<Forecast data={forecastWeather} />}
      <div className="popup-maindiv">
      <br></br>
      <button onClick={() => setButtonPopup(true)}> La meteo a la mexicaine</button>
    </div>
      <Popup trigger={buttonPopup} setTrigger = {setButtonPopup}>
        <img className="gif" src="./icons/8Osq.gif"/>
      </Popup>
    </div>
  );
}

export default App;
