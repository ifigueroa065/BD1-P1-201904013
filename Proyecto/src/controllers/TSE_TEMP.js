const db = require('../db/conexion');
const config = require('../db/config')
const mysql = require('mysql2/promise')
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../entradas/ciudadanos.csv');
const filePath_dep = path.join(__dirname, '../../entradas/departamentos.csv');
const filePath_cargo = path.join(__dirname, '../../entradas/cargos.csv');
const filePath_partido = path.join(__dirname, '../../entradas/partidos.csv');
const filePath_candidato = path.join(__dirname, '../../entradas/candidatos.csv');
const filePath_mesa = path.join(__dirname, '../../entradas/mesas.csv');
const filePath_voto = path.join(__dirname, '../../entradas/votaciones.csv');

//const csvclientes = require('../../carga/clientes.csv');

exports.crearTabtemp = async (req, res) => {

    const scriptCrearTablasTemp = `
  

    --  TABLA TEMPORAL CIUDADANO

    CREATE TEMPORARY TABLE  TSE.TEMP_CIUDADANO (
        dpi VARCHAR(13)  NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        edad INT NOT NULL,
        genero CHAR(1) NOT NULL,
        direccion VARCHAR(100) NOT NULL,
        telefono VARCHAR(10) NOT NULL
    );

    --  TABLA TEMPORAL DEPARTAMENTO

    CREATE TEMPORARY TABLE  TSE.TEMP_DEPTO (
        id_dep INTEGER NOT NULL,
        nombre VARCHAR(25) NOT NULL
    );

    --  TABLA TEMPORAL CARGO

    CREATE TEMPORARY TABLE  TSE.TEMP_CARGO (
        id_cargo INTEGER NOT NULL,
        cargo VARCHAR(100) NOT NULL
    );

    --  TABLA TEMPORAL PARTIDO

    CREATE TEMPORARY TABLE  TSE.TEMP_PARTIDO (
        id_partido INTEGER NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        siglas VARCHAR(50) NOT NULL,
        fundacion DATE NOT NULL
    );

    -- TABLA MESA

    CREATE TEMPORARY TABLE TSE.TEMP_MESA (
        id_mesa INTEGER NOT NULL ,
        id_dep INTEGER NOT NULL
    );

    -- TABLA TEMPORAL CANDIDATO

    CREATE TEMPORARY TABLE TSE.TEMP_CANDIDATO (
        id_candidato INTEGER NOT NULL ,
        nombre VARCHAR(50) NOT NULL,
        fecha_nac DATE NOT NULL,
        id_cargo INTEGER NOT NULL,
        id_partido INTEGER NOT NULL
    );    

    -- TABLA VOTO

    CREATE TEMPORARY TABLE TSE.TEMP_VOTO (
        idvoto INTEGER NOT NULL ,
        fechahora DATETIME NOT NULL,
        dpi VARCHAR(13) NOT NULL,
        id_mesa INTEGER NOT NULL
        
    );

    -- TABLA DETALLE VOTO

    CREATE TEMPORARY TABLE TSE.TEMP_DETALLE_VOTO (
        idvoto INTEGER NOT NULL,
        id_candidato INTEGER NOT NULL
    );

    `;

    


    try {
        // Crear una conexión que se cerrará automáticamente al terminar
        const connection = await mysql.createConnection(config.db);
        // Eliminar los comentarios del script SQL
        const scriptWithoutComments = scriptCrearTablasTemp.replace(/(--.*)/g, '');

        // Ejecutar el script SQL sin comentarios
        const sqlCommands = scriptWithoutComments.split(";").map(command => command.trim());

        for (let i = 0; i < sqlCommands.length; i++) {
            const sql = sqlCommands[i];
            if (sql.length === 0) {
                continue;
            }
            await db.querywithoutclose(connection, sql, []);
        }

        // * carga de datos csv a tabla temporal CIUDADANOS

        const datosClientes = fs.readFileSync(filePath, 'utf-8');
        const lines = datosClientes.split('\n');
        for (let i = 1; i < lines.length; i++) {
            const fields = lines[i].split(',');
            const dpi = fields[0] || ''; // Asegura que dpi no sea undefined
            const nombre = fields[1] || '';
            const apellido = fields[2] || '';
            const direccion = fields[3] || '';
            const telefono = fields[4] || '';
            const edad = fields[5] || 0; // Establece un valor predeterminado para edad
            const genero = fields[6] || '';
            
           
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_CIUDADANO (dpi, nombre, apellido, edad, genero, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)`, [dpi, nombre, apellido, edad, genero, direccion, telefono]);
        }

        const tempClientesData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_CIUDADANO`, []);
        console.log(tempClientesData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla clientes
        await db.querywithoutclose(connection, `INSERT INTO TSE.CIUDADANO (dpi, nombre, apellido, edad, genero, direccion, telefono) SELECT dpi, nombre, apellido, edad, genero, direccion, telefono FROM TSE.TEMP_CIUDADANO`, []);


        // * carga de datos csv a tabla temporal DEPARTAMENTOS
        
        const datosdepa = fs.readFileSync(filePath_dep, 'utf-8');
        const linesdepa = datosdepa.split('\n');
        for (let i = 1; i < linesdepa.length; i++) {
            const fields = linesdepa[i].split(',');       
            const id_dep = fields[0] || 0; 
            const nombre = fields[1] || '';
        
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_DEPTO (id_dep, nombre) VALUES (?, ?)`, [id_dep, nombre]);
        }

        const tempDEPTOData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_DEPTO`, []);
        console.log(tempDEPTOData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla DEPARTAMENTO
        await db.querywithoutclose(connection, `INSERT INTO TSE.DEPARTAMENTO (id_dep, nombre) SELECT id_dep, nombre FROM TSE.TEMP_DEPTO`, []);



         // * carga de datos csv a tabla temporal CARGO
        
         const datoscargo = fs.readFileSync(filePath_cargo, 'utf-8');
         const linescargo = datoscargo.split('\n');
         for (let i = 1; i < (linescargo.length)-1; i++) {
             const fields = linescargo[i].split(',');       
             const id_cargo = fields[0] || 0; 
             const cargo = fields[1] || '';
             
            if (id_cargo!=-1 && cargo!="NULO") {

                // Insertar los datos en la tabla temporal
             await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_CARGO (id_cargo, cargo) VALUES (?, ?)`, [id_cargo, cargo]); 

            } else {
                const nx= "NULO";
                const mx= -1;
                                 // Insertar los datos en la tabla temporal
                                 await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_CARGO (id_cargo, cargo) VALUES (?, ?)`, [mx, nx]);
            } 
           
           
            
            
         }
 
         const tempCARGOData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_CARGO`, []);
         console.log(tempCARGOData);
 
         // por ultimo pasamos los datos de la tabla temporal a la tabla DEPARTAMENTO
         await db.querywithoutclose(connection, `INSERT INTO TSE.CARGO (id_cargo, cargo) SELECT id_cargo, cargo FROM TSE.TEMP_CARGO`, []);



         // * carga de datos csv a tabla temporal PARTIDO
        
         const datospartido = fs.readFileSync(filePath_partido, 'utf-8');
         const linespartido = datospartido.split('\n');
         for (let i = 1; i < (linespartido.length)-1; i++) {
             const fields = linespartido[i].split(',');       
             const id_partido = fields[0] || 0; 
             const nombre = fields[1] || '';
             const siglas = fields[2] || '';
             const fundacion = fields[3] || '01/01/2023';
            
             if (id_partido!=-1 && nombre!="NULO" && siglas!="NULO" && fundacion!="01/01/2023") {
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_PARTIDO (id_partido, nombre, siglas, fundacion) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'))`, [id_partido, nombre, siglas, fundacion]);    

             }else{
                const nx= "NULO";
                const sad="01/01/2023";
                const mx= -1;

                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_PARTIDO (id_partido, nombre, siglas, fundacion) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'))`, [mx, nx, nx, sad]);    
             }
            
            
         }
 
         const tempPARTIDOData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_PARTIDO`, []);
         console.log(tempPARTIDOData);
 
         // por ultimo pasamos los datos de la tabla temporal a la tabla DEPARTAMENTO
         await db.querywithoutclose(connection, `INSERT INTO TSE.PARTIDO (id_partido, nombre, siglas, fundacion) SELECT id_partido, nombre, siglas, fundacion FROM TSE.TEMP_PARTIDO`, []);



         // * carga de datos csv a tabla temporal MESA
        
         const datosmesa = fs.readFileSync(filePath_mesa, 'utf-8');
         const linesmesa = datosmesa.split('\n');
         for (let i = 1; i < (linesmesa.length)-1; i++) {
             const fields = linesmesa[i].split(',');       
             const id_mesa = fields[0] || 0; 
             const id_dep = fields[1] || 0;
             
           

            // Insertar los datos en la tabla temporal
             await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_MESA (id_mesa, id_dep) VALUES (?, ?)`, [id_mesa, id_dep]); 

         
         }
 
         const tempmesaData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_MESA`, []);
         console.log(tempmesaData);
 
         // por ultimo pasamos los datos de la tabla temporal a la tabla DEPARTAMENTO
         await db.querywithoutclose(connection, `INSERT INTO TSE.MESA (id_mesa, id_dep) SELECT id_mesa, id_dep FROM TSE.TEMP_MESA`, []);



         // * carga de datos csv a tabla temporal CANDIDATO
        
         const datoscandidato = fs.readFileSync(filePath_candidato, 'utf-8');
         const linescandidato = datoscandidato.split('\n');
         for (let i = 1; i < (linescandidato.length)-1; i++) {
             const fields = linescandidato[i].split(',');       
             const id_candidato = fields[0] || 0; 
             const nombre = fields[1] || '';
             const fecha_nac = fields[2] || '01/01/2023';
             const partido_id_partido = fields[3] || 0;
             const cargo_id_cargo = fields[4] || 0;
            
             if (id_candidato!=-1 && cargo_id_cargo!=-1 && partido_id_partido!=-1 && fecha_nac!="01/01/2023") {
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_CANDIDATO (id_candidato, nombre, fecha_nac, id_cargo, id_partido) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?)`, [id_candidato, nombre, fecha_nac, cargo_id_cargo, partido_id_partido]);    
             }else{
                const nx= "NULO";
                const sad="01/01/2023";
                const mx= -1;
                // Insertar los datos en la tabla temporal
                await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_CANDIDATO (id_candidato, nombre, fecha_nac, id_cargo, id_partido) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?)`, [mx, nx, sad, mx, mx]);    
             }
            
            
         }
 
         const tempCANData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_CANDIDATO`, []);
         console.log(tempCANData);
 
         // por ultimo pasamos los datos de la tabla temporal a la tabla CANDIDATO
         await db.querywithoutclose(connection, `INSERT INTO TSE.CANDIDATO (id_candidato, nombre, fecha_nac, id_cargo, id_partido) SELECT id_candidato, nombre, fecha_nac, id_cargo, id_partido FROM TSE.TEMP_CANDIDATO`, []);



        // * carga de datos csv a tabla temporal VOTO
        
        const datosvotaciones = fs.readFileSync(filePath_voto, 'utf-8');
        const linesvota = datosvotaciones.split('\n');
        for (let i = 1; i < (linesvota.length)-1; i++) {
            const fields = linesvota[i].split(',');       
            const idvoto = fields[0] || 0; 
            const m_id = fields[3] || 0;
            const c_dpi = fields[2] || 0;
            const fechahora = fields[4] || '01/01/2023 11:47';
            
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_VOTO(idvoto, fechahora, dpi, id_mesa) VALUES (?, STR_TO_DATE(?, '%d/%m/%Y %T'), ?, ?)`, [idvoto, fechahora, c_dpi, m_id]);    
            
        }

        const tempVOTData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_VOTO`, []);
        console.log(tempVOTData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla CANDIDATO
        await db.querywithoutclose(connection, `INSERT IGNORE INTO TSE.VOTO (idvoto, fechahora, dpi, id_mesa) SELECT idvoto, fechahora, dpi, id_mesa FROM TSE.TEMP_VOTO`, []); 


        // * carga de datos csv a tabla temporal DETALLE VOTO
        
        const datosdvoto = fs.readFileSync(filePath_voto, 'utf-8');
        const linesdvoto = datosdvoto.split('\n');
        for (let i = 1; i < (linesdvoto.length)-1; i++) {
            const fields = linesdvoto[i].split(',');       
            const idvoto = fields[0] || 0; 
            const id_candidato = fields[1] || 0;
          
            // Insertar los datos en la tabla temporal
            await db.querywithoutclose(connection, `INSERT INTO TSE.TEMP_DETALLE_VOTO(idvoto, id_candidato) VALUES (?, ?)`, [idvoto, id_candidato]);    
            
           
           
        }

        const tempDVOTData = await db.querywithoutclose(connection, `SELECT * FROM TSE.TEMP_DETALLE_VOTO`, []);
        console.log(tempDVOTData);

        // por ultimo pasamos los datos de la tabla temporal a la tabla CANDIDATO
        await db.querywithoutclose(connection, `INSERT INTO TSE.DETALLE_VOTO ( idvoto, id_candidato) SELECT idvoto, id_candidato FROM TSE.TEMP_DETALLE_VOTO`, []); 

        //! Cierra la conexión
        await connection.end();

        res.status(200).json({
            body: { res: true, message: 'TABLAS TEMPORALES - SUCCESSFULLY' },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            body: { res: false, message: 'ERROR AL CREAR TABLAS TEMPORALES', error },
        });
    }
}
