import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

interface WeatherData {
  name: string;
  temp: number;
  humidity: number;
  wind: { speed: number };
  feels_like: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  //const [icons, setIcons] = useState("");
  const [location, setLocation] = useState(``);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "db0840f95d9213c5790cddb57ac9d6cf";
  /*
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=db0840f95d9213c5790cddb57ac9d6cf&units=metric`;
  */
  //const iconUrl = `https://openweathermap.org/img/wn/${icons}d@2x.png`;

  const callWeatherAPI = async (url: string) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Nepodařilo se načíst data o počasí.");
    } finally {
      setLoading(false);
    }
  };

  // Funkce pro získání počasí podle polohy
  const fetchWeatherByLocation = (latitude: number, longitude: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    callWeatherAPI(url);
  };

  // Funkce pro získání počasí podle zadané lokality
  const fetchWeatherByCity = (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    callWeatherAPI(url);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && location) {
      fetchWeatherByCity(location);
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
          },
          (error) => {
            setError(
              "Nepodařilo se získat polohu. Zkontrolujte povolení geolokace.",
            );
          },
        );
      } else {
        setError("Geolokace není podporována vaším prohlížečem.");
      }
    };
    getLocation();
  }, []);

  return (
    <div className="appWeather">
      <div className="searchWeather">
        <input
        className="inputweather"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={handleSearch}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {data?.name !== undefined && (
        <div className="containerWeather">
          <h3 className="location">{data?.name}</h3>
          <div className="wshow">
          <h4 className="descript">{data?.weather[0].description}</h4>
            <div className="weatherData">
              <p className="Icons">
                {data?.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                  />
                )}
              </p>
            <p className="descript">{data?.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//https://api.openweathermap.org/data/2.5/weather?q=Praha&appid=db0840f95d9213c5790cddb57ac9d6cf&units=metric
