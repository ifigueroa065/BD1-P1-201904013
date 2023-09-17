const db = require('../db/conexion');

exports.query2 = async (req, res) => {
    const script = `
        SELECT P.nombre AS partido,
               COUNT(C.id_candidato) AS cantidad_candidatos
        FROM TSE.CANDIDATO C
        INNER JOIN TSE.PARTIDO P ON C.id_partido = P.id_partido
        WHERE C.id_cargo IN (3, 4, 5) -- Candidatos a diputados (lista nacional, distrito electoral, parlamento)
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
            message: 'QUERY2 - SUCCESSFULLY', 
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
