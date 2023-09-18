const db = require('../db/conexion');

exports.query6 = async (req, res) => {
    const script = `
        SELECT COUNT(*) AS cantidad_votos_nulos
        FROM TSE.VOTO V
        LEFT JOIN TSE.DETALLE_VOTO DV ON V.idvoto = DV.idvoto
        WHERE DV.id_candidato = -1;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            cantidad_votos_nulos: result.cantidad_votos_nulos
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY6 - SUCCESSFULLY', 
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
