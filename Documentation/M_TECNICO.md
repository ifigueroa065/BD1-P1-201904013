# :satellite: MANUAL TÉCNICO 

Este proyecto se plantea como un plan piloto que busca simular y perfeccionar los procedimientos electorales, con el objetivo de lograr elecciones futuras más eficientes y transparentes.


##  :construction: HERRAMIENTAS :construction:

- :ballot_box_with_check:  NodeJs
- :ballot_box_with_check:  Mysql
- :ballot_box_with_check:  postman

## ESTRUCTURA BÁSICA DE API
- :file_folder: src
    - :open_file_folder: controllers  | Aquí se encuentran los archivos controladores que manejan las solicitudes HTTP.
    - :open_file_folder: db
        - Este directorio alberga los archivos relacionados con la base de datos.
            - `conexion.js`: Archivo de conexión a la base de datos.
            - `config.js`: Archivo de configuración de la base de datos.
    - :open_file_folder: routes | En esta carpeta se encuentran los archivos de rutas de la API.
- :page_facing_up: app.js | El archivo principal de la aplicación que configura y ejecuta el servidor.
- :page_facing_up: index.js | Este archivo inicia la aplicación y escucha las solicitudes HTTP.

### Descripción de Carpetas y Archivos
- :open_file_folder: controllers: Aquí se guardan los archivos controladores que gestionan la lógica de la API. Cada controlador debería manejar un conjunto específico de rutas o recursos.

-  :open_file_folder: db: Este directorio contiene archivos relacionados con la base de datos. conexion.js se encarga de establecer la conexión con la base de datos, y config.js almacena la configuración de la base de datos, como la URL y las credenciales de acceso.

- :open_file_folder: routes: En esta carpeta, se definen las rutas de la API. Cada archivo de ruta debería especificar las rutas y los controladores asociados a ellas.

- :page_facing_up: app.js: Este archivo es el punto de entrada principal de la aplicación. Aquí se configuran los middleware, se establece el servidor HTTP y se importan las rutas.

- :page_facing_up: index.js: Este archivo es responsable de iniciar la aplicación y hacerla escuchar en un puerto específico. Es elarchivo global de la API
  
- :page_facing_up: .env: este archivo contiene las variables de entorno de la aplicación, como la URL de la base de datos y el puerto en el que se ejecuta la aplicación.


## :recycle: Levantar proyecto :recycle:


Para ejecutar el Backend y Frontend necesitas instalar todas sus dependencias con el siguiente comando
> **Nota:** Recuerda que este comando se ejecuta donde se ubica el package.json
```sh
npm install
```




### SCRIPT CREADO PARA ESTE MODELO

```mysql
-- CREAR BASE DE DATOS

CREATE SCHEMA IF NOT EXISTS TSE;

--  TABLA CIUDADANO

CREATE TABLE IF NOT EXISTS TSE.CIUDADANO (
  dpi VARCHAR(13)  NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  edad INT NOT NULL,
  genero CHAR(1) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(10) NOT NULL,
  PRIMARY KEY (dpi));

-- TABLA DEPARTAMENTO

CREATE TABLE IF NOT EXISTS TSE.DEPARTAMENTO (
  id_dep INTEGER NOT NULL PRIMARY KEY ,
  nombre VARCHAR(25) NOT NULL
);


-- TABLA CARGO

CREATE TABLE IF NOT EXISTS TSE.CARGO (
    id_cargo INTEGER NOT NULL PRIMARY KEY,
    cargo VARCHAR(100) NOT NULL
);


-- TABLA PARTIDO

CREATE TABLE IF NOT EXISTS TSE.PARTIDO (
  id_partido INTEGER NOT NULL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  siglas VARCHAR(50) NOT NULL,
  fundacion DATE NOT NULL
);

-- TABLA MESA

CREATE TABLE IF NOT EXISTS TSE.MESA (
  id_mesa INTEGER NOT NULL PRIMARY KEY,
  id_dep INTEGER NOT NULL,
  CONSTRAINT FK_depto FOREIGN KEY (id_dep) REFERENCES TSE.DEPARTAMENTO(id_dep)
);

-- TABLA CANDIDATO

CREATE TABLE IF NOT EXISTS TSE.CANDIDATO (
  id_candidato INTEGER NOT NULL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  fecha_nac DATE NOT NULL,
  id_cargo INTEGER NOT NULL,
  id_partido INTEGER NOT NULL,
  CONSTRAINT FK_cargo FOREIGN KEY (id_cargo) REFERENCES TSE.CARGO(id_cargo),
  CONSTRAINT FK_partido FOREIGN KEY (id_partido) REFERENCES TSE.PARTIDO(id_partido)

);


-- TABLA VOTO

CREATE TABLE IF NOT EXISTS TSE.VOTO (
  idvoto INTEGER NOT NULL PRIMARY KEY,
  fechahora DATETIME NOT NULL,
  dpi VARCHAR(13) NOT NULL,
  id_mesa INTEGER NOT NULL,
  CONSTRAINT FK_ciudadano FOREIGN KEY (dpi) REFERENCES TSE.CIUDADANO (dpi),
  CONSTRAINT FK_mesa FOREIGN KEY (id_mesa) REFERENCES TSE.MESA (id_mesa)
);


-- TABLA DETALLE VOTO

CREATE TABLE IF NOT EXISTS TSE.DETALLE_VOTO (
  id_detalle INTEGER AUTO_INCREMENT  PRIMARY KEY,
  idvoto INTEGER NOT NULL,
  id_candidato INTEGER NOT NULL,
  CONSTRAINT FK_idvoto FOREIGN KEY (idvoto) REFERENCES TSE.VOTO (idvoto),
  CONSTRAINT FK_candi FOREIGN KEY (id_candidato) REFERENCES TSE.CANDIDATO (id_candidato)
);
```


