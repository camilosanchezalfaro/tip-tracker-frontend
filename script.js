// Función para "escanear" la web
async function scanWebsite(url) {
    try {
        // Realizar la solicitud POST al backend
        const response = await fetch('https://tip-tracker-backend.vercel.app/api/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        // Obtener la respuesta
        const data = await response.json();

        // Mostrar los resultados
        if (data.success) {
            document.getElementById('result').innerHTML = `<p>Tips encontrados: <br> ${data.tips.join('<br>')}</p>`;
        } else {
            document.getElementById('result').innerHTML = '<p>No se encontraron tips en esta URL.</p>';
        }
    } catch (error) {
        console.error('Error al escanear la web:', error);
        document.getElementById('result').innerHTML = '<p>Error al escanear la web.</p>';
    }
}

// Manejar el evento de envío del formulario
document.getElementById('scanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;
    scanWebsite(url);
});
