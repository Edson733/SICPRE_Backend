const {query} = require('../../../utils/mysql');

const findAll = async() => {
    const sql = `SELECT * FROM providers;`;
    return await query(sql, []);
};

const findEnable = async() => {
    const sql = `SELECT * FROM providers WHERE status_pvd = 1;`;
    return await query(sql, []);
};

const findById = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `SELECT * FROM providers WHERE id_pvd = ?;`;
    return await query(sql, [id]);
};

const save = async(provider) => {
    if(!provider.rfc_pvd) throw Error('Missing fields: rfc_pvd');
    if(!provider.name_pvd) throw Error('Missing fields: name_pvd');
    if(!provider.dirFis_pvd) throw Error('Missing fields: dirFis_pvd');
    if(!provider.dirSuc_pvd) throw Error('Missing fields: dirSuc_pvd');
    if(!provider.phone_pvd) throw Error('Missing fields: phone_pvd');
    if(!provider.email_pvd) throw Error('Missing fields: email_pvd');
    const sql = `INSERT INTO providers(rfc_pvd, name_pvd, dirFis_pvd, dirSuc_pvd, phone_pvd, email_pvd) 
        VALUES(?, ?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [provider.rfc_pvd, provider.name_pvd, provider.dirFis_pvd, 
        provider.dirSuc_pvd, provider.phone_pvd, provider.email_pvd]);
    return {...provider, id: insertedId};
};

const update = async(provider) => {
    if(!provider.rfc_pvd) throw Error('Missing fields: rfc_pvd');
    if(!provider.name_pvd) throw Error('Missing fields: name_pvd');
    if(!provider.dirFis_pvd) throw Error('Missing fields: dirFis_pvd');
    if(!provider.dirSuc_pvd) throw Error('Missing fields: dirSuc_pvd');
    if(!provider.phone_pvd) throw Error('Missing fields: phone_pvd');
    if(!provider.email_pvd) throw Error('Missing fields: email_pvd');
    if(!provider.id_pvd) throw Error('Missing fields: id_pvd');
    const sql = `UPDATE providers SET rfc_pvd = ?, name_pvd = ?, dirFis_pvd = ?, dirSuc_pvd = ?, 
        phone_pvd = ?, email_pvd = ?, status_pvd = 1 WHERE id_pvd = ?;`;
    return await query(sql, [provider.rfc_pvd, provider.name_pvd, provider.dirFis_pvd, provider.dirSuc_pvd, 
        provider.phone_pvd, provider.email_pvd, provider.id_pvd]);
};

const disable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE providers SET status_pvd = 0 WHERE id_pvd = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE providers SET status_pvd = 1 WHERE id_pvd = ?;`;
    return await query(sql, [id]);
};

module.exports = {
    findAll, 
    findEnable, 
    findById, 
    save, 
    update, 
    disable, 
    enable
};