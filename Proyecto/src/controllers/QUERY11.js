const db = require('../db/conexion');

exports.query11 = async (req, res) => {

    const script = `
        SELECT C.GENERO, COUNT(*) AS CANTIDAD_VOTOS
        FROM TSE.VOTO V
        INNER JOIN TSE.CIUDADANO C ON V.DPI = C.DPI
        GROUP BY C.GENERO;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            genero: result.GENERO,
            cantidad_votos: result.CANTIDAD_VOTOS
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY11 - SUCCESSFULLY', 
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