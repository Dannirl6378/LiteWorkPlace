import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "./radio.css";

interface Station {
  id: string;
  name: string;
  streams_url: { https_url?: string }[];
}

const Radio = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [currentStation, setCurrentStation] = useState<string>("");
  const [volume, setVolume] = useState<number>(1); // Volume between 0 and 1
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Play/Pause state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null); // For handling any errors

  const fetchData = async () => {
    console.log("Fetching stations from Radio Browser API...");
    try {
      const response = await axios.get(
        "https://de1.api.radio-browser.info/json/stations/bycountry/Czech",
      );

      // Filtrování konkrétních stanic podle názvu
      const allStations = response.data;
      const filteredStations = allStations.filter((station: any) =>
        ["COLOR Music Radio", "Rock Radio", "Kiss Radio"].includes(
          station.name,
        ),
      );

      // Mapa potřebných dat
      const mappedStations = filteredStations.map((station: any) => ({
        id: station.stationuuid,
        name: station.name,
        streams_url: [{ https_url: station.url_resolved }],
      }));

      setStations(mappedStations);
      setError(null); // Resetuje chyby
    } catch (error: any) {
      console.error("Error fetching stations:", error);
      setError("Error loading stations. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(
      () => {
        fetchData();
      },
      60 * 60 * 1000,
    ); // Refresh data every hour

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleStationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStream = event.target.value;
    setCurrentStation(selectedStream);
    if (audioRef.current) {
      audioRef.current.src = selectedStream; // Nastav novou stanici
      audioRef.current.play();
    }
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
        <select
          className="stations"
          onChange={handleStationChange}
          value={currentStation}
        >
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
            <input
              className="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Radio;
