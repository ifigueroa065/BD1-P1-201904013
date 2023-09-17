const db = require('../db/conexion');

exports.query1 = async (req, res) => {
    const script = `
        SELECT P.nombre AS partido,
               CP.nombre AS nombre_presidente,
               CV.nombre AS nombre_vicepresidente
        FROM TSE.CANDIDATO CP
        INNER JOIN TSE.PARTIDO P ON CP.id_partido = P.id_partido
        LEFT JOIN TSE.CANDIDATO CV ON P.id_partido = CV.id_partido
                               AND CV.id_cargo = 2 -- Candidatos a vicepresidente
        WHERE CP.id_cargo = 1 -- Candidatos a presidente
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            partido: result.partido,
            nombre_presidente: result.nombre_presidente,
            nombre_vicepresidente: result.nombre_vicepresidente
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY1 - SUCCESSFULLY', 
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
