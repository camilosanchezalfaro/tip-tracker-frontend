import React, { useState } from 'react';
import axios from 'axios';

function RegisterWeb() {
  const [url, setUrl] = useState('');
  const [titleKeywords, setTitleKeywords] = useState('');
  const [datePatterns, setDatePatterns] = useState('');
  const [tipPatterns, setTipPatterns] = useState('');
  const [tipsContainer, setTipsContainer] = useState('');
  const [dateLocation, setDateLocation] = useState('');
  const [titleLocation, setTitleLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configData = {
      url,
      title_keywords: titleKeywords.split(','),
      date_patterns: datePatterns.split(','),
      tip_patterns: tipPatterns.split(','),
      html_structure: {
        tips_container: tipsContainer,
        date_location: dateLocation,
        title_location: titleLocation,
      },
    };

    try {
      const response = await axios.post('http://localhost:3001/api/add-web-config', configData);
      if (response.data.success) {
        alert('Configuración guardada correctamente');
      }
    } catch (error) {
      console.error("Error al guardar configuración:", error);
      alert('Hubo un error al guardar la configuración');
    }
  };

  return (
    <div>
      <h2>Configurar una Página Web</h2>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Títulos (separados por coma):
          <input
            type="text"
            value={titleKeywords}
            onChange={(e) => setTitleKeywords(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Formatos de Fecha (separados por coma):
          <input
            type="text"
            value={datePatterns}
            onChange={(e) => setDatePatterns(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Palabras Clave para los Pronósticos (separados por coma):
          <input
            type="text"
            value={tipPatterns}
            onChange={(e) => setTipPatterns(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Selector CSS para Pronósticos (opcional):
          <input
            type="text"
            value={tipsContainer}
            onChange={(e) => setTipsContainer(e.target.value)}
          />
        </label>
        <br />
        <label>
          Selector CSS para Fecha (opcional):
          <input
            type="text"
            value={dateLocation}
            onChange={(e) => setDateLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Selector CSS para Título (opcional):
          <input
            type="text"
            value={titleLocation}
            onChange={(e) => setTitleLocation(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Guardar Configuración</button>
      </form>
    </div>
  );
}

export default RegisterWeb;
