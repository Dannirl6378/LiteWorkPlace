import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './radio.css'; // Import CSS souboru

interface Station {
    id: string;
    emisora: string;
    stream: string;
}

const Radio = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [currentStation, setCurrentStation] = useState<string>('');
    const [volume, setVolume] = useState<number>(1); // Hlasitost mezi 0 a 1
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // Stav přehrávání
    const audioRef = useRef<HTMLAudioElement>(null);

    const fetchData = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://radio-stations-fm-am-api.p.rapidapi.com/CZ/stations.json',
                headers: {
                    'X-RapidAPI-Key': 'ad3df2f269msh0d61e30fe7df8f0p12b1efjsn0da44fd748b6',
                    'X-RapidAPI-Host': 'radio-stations-fm-am-api.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            const allStations = response.data;
            const filteredStations = allStations.filter((station: Station) => 
                station.id === '82794' || station.id === '9428'
            );
            setStations(filteredStations);
            console.log('Filtered stations:', filteredStations);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const loadDataAndSetTimeout = async () => {
            await fetchData();
        };

        loadDataAndSetTimeout();

        const intervalId = setInterval(loadDataAndSetTimeout, 100 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleStationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStream = event.target.value;
        setCurrentStation(selectedStream);
        setIsPlaying(true); // Při změně stanice začne přehrávat automaticky
    };

    const handlePlayPauseToggle = () => {
        setIsPlaying(!isPlaying); // Přepínáme mezi Play a Pause
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

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play();
        }
    }, [isPlaying]);

    return (
        <div>
            {stations.length > 0 ? (
                <select className='stations' onChange={handleStationChange} value={currentStation}>
                    <option value="" disabled>Choose a station</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station.stream}>
                            {station.emisora}
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
                        <button className='PpButton' onClick={handlePlayPauseToggle}>{isPlaying ? <PauseIcon/> : <PlayArrowIcon/>}</button>
                        <input className='volume'
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
