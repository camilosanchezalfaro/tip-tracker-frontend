document.getElementById('scan-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    const url = document.getElementById('url').value;
    const keywords = document.getElementById('keywords').value.split(',').map(keyword => keyword.trim());

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Escaneando...';

    try {
        const response = await fetch('https://tip-tracker-backend.vercel.app/api/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, keywords }) // Enviamos también las palabras clave
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
