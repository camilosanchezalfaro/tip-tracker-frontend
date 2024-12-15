document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;

    // Llamada al backend para analizar la URL
    const result = await scanWebsite(url);

    document.getElementById('result').innerHTML = result;
});

// Función para "escanear" la web
async function scanWebsite(url) {
    try {
        const response = await fetch('https://tip-tracker-backend.vercel.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.success) {
            return `<p>Tips encontrados: <br> ${data.tips.join('<br>')}</p>`;
        } else {
            return '<p>No se encontraron tips en esta URL.</p>';
        }
    } catch (error) {
        console.error('Error al escanear la web:', error);
        return '<p>Error al intentar escanear la web.</p>';
    }
}
