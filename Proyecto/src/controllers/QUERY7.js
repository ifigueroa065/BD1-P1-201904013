const db = require('../db/conexion');

exports.query7 = async (req, res) => {
    const script = `
        SELECT
            edad,
            COUNT(*) AS CantidadPersonasVotaron
        FROM TSE.CIUDADANO C
        INNER JOIN TSE.VOTO V ON C.dpi = V.dpi
        GROUP BY edad
        ORDER BY CantidadPersonasVotaron DESC
        LIMIT 10;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Agregar la posición en el "Top 10"
        const formattedResults = results.map((result, index) => ({
            Top: index + 1,
            Edad: result.edad,
            CantidadPersonasVotaron: result.CantidadPersonasVotaron
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY7 - SUCCESSFULLY', 
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
