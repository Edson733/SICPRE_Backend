const mysql = require('mysql');
require('dotenv').config();

const client = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}); //Creamos una alberca de conexiones -> Maximo 5 al mismo tiempo

const query = (sql, params) => { //1.- Statement 2.- Valores
    return new Promise((resolve, reject) => {
        client.getConnection((err, conn) => {
            if (err) {
                console.error("Error al obtener la conexión: ", err);
                reject(err);
                return;
            }
            conn.query(sql, params, (err, rows) => {
                conn.release();
                if (err) {
                    console.error("Error en la consulta: ", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    });
};

module.exports = {
    query
};