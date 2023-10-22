const {query} = require('../../../utils/mysql');

const findAll = async() => {
    const sql = `SELECT * FROM users;`;
    return await query(sql, []);
};

const findEnable = async() => {
    const sql = `SELECT * FROM users WHERE status_usr = 1;`;
    return await query(sql, []);
};

const findById = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `SELECT * FROM users WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

const save = async(users) => {
    if(!users.name_usr) throw Error("Missing fields: name_usr");
    if(!users.lastname_usr) throw Error("Missing fields: lastname_usr");
    if(!users.role_usr) throw Error("Missing fields: role_usr");
    if(!users.email_usr) throw Error("Missing fields: email_usr");
    if(!users.password_usr) throw Error("Missing fields: password_usr");
    const sql = `INSERT INTO users(name_usr, lastname_usr, role_usr, email_usr, password_usr) VALUES(?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.lastname_usr, users.role_usr, users.email_usr, users.password_usr]);
    return {...users, id: insertedId};
};

const saveUs = async(users) => {
    if(!users.name_usr) throw Error("Missing fields: name_usr");
    if(!users.lastname_usr) throw Error("Missing fields: lastname_usr");
    if(!users.email_usr) throw Error("Missing fields: email_usr");
    if(!users.password_usr) throw Error("Missing fields: password_usr");
    const sql = `INSERT INTO users(name_usr, lastname_usr, role_usr, email_usr, password_usr) VALUES(?, ?, "Cliente", ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.lastname_usr, users.email_usr, users.password_usr]);
    return {...users, id: insertedId};
}

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

const disable = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `UPDATE users SET status_usr = 0 WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `UPDATE users SET status_usr = 1 WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

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