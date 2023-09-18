const db = require('../db/conexion');

exports.query7 = async (req, res) => {
    const script = `
        SELECT
            edad,
            COUNT(*) AS cantidad,
            ROW_NUMBER() OVER (ORDER BY edad DESC) AS posicion
        FROM (
            SELECT DISTINCT C.edad
            FROM TSE.CIUDADANO C
            INNER JOIN TSE.VOTO V ON C.dpi = V.dpi
            ORDER BY C.edad DESC
            LIMIT 10
        ) AS edades_unicas
        GROUP BY edad
        ORDER BY edad DESC;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            Posicion: result.posicion,
            Edad: result.edad,
            Cantidad: result.cantidad
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
