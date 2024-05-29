import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Station {
    id: string;
    emisora: string;
    stream: string;
}

const Radio = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [currentStation, setCurrentStation] = useState<string>('');

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
            // Filtrovat pouze stanice s ID 82794 a 9428
            const filteredStations = allStations.filter((station: Station) => 
                station.id === '82794' || station.id === '9428'
            );
            setStations(filteredStations);
            console.log(filteredStations);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const loadDataAndSetTimeout = async () => {
            await fetchData();
        };

        loadDataAndSetTimeout(); // Spustíme načtení dat hned po zavolání useEffect

        const intervalId = setInterval(loadDataAndSetTimeout, 100 * 60 * 1000); // 100 minut v milisekundách

        return () => clearInterval(intervalId); // Zrušíme interval při odmontování komponenty
    }, []); // Zde je prázdné pole znamená, že useEffect se spustí pouze při inicializaci komponenty

    const handleStationChange = (stream: string) => {
        setCurrentStation(stream);
    };

    return (
        <div>
            {stations.length > 0 ? (
                <ul>
                    {stations.map((station, index) => (
                        <li key={index}>
                            <button onClick={() => handleStationChange(station.stream)}>
                                {station.emisora}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading stations...</p>
            )}
            {currentStation && (
                <audio controls autoPlay>
                    <source src={currentStation} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default Radio;
