// Manejo del formulario para agregar valores al diccionario
document.getElementById('add-dictionary-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    const title = document.getElementById('title').value;
    const dateFormat = document.getElementById('date-format').value;
    const predictionFormat = document.getElementById('prediction-format').value;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Agregando al diccionario...';

    try {
        const response = await fetch('https://tip-tracker-backend.vercel.app/api/add-dictionary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, dateFormat, predictionFormat }) // Enviar los datos al backend
        });

        const data = await response.json();
        
        if (data.success) {
            resultDiv.innerHTML = '¡Datos agregados al diccionario!';
        } else {
            resultDiv.innerHTML = 'Error al agregar al diccionario.';
        }

    } catch (error) {
        console.error('Error al agregar al diccionario:', error);
        resultDiv.innerHTML = 'Error al agregar al diccionario. Intenta nuevamente.';
    }
});