# Modelo Relacional de la Base de Datos TSE

## Tabla CIUDADANO
- Almacena información sobre los ciudadanos que votan en las elecciones.
- Clave primaria: `dpi` (Documento Personal de Identificación).
- Campos: `nombre`, `apellido`, `edad`, `genero`, `direccion`, y `telefono`.

## Tabla DEPARTAMENTO
- Almacena información sobre los departamentos geográficos.
- Clave primaria: `id_dep`.
- Campo: `nombre` (nombre del departamento).

## Tabla CARGO
- Almacena información sobre los diferentes cargos que pueden ser elegidos en una elección.
- Clave primaria: `id_cargo`.
- Campo: `cargo` (nombre del cargo).

## Tabla PARTIDO
- Almacena información sobre los partidos políticos.
- Clave primaria: `id_partido`.
- Campos: `nombre`, `siglas`, y `fundacion` (fecha de fundación).

## Tabla MESA
- Almacena información sobre las mesas de votación.
- Clave primaria: `id_mesa`.
- Clave foránea: `id_dep` (relaciona con la tabla DEPARTAMENTO).

## Tabla CANDIDATO
- Almacena información sobre los candidatos que participan en una elección.
- Clave primaria: `id_candidato`.
- Campos: `nombre`, `fecha_nac`, `id_cargo`, y `id_partido`.
- Claves foráneas: `id_cargo` (relaciona con la tabla CARGO) y `id_partido` (relaciona con la tabla PARTIDO).

## Tabla VOTO
- Almacena información sobre los votos emitidos por los ciudadanos.
- Clave primaria: `idvoto`.
- Campos: `fechahora`, `dpi`, y `id_mesa`.
- Claves foráneas: `dpi` (relaciona con la tabla CIUDADANO) y `id_mesa` (relaciona con la tabla MESA).

## Tabla DETALLE VOTO
- Almacena detalles sobre los votos emitidos, incluyendo a qué candidato se ha votado en cada voto.
- Clave primaria: `id_detalle`.
- Campos: `idvoto` e `id_candidato`.
- Claves foráneas: `idvoto` (relaciona con la tabla VOTO) y `id_candidato` (relaciona con la tabla CANDIDATO).

### Relaciones:
- `CIUDADANO.dpi` está relacionada con `VOTO.dpi` mediante la clave foránea.
- `DEPARTAMENTO.id_dep` está relacionada con `MESA.id_dep` mediante la clave foránea.
- `CARGO.id_cargo` está relacionada con `CANDIDATO.id_cargo` mediante la clave foránea.
- `PARTIDO.id_partido` está relacionada con `CANDIDATO.id_partido` mediante la clave foránea.
- `CIUDADANO.dpi` está relacionada con `VOTO.dpi` mediante la clave foránea.
- `MESA.id_mesa` está relacionada con `VOTO.id_mesa` mediante la clave foránea.
- `VOTO.idvoto` está relacionada con `DETALLE VOTO.idvoto` mediante la clave foránea.
- `CANDIDATO.id_candidato` está relacionada con `DETALLE VOTO.id_candidato` mediante la clave foránea.



```
Universidad San Carlos de Guatemala 2023
Programador: Marlon Isaí Figueroa Farfán
Carnet: 201904013
```
