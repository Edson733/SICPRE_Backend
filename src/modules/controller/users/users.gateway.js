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
    if(Number.isNaN(id)) throw Error('Wrong type');
    if(!id) throw Error('Missing fields');
    const sql = `SELECT * FROM users WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

const save = async(users) => {
    if(!users.name_usr || !users.lastname_usr || !users.role_usr || !users.email_usr || !users.password_usr) throw Error("Missing fields");
    const sql = `INSERT INTO users(name_usr, lastname_usr, role_usr, email_usr, password_usr) VALUES(?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.lastname_usr, users.role_usr, users.email_usr, users.password_usr]);
    return {...users, id: insertedId};
};

const saveUs = async(users) => {
    if(!users.name_usr || !users.lastname_usr || !users.email_usr || !users.password_usr) throw Error("Missing fields");
    const sql = `INSERT INTO users(name_usr, lastname_usr, role_usr, email_usr, password_usr) VALUES(?, ?, "Cliente", ?, ?);`;
    const {insertedId} = await query(sql, [users.name_usr, users.lastname_usr, users.email_usr, users.password_usr]);
    return {...users, id: insertedId};
}

const update = async(users) => {
    if(!users.name_usr || !users.lastname_usr || !users.role_usr || !users.email_usr || !users.password_usr || !users.usuarioId_usr) 
        throw Error("Missing fields");
    const sql = `UPDATE users SET name_usr = ?, lastname_usr = ?, role_usr = ?, email_usr = ?, password_usr = ?, status_usr = 1 
        WHERE usuarioId_usr = ?;`;
    return await query(sql, [users.name_usr, users.lastname_usr, users.role_usr, users.email_usr, users.password_usr, users.usuarioId_usr]);
};

const disable = async(id) => {
    if(Number.isNaN(id)) throw Error('Wrong type');
    if(!id) throw Error('Missing fields');
    const sql = `UPDATE users SET status_usr = 0 WHERE usuarioId_usr = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if(Number.isNaN(id)) throw Error('Wrong type');
    if(!id) throw Error('Missing fields');
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