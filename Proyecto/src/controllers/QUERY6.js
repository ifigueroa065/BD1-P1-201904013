const db = require('../db/conexion');

exports.query6 = async (req, res) => {

    const script = `
        SELECT COUNT(*) AS CANTIDAD_VOTOS_NULOS
        FROM TSE.VOTO V
        LEFT JOIN TSE.DETALLE_VOTO DV ON V.idvoto = DV.idvoto
        WHERE DV.id_detalle IS NULL;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Obtener la cantidad de votos nulos desde el resultado
        const cantidadVotosNulos = results[0].CANTIDAD_VOTOS_NULOS;

        res.status(200).json({
            res: true,
            message: 'Consulta exitosa',
            cantidad_votos_nulos: cantidadVotosNulos
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