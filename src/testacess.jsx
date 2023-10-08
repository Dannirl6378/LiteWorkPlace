import React, { useEffect, useState } from 'react';
import { fetchData } from './dbData/Axios'; // Importujte správnou funkci

function TestComponent() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Zavolejte funkci pro získání dat pomocí API klíče
    fetchData() // Použijte novou funkci pro získání dat
      .then((response) => {
        // Zobrazte data na stránce
        setData(JSON.stringify(response));
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Výsledek volání API</h2>
      {data && <pre>{data}</pre>}
      {error && <p>Chyba: {error}</p>}
    </div>
  );
}

export default TestComponent;
