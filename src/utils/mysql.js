//Importa el modulo para trabajar con la base de datos MySQL
const mysql = require('mysql');
require('dotenv').config();

//Crea una piscina de conexiones MySQL para manejar multiples conexiones
const client = mysql.createPool({
    connectionLimit: 5, //Establece un limite maximo de 5 conexiones simultaneas a la base de datos
    host: process.env.DB_HOST, //Obtiene la direccion del servidor de la base de datos
    user: process.env.DB_USER, //Obtiene el nombre del usuario de la base de datos
    password: process.env.DB_PASSWORD, //Obtiene la contraseña de la base de datos
    database: process.env.DB_DATABASE, //Obtiene el nombre de la base de datos
    port: process.env.DB_PORT //Obtiene el puerto de la base de datos
});

//Funcion que realiza una consulta a la base de datos utilizando una conexion de la piscina
const query = (sql, params) => { //1.- Sentencia SQL, 2.- Parametros
    return new Promise((resolve, reject) => {
        client.getConnection((err, conn) => { //Obtiene una conexion de la piscina
            if (err) {
                console.error("Error al obtener la conexión: ", err);
                reject(err);
                return;
            }
            conn.query(sql, params, (err, rows) => { //Ejecuta la consulta utilizando la conexion
                conn.release(); //Libera la conexion una vez que la consulta ha finalizado
                if (err) {
                    console.error("Error en la consulta: ", err);
                    reject(err);
                } else {
                    resolve(rows); //Resuelve la promesa con los resultados de la consulta
                }
            });
        });
    });
};

//Exporta la funcion para que pueda ser utilizada en otros modulos
module.exports = {
    query
};