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



## ENTIDADES 📖

NOMBRE |  Definición 
------------ | -------------
`CIUDADANO` | Su función es acceder a la información que se solicita, a través de la app, para luego combinarla y devolverla al usuario final
`VOTO` | Frontend es la parte de un sitio web que interactúa con los usuarios, por eso decimos que está del lado del cliente. 
`DETALLE_VOTO` | El paquete package.json es el corazón de cualquier proyecto de Node, registra metadatos importantes sobre un proyecto que se requiere
`CARGO` | Paquetes que necesitamos en un proyecto mientras estamos desarrollándolo, pero una vez tenemos el código generado del proyecto, no vuelven a hacer falta.
`CANDIDATO` | Es un marco o esquema de trabajo generalmente utilizado por programadores para realizar el desarrollo de software
`PARTIDO` | Un componente en Angular es un elemento que está compuesto por: Un archivo que será nuestro Template (app. component. html), el cual es nuestro HTML, que es el que se va a visualizar en la interfaz de usuario, la vista o en términos más simples lo que vas a ver en la página.
`MESA` | Un servicio es una clase, comúnmente decorada con el decorador Injector de Angular, mismo que indica que este Servicio puede inyectar otras dependencias de la aplicación, ya sean otros servicios como el de Http para hacer consultas AJAX.
`DEPARTAMENTO` | La petición o HTTP request es el mensaje que se envía desde el cliente al servidor para solicitar un resource.



```
Universidad San Carlos de Guatemala 2023
Programador: Marlon Isaí Figueroa Farfán
Carnet: 201904013
```
