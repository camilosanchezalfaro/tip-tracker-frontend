document.getElementById('scan-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Escaneando...';

    try {
        // Se agrega el paso de enviar también las palabras clave
        const response = await fetch('https://tip-tracker-backend.vercel.app/api/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                url,
                keywords: {
                    titles: ["FREE DAILY PREDICTIONS", "FREE FOOTBALL PREDICTIONS"], // Aquí van los títulos
                    dateFormats: ["\\d{2}-\\d{2}-\\d{2}", "\\d{2}/\\d{2}/\\d{2}"], // Aquí van los formatos de fecha
                    tipFormats: ["MATCH", "PICK", "ODD"] // Aquí van los formatos de pronóstico
                }
            })
        });

        const data = await response.json();
        
        if (data.success && data.tips.length > 0) {
            resultDiv.innerHTML = `<h3>Tips Encontrados:</h3><ul>${data.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
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
        const response = await fetch('https://tip-tracker-backend.vercel.app/api/add-dictionary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: [title],
                dateFormat: [dateFormat],
                tipFormat: [tipFormat]
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
