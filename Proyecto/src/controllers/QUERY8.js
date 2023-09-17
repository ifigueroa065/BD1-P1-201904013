const db = require('../db/conexion');

exports.query8 = async (req, res) => {
    const script = `
        SELECT C.nombre AS candidato_nombre,
               P.nombre AS partido,
               COUNT(*) AS cantidad_votos
        FROM TSE.TEMP_DETALLE_VOTO TDV
        INNER JOIN TSE.CANDIDATO C ON TDV.id_candidato = C.id_candidato
        INNER JOIN TSE.PARTIDO P ON C.id_partido = P.id_partido
        WHERE C.id_cargo IN (1, 2) -- Candidatos a presidente y vicepresidente
        GROUP BY C.nombre, P.nombre
        ORDER BY cantidad_votos DESC
        LIMIT 10;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            candidato_nombre: result.candidato_nombre,
            partido: result.partido,
            cantidad_votos: result.cantidad_votos
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY8 - SUCCESSFULLY', 
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
