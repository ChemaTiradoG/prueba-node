# Node-prueba

Proyecto realizado como prueba entregable para aplicar a vacante

---
## Requisitos

Para desarrollo, es sólo necesario tener instalado Node.js.

## Configure app
Necesitaras tener acceso o tener montada la base de datos y configurar el archivo environment del proyecto con las credenciales
necesarias para crear la conexión.

Con el proyecto abierto en la consola de comandos o cualquier editor de texto compatible y con consola,
correr los siguientes comandos.

- npm install
- npm start

El comando `npm start` ejecutará el proyecto con nodemon incluido en las devDependencies.

## Base de datos
- Se incluye el archivo exportado de base de datos en la raíz del proyecto `prueba-node.sql`
- Se utilizó como motor de base de datos MariaDB compatible con MySQL

## Rutas principales
(Incluyo archivo configurado para probar rutas con Postman en raiz de proyecto `prueba-node.postman_collection.json`)

[GET] http://ec2-54-193-105-3.us-west-1.compute.amazonaws.com/
- URL de la API
- Sólo muestra una vista previa de la consola de inicialización del proyecto

[POST] http://ec2-54-193-105-3.us-west-1.compute.amazonaws.com/mutation/{"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
- Ruta principal para la función de inserción de DNA y su identificación, con ejemplo de formato incluido (con mutación)

Ejemplos: 
{"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]} (con mutación)
{"dna":["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]} (sin mutación)

[POST] http://ec2-54-193-105-3.us-west-1.compute.amazonaws.com/test
- Inserta una cantidad aleatoria de matrices generadas automaticamente y las devuelve en la respuesta
(puede utilizarse para guardar ejemplos de matrices)

[GET] http://ec2-54-193-105-3.us-west-1.compute.amazonaws.com/stats
- Devuelve estadísticas de las verificaciones de ADN: {“count_mutations”:40, “count_no_mutation”:100: “ratio”:0.4}

[DEL] http://ec2-54-193-105-3.us-west-1.compute.amazonaws.com/truncate
- Sirve para limpiar la tabla de verificaciones de ADN realizadas para pruebas

[GET] http://ec2-54-193-105-3.us-west-1.compute.amazonaws.com/ping
- Solo para recibir respuesta del servidor