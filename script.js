app.post('/api/scan', async (req, res) => {
    const { url, keywords } = req.body;

    if (!url || !keywords || keywords.length === 0) {
        return res.status(400).json({ success: false, message: 'URL o palabras clave no proporcionadas.' });
    }

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        let foundTips = [];

        // Determinar el dominio de la URL para aplicar el método de escaneo adecuado
        if (url.includes('japan-fixed.com')) {
            // Lógica para japan-fixed.com
            $('p').each((_, element) => {
                const text = $(element).text().trim();
                const regex = /MATCH: (.*?) – (.*?)\s+PICK: (.*?)\s+ODD: (.*?)\s+RESULTS: (.*?)$/;
                const match = text.match(regex);
                
                if (match) {
                    const [_, matchName, opponent, pick, odd, results] = match;
                    foundTips.push({ match: matchName + " vs " + opponent, pick, odd, results });
                }
            });
        }
        else if (url.includes('otra-web.com')) {
            // Lógica para otra web con diferente estructura
            // Aquí se podría aplicar una estrategia similar, pero con diferentes selectores y reglas.
            // Por ejemplo, si la otra web usa <div class="tip"> para mostrar los pronósticos:
            $('.tip').each((_, element) => {
                const matchName = $(element).find('.match-name').text();
                const pick = $(element).find('.pick').text();
                const odd = $(element).find('.odd').text();
                const results = $(element).find('.results').text();
                foundTips.push({ match: matchName, pick, odd, results });
            });
        }

        if (foundTips.length > 0) {
            return res.json({ success: true, tips: foundTips });
        } else {
            return res.json({ success: false, message: 'No se encontraron tips con esas palabras clave.' });
        }

    } catch (error) {
        console.error('Error al analizar la URL:', error);
        res.status(500).json({ success: false, message: 'Error al procesar la URL.' });
    }
});
