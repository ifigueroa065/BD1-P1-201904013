const db = require('../db/conexion');

exports.query5 = async (req, res) => {

    const script = `
        SELECT D.nombre AS departamento, COUNT(V.idvoto) AS cantidad_votaciones
        FROM TSE.VOTO V
        INNER JOIN TSE.MESA M ON V.id_mesa = M.id_mesa
        INNER JOIN TSE.DEPARTAMENTO D ON M.id_dep = D.id_dep
        GROUP BY D.nombre;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            departamento: result.departamento,
            cantidad_votaciones: result.cantidad_votaciones
        }));

        res.status(200).json({
            res: true,
            message: 'Consulta exitosa',
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
