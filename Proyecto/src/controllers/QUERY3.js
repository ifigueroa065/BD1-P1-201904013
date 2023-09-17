const db = require('../db/conexion');

exports.query3 = async (req, res) => {
    const script = `
        SELECT P.nombre AS partido,
               C.nombre AS candidato_nombre
        FROM TSE.CANDIDATO C
        INNER JOIN TSE.PARTIDO P ON C.id_partido = P.id_partido
        WHERE C.id_cargo = 6; -- Candidatos a alcalde
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            partido: result.partido,
            candidato_nombre: result.candidato_nombre
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY3 - SUCCESSFULLY', 
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
