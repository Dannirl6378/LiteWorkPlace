import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import { env } from 'process';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: { speed: number };
}

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  // Získání dat o počasí pomocí API
  const fetchWeather = async (url: string) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch {
      setError("Nepodařilo se načíst data o počasí.");
    } finally {
      setLoading(false);
    }
  };

  // Počasí podle města
  const fetchWeatherByCity = (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetchWeather(url);
  };

  // Počasí podle polohy
  const fetchWeatherByLocation = (latitude: number, longitude: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetchWeather(url);
  };

  // Hledání při Enter
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && location.trim() !== "") {
      fetchWeatherByCity(location);
    }
  };

  // Získání polohy při načtení stránky
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        () => {
          setError("Nepodařilo se získat polohu. Zkontrolujte povolení.");
        },
      );
    } else {
      setError("Geolokace není podporována vaším prohlížečem.");
    }
  }, []);

  return (
    <div className="appWeather">
      <div className="searchWeather">
        <input
          className="inputweather"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {loading && <p>Načítám...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="containerWeather">
          <div className="headerWeather">
            <h3 className="location">{data.name}</h3>

            <h4 className="temperature">{Math.round(data.main.temp)}°C</h4>
          </div>
          <div className="descriptionAndWind">
            <div className="descpWeather">
              <div className="weatherIcon">
                {data.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                )}
              </div>
              <h4 className="descript">{data.weather[0].description}</h4>
            </div>
            <div>
              <p className="windSpeed">Wind: {data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
