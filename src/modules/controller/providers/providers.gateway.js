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
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM providers WHERE id_pvd = ?;`;
    return await query(sql, [id]);
};

const save = async(provider) => {
    if(!provider.rfc || !provider.name || !provider.dirFis || !provider.dirSuc || !provider.phone || !provider.email) throw Error('Missing fields');
    const sql = `INSERT INTO providers(rfc_pvd, name_pvd, dirFis_pvd, dirSuc_pvd, phone_pvd, email_pvd) VALUES(?, ?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [provider.rfc, provider.name, provider.dirFis, provider.dirSuc, provider.phone, provider.email]);
    return {...provider, id: insertedId};
};

const update = async(provider) => {
    if(!provider.rfc || !provider.name || !provider.dirFis || !provider.dirSuc || !provider.phone || !provider.email || !provider.id) throw Error('Missing fields');
    const sql = `UPDATE providers SET rfc_pvd = ?, name_pvd = ?, dirFis_pvd = ?, dirSuc_pvd = ?, phone_pvd = ?, email_pvd = ?, status_pvd = 1 WHERE id_pvd = ?;`;
    return await query(sql, [provider.rfc, provider.name, provider.dirFis, provider.dirSuc, provider.phone, provider.email, provider.id]);
};

const disable = async(id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE providers SET status_pvd = 0 WHERE id_pvd = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE providers SET status_pvd = 1 WHERE id_pvd = ?;`;
    return await query(sql, [id]);
};

module.exports = {
    findAll, findEnable, findById, save, update, disable, enable
};