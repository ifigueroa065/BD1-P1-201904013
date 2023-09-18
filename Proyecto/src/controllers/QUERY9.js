const db = require('../db/conexion');

exports.query9 = async (req, res) => {
    const script = `
        SELECT
            numero_mesa,
            departamento,
            cantidad_votos,
            ROW_NUMBER() OVER (ORDER BY cantidad_votos DESC) AS posicion
        FROM (
            SELECT
                M.id_mesa AS numero_mesa,
                D.nombre AS departamento,
                COUNT(*) AS cantidad_votos
            FROM TSE.VOTO V
            INNER JOIN TSE.MESA M ON V.id_mesa = M.id_mesa
            INNER JOIN TSE.DEPARTAMENTO D ON M.id_dep = D.id_dep
            GROUP BY M.id_mesa, D.nombre
        ) AS mesas_frecuentadas
        ORDER BY cantidad_votos DESC
        LIMIT 5;
    `;

    try {
        // Ejecutar la consulta SQL
        const results = await db.query(script, []);

        // Formatear los resultados en un objeto JSON
        const formattedResults = results.map(result => ({
            top: result.posicion,
            numero_mesa: result.numero_mesa,
            departamento: result.departamento,
            cantidad_votos: result.cantidad_votos
        }));

        res.status(200).json({
            res: true,
            message: 'QUERY9 - MESAS MAS FRECUENTES', 
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
