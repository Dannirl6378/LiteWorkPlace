import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "./radio.css";

interface Station {
  id: string;
  name: string;
  streams_url?: {
    https_url?: string;
  }[];
}

const Radio = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [currentStation, setCurrentStation] = useState<string>("");
  const [volume, setVolume] = useState<number>(1); // Volume between 0 and 1
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Play/Pause state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null); // For handling any errors

  const fetchData = async (retryCount = 0) => {
    console.log("Fetching data...");
    const maxRetries = 3; // Set a limit for retries
    try {
      const options = {
        method: 'GET',
        url: 'https://50k-radio-stations.p.rapidapi.com/get/cities',
        params: { country_id: '25' },
        headers: {
          'x-rapidapi-key': '3f66fa3f26mshf03b4dcf79d99bfp19b95djsn0813f08e67e0',
          'x-rapidapi-host': '50k-radio-stations.p.rapidapi.com',
        },
      };
      const response = await axios.request(options);
      console.log("API response received:", response.data);

      const allStations = response.data.data;
      const filteredStations = allStations.slice(0, 3).map((station: any) => ({
        id: station.id,
        name: station.name,
        streams_url: station.streams_url,
      }));

      setStations(filteredStations);
      setError(null); // Reset error if the data is loaded successfully
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        console.error("API request rate-limited. Retrying...", error.response);
        
        // Check for Retry-After header
        const retryAfter = error.response.headers['retry-after'] 
          ? parseInt(error.response.headers['retry-after'], 10) * 1000 
          : 1000; // Default to 1 second if no Retry-After header

        if (retryCount < maxRetries) {
          console.log(`Retrying in ${retryAfter}ms... Attempt ${retryCount + 1}`);
          setTimeout(() => fetchData(retryCount + 1), retryAfter); // Exponential backoff retry
        } else {
          setError("Exceeded API rate limits. Please try again later.");
        }
      } else {
        console.error("API request error:", error);
        setError("Error loading stations. Please try again later.");
      }
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching data for the first time...");
    fetchData();

    const intervalId = setInterval(() => {
      console.log("Fetching data on interval...");
      fetchData();
    }, 60 * 60 * 1000); // Refresh data every hour

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleStationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStream = event.target.value;
    setCurrentStation(selectedStream);
    setIsPlaying(true); // Auto-play when a station is selected
  };

  const handlePlayPauseToggle = () => {
    setIsPlaying(!isPlaying); // Toggle Play/Pause
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {stations.length > 0 ? (
        <select className="stations" onChange={handleStationChange} value={currentStation}>
          <option value="" disabled>
            Choose a station
          </option>
          {stations.map((station, index) => (
            <option key={index} value={station.streams_url?.[0]?.https_url}>
              {station.name}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading stations...</p>
      )}
      {currentStation && (
        <div>
          <audio ref={audioRef}>
            <source src={currentStation} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="custom-controls">
            <button className="PpButton" onClick={handlePlayPauseToggle}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <input className="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Radio;
