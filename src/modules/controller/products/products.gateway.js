const {query} = require('../../../utils/mysql');

const findAll = async() => { 
    const sql = `SELECT products.id_pdt, products.fit_pdt, products.num_pdt, products.skuPrenda_pdt, products.nombre_pdt, products.matKin_pdt, 
        products.talla_pdt, products.consumo_pdt, products.tipTela_pdt, products.costoMT_pdt, products.costoTela_pdt, products.costoEtiqueta_pdt, 
        products.costoBoton_pdt, products.costoMaquila_pdt, products.costoAcabado_pdt, products.costoBordSeri_pdt, products.costoEmpaque_pdt, 
        products.costoTrans_pdt, products.costoAdmin_pdt, products.costoOtro_pdt, products.comisVenta_pdt, products.sumaTotal_pdt, 
        products.image_pdt, providers.name_pvd, products.status_pdt FROM products JOIN providers ON products.provider_pdt = providers.id_pvd;`;
    return await query(sql, []);
};

const findEnable = async() => {
    const sql = `SELECT products.id_pdt, products.fit_pdt, products.num_pdt, products.skuPrenda_pdt, products.nombre_pdt, products.matKin_pdt, 
        products.talla_pdt, products.consumo_pdt, products.tipTela_pdt, products.costoMT_pdt, products.costoTela_pdt, products.costoEtiqueta_pdt, 
        products.costoBoton_pdt, products.costoMaquila_pdt, products.costoAcabado_pdt, products.costoBordSeri_pdt, products.costoEmpaque_pdt, 
        products.costoTrans_pdt, products.costoAdmin_pdt, products.costoOtro_pdt, products.comisVenta_pdt, products.sumaTotal_pdt, 
        products.image_pdt, providers.name_pvd, products.status_pdt FROM products JOIN providers ON products.provider_pdt = providers.id_pvd 
        WHERE status_pdt = 1;`;
    return await query(sql, []);
};

const findById = async(id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT products.id_pdt, products.fit_pdt, products.num_pdt, products.skuPrenda_pdt, products.nombre_pdt, products.matKin_pdt, 
        products.talla_pdt, products.consumo_pdt, products.tipTela_pdt, products.costoMT_pdt, products.costoTela_pdt, products.costoEtiqueta_pdt, 
        products.costoBoton_pdt, products.costoMaquila_pdt, products.costoAcabado_pdt, products.costoBordSeri_pdt, products.costoEmpaque_pdt, 
        products.costoTrans_pdt, products.costoAdmin_pdt, products.costoOtro_pdt, products.comisVenta_pdt, products.sumaTotal_pdt, 
        products.image_pdt, providers.name_pvd, products.status_pdt FROM products JOIN providers ON products.provider_pdt = providers.id_pvd 
        WHERE id_pdt = ?;`;
    return await query(sql, [id]);
};

const save = async(product) => {
    if(!product.fit_pdt || !product.num_pdt || !product.skuPrenda_pdt || !product.nombre_pdt || !product.matKin_pdt || !product.talla_pdt || 
        !product.consumo_pdt || !product.tipTela_pdt || !product.costoMT_pdt || !product.costoTela_pdt || !product.costoEtiqueta_pdt || 
        !product.costoBoton_pdt || !product.costoMaquila_pdt || !product.costoAcabado_pdt || !product.costoBordSeri_pdt || 
        !product.costoEmpaque_pdt || !product.costoTrans_pdt || !product.costoAdmin_pdt || !product.costoOtro_pdt || !product.comisVenta_pdt || 
        !product.image_pdt || !product.provider_pdt) throw Error('Missing fields');
    const sql = `INSERT INTO products(fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, 
        costoTela_pdt, costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, 
        costoTrans_pdt, costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, image_pdt, provider_pdt) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?, ?);`;
    const {insertedId} = await query(sql, [product.fit_pdt, product.num_pdt, product.skuPrenda_pdt, product.nombre_pdt, product.matKin_pdt, 
        product.talla_pdt, product.consumo_pdt, product.tipTela_pdt, product.costoMT_pdt, product.costoTela_pdt, product.costoEmpaque_pdt, 
        product.costoBoton_pdt, product.costoMaquila_pdt, product.costoAcabado_pdt, product.costoBordSeri_pdt, product.costoEmpaque_pdt, 
        product.costoTrans_pdt, product.costoAdmin_pdt, product.costoOtro_pdt, product.comisVenta_pdt, product.image_pdt, product.provider_pdt]);
    return {...product, id: insertedId};
};

const update = async(product) => {
    if(!product.fit_pdt || !product.num_pdt || !product.skuPrenda_pdt || !product.nombre_pdt || !product.matKin_pdt || !product.talla_pdt || 
        !product.consumo_pdt || !product.tipTela_pdt || !product.costoMT_pdt || !product.costoTela_pdt || !product.costoEtiqueta_pdt || 
        !product.costoBoton_pdt || !product.costoMaquila_pdt || !product.costoAcabado_pdt || !product.costoBordSeri_pdt || 
        !product.costoEmpaque_pdt || !product.costoTrans_pdt || !product.costoAdmin_pdt || !product.costoOtro_pdt || !product.comisVenta_pdt || 
        !product.image_pdt || !product.provider_pdt || !product.id_pdt) throw Error('Missing fields');
    const sql = `UPDATE products SET fit_pdt = ?, num_pdt = ?, skuPrenda_pdt = ?, nombre_pdt = ?, matKin_pdt = ?, talla_pdt = ?, 
        consumo_pdt = ?, tipTela_pdt = ?, costoMT_pdt = ?, costoTela_pdt = ?, costoEtiqueta_pdt = ?, costoBoton_pdt = ?, costoMaquila_pdt = ?, 
        costoAcabado_pdt = ?, costoBordSeri_pdt = ?, costoEmpaque_pdt = ?, costoTrans_pdt = ?, costoAdmin_pdt = ?, costoOtro_pdt = ?, 
        comisVenta_pdt = ?, image_pdt = ?, status_pdt = 1, provider_pdt = ? WHERE id_pdt = ?;`;
    return await query(sql, [product.fit_pdt, product.num_pdt, product.skuPrenda_pdt, product.nombre_pdt, product.matKin_pdt, product.talla_pdt, 
        product.consumo_pdt, product.tipTela_pdt, product.costoMT_pdt, product.costoTela_pdt, product.costoEtiqueta_pdt, product.costoBoton_pdt, 
        product.costoMaquila_pdt, product.costoAcabado_pdt, product.costoBordSeri_pdt, product.costoEmpaque_pdt, product.costoTrans_pdt, 
        product.costoAdmin_pdt, product.costoOtro_pdt, product.comisVenta_pdt, product.image_pdt, product.provider_pdt, product.id_pdt]);
};

const disable = async(id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE products SET status_pdt = 0 WHERE id_pdt = ?;`;
    return await query(sql, [id]);
};

const enable = async(id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `UPDATE products SET status_pdt = 1 WHERE id_pdt = ?;`;
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