document.getElementById('scan-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Escaneando...';

    try {
        const response = await fetch('tip-tracker-backend.vercel.app', {  // Actualiza la URL aquí
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url }) // Solo enviamos la URL
        });

        const data = await response.json();
        
        if (data.success && data.length > 0) {
            resultDiv.innerHTML = `<h3>Tips Encontrados:</h3><ul>${data.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
        } else {
            resultDiv.innerHTML = 'No se encontraron tips con esas palabras clave.';
        }

    } catch (error) {
        console.error('Error al escanear la web:', error);
        resultDiv.innerHTML = 'Error al escanear la web. Intenta nuevamente.';
    }
});

document.getElementById('add-dictionary-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const dateFormat = document.getElementById('dateFormat').value.trim();
    const tipFormat = document.getElementById('tipFormat').value.trim();

    try {
        const response = await fetch('tip-tracker-backend.vercel.app', {  // Actualiza la URL aquí
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: 'http://example.com',  // Reemplazar con la URL que deseas agregar
                selectorPronosticos: '.tip-selector',  // Selector de ejemplo
                selectorFecha: '.date-selector',
                selectorTitulos: '.title-selector',
                palabrasClave: ['ganar', 'perder', 'empatar']  // Palabras clave de ejemplo
            })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
        } else {
            alert('Error al agregar al diccionario.');
        }
    } catch (error) {
        console.error('Error al agregar al diccionario:', error);
        alert('Error al agregar al diccionario. Intenta nuevamente.');
    }
});
