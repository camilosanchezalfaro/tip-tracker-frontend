document.getElementById('scan-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    const url = document.getElementById('url').value;
    const keywords = document.getElementById('keywords').value.split(',').map(keyword => keyword.trim());
    
    // Obtener los títulos y formatos
    const titles = document.getElementById('titles').value.split(',').map(title => title.trim());
    const formats = document.getElementById('formats').value.split(',').map(format => format.trim());

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Escaneando...';

    try {
        const response = await fetch('https://tip-tracker-backend.vercel.app/api/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, keywords, titles, formats }) // Enviamos títulos y formatos
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
