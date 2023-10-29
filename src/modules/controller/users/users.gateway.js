//Importa la funcion para interactuar con la base de datos
const {query} = require('../../../utils/mysql');

//Funcion para buscar todos los usuarios en la base de datos
const findAll = async() => {
    //Prepara una consulta SQL para seleccionar informacion de usuarios
    const sql = `SELECT * FROM users;`;
    return await query(sql, []); //Ejecuta la consulta y devuelve los resultados
};

//Funcion para buscar todos los usuarios habilitados en la base de datos
const findEnable = async() => {
    const sql = `SELECT * FROM users WHERE status_usr = 1;`;
    return await query(sql, []);
};

//Funcion para buscar un usuario por su ID
const findById = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `SELECT * FROM users WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

//Funcion para insertar un nuevo usuario en la base de datos
const save = async(users) => {
    //Valida que se proporcionen los campos necesarios del usuario
    if(!users.name_usr) throw Error("Missing fields: name_usr");
    if(!users.lastname_usr) throw Error("Missing fields: lastname_usr");
    if(!users.role_usr) throw Error("Missing fields: role_usr");
    if(!users.email_usr) throw Error("Missing fields: email_usr");
    if(!users.password_usr) throw Error("Missing fields: password_usr");
    const sql = `INSERT INTO users(name_usr, lastname_usr, role_usr, email_usr, password_usr) VALUES(?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.lastname_usr, users.role_usr, users.email_usr, users.password_usr]);
    return {...users, id: insertedId};
};

//Funcion para insertar un nuevo usuario con el rol de Cliente en la base de datos
const saveUs = async(users) => {
    if(!users.name_usr) throw Error("Missing fields: name_usr");
    if(!users.lastname_usr) throw Error("Missing fields: lastname_usr");
    if(!users.email_usr) throw Error("Missing fields: email_usr");
    if(!users.password_usr) throw Error("Missing fields: password_usr");
    const sql = `INSERT INTO users(name_usr, lastname_usr, role_usr, email_usr, password_usr) VALUES(?, ?, "Cliente", ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.lastname_usr, users.email_usr, users.password_usr]);
    return {...users, id: insertedId};
}

//Funcion para actualizar la informacion de un usuario en la base de datos
const update = async(users) => {
    if(!users.name_usr) throw Error("Missing fields: name_usr");
    if(!users.lastname_usr) throw Error("Missing fields: lastname_usr");
    if(!users.role_usr) throw Error("Missing fields: role_usr");
    if(!users.email_usr) throw Error("Missing fields: email_usr");
    if(!users.password_usr) throw Error("Missing fields: password_usr");
    if(!users.usuarioId_usr) throw Error("Missing fields: usuarioId_usr");
    const sql = `UPDATE users SET name_usr = ?, lastname_usr = ?, role_usr = ?, email_usr = ?, password_usr = ?, status_usr = 1 
        WHERE usuarioId_usr = ?;`;
    return await query(sql, [users.name_usr, users.lastname_usr, users.role_usr, users.email_usr, users.password_usr, users.usuarioId_usr]);
};

//Funcion para deshabilitar un usuario en la base de datos
const disable = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `UPDATE users SET status_usr = 0 WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

//Funcion para habilitar un usuario previamente deshabilitado en la base de datos
const enable = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `UPDATE users SET status_usr = 1 WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

//Exporta las funciones para ser usadas en otros modulos
module.exports = {
    findAll,
    findById,
    findEnable,
    save,
    saveUs,
    update,
    disable,
    enable
};