const db = require('../db/conexion');

exports.query4 = async (req, res) => {
    const script = `
        SELECT P.nombre AS partido,
               SUM(CASE WHEN C.id_cargo IN (1, 2, 6) OR (C.id_cargo IN (3, 4, 5)) THEN 1 ELSE 0 END) AS cantidad_candidatos
        FROM TSE.CANDIDATO C
        INNER JOIN TSE.PARTIDO P ON C.id_partido = P.id_partido
        GROUP BY P.nombre;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            partido: result.partido,
            cantidad_candidatos: result.cantidad_candidatos
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY21 - SUCCESSFULLY', 
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
