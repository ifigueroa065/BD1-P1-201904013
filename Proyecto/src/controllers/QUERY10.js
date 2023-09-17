const db = require('../db/conexion');

exports.query10 = async (req, res) => {
    const script = `
        SELECT DATE_FORMAT(fechahora, '%H:%i') AS hora,
               COUNT(*) AS cantidad_votos
        FROM TSE.VOTO
        GROUP BY DATE_FORMAT(fechahora, '%H:%i')
        ORDER BY cantidad_votos DESC
        LIMIT 5;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            hora: result.hora,
            cantidad_votos: result.cantidad_votos
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY10 - SUCCESSFULLY', 
            data: formattedResults
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            res: false,
            message: 'Error al realizar la consulta',
            error: error.message
        });
    }
}
