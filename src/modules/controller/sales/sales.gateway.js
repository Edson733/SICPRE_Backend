const {query} = require('../../../utils/mysql');

const findAll = async() => {
    const sql = `SELECT sales.id_sls, products.nombre_pdt, users.name_usr, sales.totalCount_sls, sales.status_sls FROM sales JOIN products 
        JOIN users ON sales.product_sls = products.id_pdt && sales.client_sls = users.usuarioId_usr;`;
    return await query(sql, []);
};

const findEnable = async() => {
    const sql = `SELECT sales.id_sls, products.nombre_pdt, users.name_usr, sales.totalCount_sls, sales.status_sls FROM sales JOIN products 
        JOIN users ON sales.product_sls = products.id_pdt && sales.client_sls = users.usuarioId_usr WHERE status_sls = 1;`;
    return await query(sql, []);
};

const findById = async(id) => {
    if(Number.isNaN(id)) throw Error('Wrong type');
    if(!id) throw Error('Missing fields');
    const sql = `SELECT sales.id_sls, products.nombre_pdt, users.name_usr, sales.totalCount_sls, sales.status_sls FROM sales JOIN products 
        JOIN users ON sales.product_sls = products.id_pdt && sales.client_sls = users.usuarioId_usr WHERE id_sls = ?;`;
    return await query(sql, [id]);
};

const save = async(sales) => {
    if(!sales.product_sls || !sales.client_sls || !sales.totalCount_sls) throw Error('Missing fields');
    const sql = `INSERT INTO sales(product_sls, client_sls, totalCount_sls) VALUES(?, ?, ?);`;
    const {insertedId} = await query(sql, [sales.product_sls, sales.client_sls, sales.totalCount_sls]);
    return {...sales, id: insertedId};
};

const update = async(sales) => {
    if(!sales.product_sls || !sales.client_sls || !sales.totalCount_sls || !sales.id_sls) throw Error('Missing fields');
    const sql = `UPDATE sales SET product_sls = ?, client_sls = ?, totalCount_sls = ?, status_sls = 1 WHERE id_sls = ?;`;
    return await query(sql, [sales.product_sls, sales.client_sls, sales.totalCount_sls, sales.id_sls]);
};

const disable = async(id) => {
    if(Number.isNaN(id)) throw Error('Wrong type');
    if(!id) throw Error('Missing fields');
    const sql = `UPDATE sales SET status_sls = 0 WHERE id_sls = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if(Number.isNaN(id)) throw Error('Wrong type');
    if(!id) throw Error('Missing fields');
    const sql = `UPDATE sales SET status_sls = 1 WHERE id_sls = ?;`;
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