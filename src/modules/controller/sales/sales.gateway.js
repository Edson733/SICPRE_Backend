//Importa la funcion para interactuar con la base de datos
const {query} = require('../../../utils/mysql');

//Funcion para buscar todas las ventas en la base de datos
const findAll = async() => {
    //Prepara una consulta SQL para seleccionar informacion de ventas
    const sql = `SELECT sales.id_sls, products.nombre_pdt, users.name_usr, sales.totalCount_sls, sales.status_sls FROM sales JOIN products 
        JOIN users ON sales.product_sls = products.id_pdt && sales.client_sls = users.usuarioId_usr;`;
    return await query(sql, []); //Ejecuta la consulta y devuelve los resultados
};

//Funcion para buscar todas las ventas habilitadas en la base de datos
const findEnable = async() => {
    const sql = `SELECT sales.id_sls, products.nombre_pdt, users.name_usr, sales.totalCount_sls, sales.status_sls FROM sales JOIN products 
        JOIN users ON sales.product_sls = products.id_pdt && sales.client_sls = users.usuarioId_usr WHERE status_sls = 1;`;
    return await query(sql, []);
};

//Funcion para buscar una venta por su ID
const findById = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `SELECT sales.id_sls, products.nombre_pdt, users.name_usr, sales.totalCount_sls, sales.status_sls FROM sales JOIN products 
        JOIN users ON sales.product_sls = products.id_pdt && sales.client_sls = users.usuarioId_usr WHERE id_sls = ?;`;
    return await query(sql, [id]);
};

//Funcion para insertar una nueva venta en la base de datos
const save = async(sales) => {
    //Valida que se proporcionen los campos necesarios de la venta
    if(!sales.product_sls) throw Error('Missing fields: product_sls');
    if(!sales.client_sls) throw Error('Missing fields: client_sls');
    if(!sales.totalCount_sls) throw Error('Missing fields: totalCount_sls');
    const sql = `INSERT INTO sales(product_sls, client_sls, totalCount_sls) VALUES(?, ?, ?);`;
    const {insertedId} = await query(sql, [sales.product_sls, sales.client_sls, sales.totalCount_sls]);
    return {...sales, id: insertedId};
};

//Funcion para actualizar la informacion de una venta en la base de datos
const update = async(sales) => {
    if(!sales.product_sls) throw Error('Missing fields: product_sls');
    if(!sales.client_sls) throw Error('Missing fields: client_sls');
    if(!sales.totalCount_sls) throw Error('Missing fields: totalCount_sls');
    if(!sales.id_sls) throw Error('Missing fields: id_sls');
    const sql = `UPDATE sales SET product_sls = ?, client_sls = ?, totalCount_sls = ?, status_sls = 1 WHERE id_sls = ?;`;
    return await query(sql, [sales.product_sls, sales.client_sls, sales.totalCount_sls, sales.id_sls]);
};

//Funcion para deshabilitar una venta en la base de datos
const disable = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `UPDATE sales SET status_sls = 0 WHERE id_sls = ?;`;
    return await query(sql, [id]);
};

//Funcion para habilitar una venta previamente deshabilitada en la base de datos
const enable = async(id) => {
    if(isNaN(id)) throw Error('Wrong type: Is not number');
    if(!id) throw Error('Missing fields: id');
    const sql = `UPDATE sales SET status_sls = 1 WHERE id_sls = ?;`;
    return await query(sql, [id]);
};

//Exporta las funciones para ser usadas en otros modulos
module.exports = {
    findAll,
    findEnable,
    findById,
    save,
    update,
    disable,
    enable
};