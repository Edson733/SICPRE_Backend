const {query} = require('../../../utils/mysql');

const findAll = async() => {
    const sql = `SELECT provider_control.id_pcl, provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, providers.name_pvd, 
        provider_control.status_pcl FROM provider_control JOIN providers ON 
        provider_control.provider_pcl_pvd = providers.id_pvd;`;
    return await query(sql, []);
};

const findEnable = async() => {
    const sql = `SELECT provider_control.id_pcl, provider_control.prinCont_pcl, provider_control.numExt_pcl, 
        provider_control.sitWeb_pcl, provider_control.startDate_pcl, provider_control.evalDes_pcl, 
        provider_control.category_pcl, provider_control.limCre_pcl, provider_control.hisPag_pcl, 
        provider_control.datBan_pcl, provider_control.comentary_pcl, providers.name_pvd, 
        provider_control.status_pcl FROM provider_control JOIN providers ON 
        provider_control.provider_pcl_pvd = providers.id_pvd WHERE status_pcl = 1;`;
    return await query(sql, []);
};

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

const save = async(provider_control) => {
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

const disable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE provider_control SET status_pcl = 0 WHERE id_pcl = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE provider_control SET status_pcl = 1 WHERE id_pcl = ?;`;
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