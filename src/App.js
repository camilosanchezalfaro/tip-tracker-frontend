import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState('');
  const [pronosticos, setPronosticos] = useState([]);

  useEffect(() => {
    // Obtener las configuraciones de las webs desde el backend
    async function fetchConfigurations() {
      const response = await axios.get('/api/web-configurations');
      setConfigurations(response.data);
    }
    fetchConfigurations();
  }, []);

  const handleScan = async () => {
    try {
      const response = await axios.post('/scan-website', { webId: selectedConfig });
      setPronosticos(response.data);
    } catch (error) {
      console.error("Error al escanear la web:", error);
    }
  };

  return (
    <div>
      <h1>Escanear Pronósticos</h1>

      <div>
        <label htmlFor="webConfig">Selecciona una web para escanear:</label>
        <select
          id="webConfig"
          value={selectedConfig}
          onChange={(e) => setSelectedConfig(e.target.value)}
        >
          <option value="">Seleccione...</option>
          {configurations.map((config) => (
            <option key={config._id} value={config._id}>
              {config.url}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleScan}>Escanear Web</button>

      <div>
        <h2>Pronósticos encontrados:</h2>
        <ul>
          {pronosticos.map((pronostico, index) => (
            <li key={index}>
              <strong>{pronostico.titulo}</strong> ({pronostico.fecha}): {pronostico.pronostico}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
