const db = require('../db/conexion');

exports.query7 = async (req, res) => {
    const script = `
        SELECT dpi, nombre, apellido, edad
        FROM TSE.CIUDADANO
        ORDER BY edad DESC
        LIMIT 10;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            dpi: result.dpi,
            nombre: result.nombre,
            apellido: result.apellido,
            edad: result.edad
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
