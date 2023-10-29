//Importa la funcion para interactuar con la base de datos
const {query} = require('../../../utils/mysql');

//Funcion para buscar todos los controles de proveedores en la base de datos
const findAll = async() => {
    //Prepara una consulta SQL para seleccionar informacion de control de proveedores y proveedores
    const sql = `SELECT provider_control.id_pcl, provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, providers.name_pvd, 
        provider_control.status_pcl FROM provider_control JOIN providers ON 
        provider_control.provider_pcl_pvd = providers.id_pvd;`;
    return await query(sql, []); //Ejecuta la consulta y devuelve los resultados
};

//Funcion para buscar todos los controles de proveedores habilitados en la base de datos
const findEnable = async() => {
    const sql = `SELECT provider_control.id_pcl, provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, providers.name_pvd, 
        provider_control.status_pcl FROM provider_control JOIN providers ON 
        provider_control.provider_pcl_pvd = providers.id_pvd WHERE status_pcl = 1;`;
    return await query(sql, []);
};

//Funcion para buscar un control de proveedor por su ID
const findById = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `SELECT provider_control.id_pcl, provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, providers.name_pvd, 
        provider_control.status_pcl FROM provider_control JOIN providers ON 
        provider_control.provider_pcl_pvd = providers.id_pvd WHERE id_pcl = ?; `;
    return await query(sql, [id]);
};

//Funcion para insertar un nuevo control de proveedor en la base de datos
const save = async(provider_control) => {
    //Valida que se proporcionen los campos necesarios del control de proveedor
    if(!provider_control.prinCont_pcl) throw Error('Missing fields: prinCont_pcl');
    if(!provider_control.numExt_pcl) throw Error('Missing fields: numExt_pcl');
    if(!provider_control.sitWeb_pcl) throw Error('Missing fields: sitWeb_pcl');
    if(!provider_control.startDate_pcl) throw Error('Missing fields: startDate_pcl');
    if(!provider_control.evalDes_pcl) throw Error('Missing fields: evalDes_pcl');
    if(!provider_control.category_pcl) throw Error('Missing fields: category_pcl');
    if(!provider_control.limCre_pcl) throw Error('Missing fields: limCre_pcl');
    if(!provider_control.hisPag_pcl) throw Error('Missing fields: hisPag_pcl');
    if(!provider_control.datBan_pcl) throw Error('Missing fields: datBan_pcl');
    if(!provider_control.comentary_pcl) throw Error('Missing fields: comentary_pcl');
    if(!provider_control.provider_pcl_pvd) throw Error('Missing fields: provider_pcl_pvd');
    const sql = `INSERT INTO provider_control(prinCont_pcl, numExt_pcl, sitWeb_pcl, startDate_pcl, evalDes_pcl, 
        category_pcl, limCre_pcl, hisPag_pcl, datBan_pcl, comentary_pcl, provider_pcl_pvd) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, provider_control.provider_pcl_pvd]);
    return {...provider_control, id: insertedId};
};

//Funcion para actualizar la informacion de un control de proveedor en la base de datos
const update = async(provider_control) => {
    if(!provider_control.prinCont_pcl) throw Error('Missing fields: prinCont_pcl');
    if(!provider_control.numExt_pcl) throw Error('Missing fields: numExt_pcl');
    if(!provider_control.sitWeb_pcl) throw Error('Missing fields: sitWeb_pcl');
    if(!provider_control.startDate_pcl) throw Error('Missing fields: startDate_pcl');
    if(!provider_control.evalDes_pcl) throw Error('Missing fields: evalDes_pcl');
    if(!provider_control.category_pcl) throw Error('Missing fields: category_pcl');
    if(!provider_control.limCre_pcl) throw Error('Missing fields: limCre_pcl');
    if(!provider_control.hisPag_pcl) throw Error('Missing fields: hisPag_pcl');
    if(!provider_control.datBan_pcl) throw Error('Missing fields: datBan_pcl');
    if(!provider_control.comentary_pcl) throw Error('Missing fields: comentary_pcl');
    if(!provider_control.provider_pcl_pvd) throw Error('Missing fields: provider_pcl_pvd');
    if(!provider_control.id_pcl) throw Error('Missing fields: id_pcl');
    const sql = `UPDATE provider_control SET prinCont_pcl = ?, numExt_pcl = ?, sitWeb_pcl = ?, 
        startDate_pcl = ?, evalDes_pcl = ?, category_pcl = ?, limCre_pcl = ?, hisPag_pcl = ?, datBan_pcl = ?, 
        comentary_pcl = ?, provider_pcl_pvd = ?, status_pcl = 1 WHERE id_pcl = ?;`;
    return await query(sql, [provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, provider_control.provider_pcl_pvd, 
        provider_control.id_pcl]);
};

//Funcion para deshabilitar un control de proveedor en la base de datos
const disable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE provider_control SET status_pcl = 0 WHERE id_pcl = ?;`;
    return await query(sql, [id]);
};

//Funcion para habilitar un control de proveedor previamente deshabilitado en la base de datos
const enable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE provider_control SET status_pcl = 1 WHERE id_pcl = ?;`;
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