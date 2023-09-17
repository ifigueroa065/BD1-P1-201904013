const db = require('../db/conexion');

exports.borrarTSE = async (req, res) => {

    const script = `
    -- BORRAR BASE DE DATOS
    DROP DATABASE IF EXISTS TSE;
    -- BORRAR TABLA CIUDADANO
    DROP TABLE IF EXISTS TSE.CIUDADANO;
    -- BORRAR TABLA DEPARTAMENTO
    DROP TABLE IF EXISTS TSE.DEPARTAMENTO;
    -- BORRAR TABLA CARGO
    DROP TABLE IF EXISTS TSE.CARGO;
    -- BORRAR TABLA DETALLE PARTIDO
    DROP TABLE IF EXISTS TSE.PARTIDO;
    -- BORRAR TABLA DETALLE CANDIDATO
    DROP TABLE IF EXISTS TSE.CANDIDATO;
    -- BORRAR TABLA DETALLE MESA
    DROP TABLE IF EXISTS TSE.MESA;
    -- BORRAR TABLA DETALLE VOTO
    DROP TABLE IF EXISTS TSE.VOTO;
    -- BORRAR TABLA DETALLE DETALLE_VOTO
    DROP TABLE IF EXISTS TSE.DETALLE_VOTO;
    `;

    try {
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = script.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.query(sql,[]);
        }

        res.status(200).json({
            body: { res: true, message: 'DROP TSE - SUCCESSFULLY' },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'ERROR AL CREAR MODELO', error },
        });
    }
}
