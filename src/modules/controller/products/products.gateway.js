//Importa la funcion para interactuar con la base de datos
const {query} = require('../../../utils/mysql');

//Funcion para buscar todos los productos en la base de datos
const findAll = async() => {
    //Prepara una consulta SQL para seleccionar informacion de productos y proveedores
    const sql = `SELECT products.id_pdt, products.fit_pdt, products.num_pdt, products.skuPrenda_pdt, products.nombre_pdt, products.matKin_pdt, 
        products.talla_pdt, products.consumo_pdt, products.tipTela_pdt, products.costoMT_pdt, products.costoTela_pdt, products.costoEtiqueta_pdt, 
        products.costoBoton_pdt, products.costoMaquila_pdt, products.costoAcabado_pdt, products.costoBordSeri_pdt, products.costoEmpaque_pdt, 
        products.costoTrans_pdt, products.costoAdmin_pdt, products.costoOtro_pdt, products.comisVenta_pdt, products.sumaTotal_pdt, 
        products.image_pdt, providers.name_pvd, products.status_pdt FROM products JOIN providers ON products.provider_pdt = providers.id_pvd;`;
    return await query(sql, []); //Ejecuta la consulta y devuelve los resultados
};

//Funcion para buscar todos los productos habilitados en la base de datos
const findEnable = async() => {
    const sql = `SELECT products.id_pdt, products.fit_pdt, products.num_pdt, products.skuPrenda_pdt, products.nombre_pdt, products.matKin_pdt, 
        products.talla_pdt, products.consumo_pdt, products.tipTela_pdt, products.costoMT_pdt, products.costoTela_pdt, products.costoEtiqueta_pdt, 
        products.costoBoton_pdt, products.costoMaquila_pdt, products.costoAcabado_pdt, products.costoBordSeri_pdt, products.costoEmpaque_pdt, 
        products.costoTrans_pdt, products.costoAdmin_pdt, products.costoOtro_pdt, products.comisVenta_pdt, products.sumaTotal_pdt, 
        products.image_pdt, providers.name_pvd, products.status_pdt FROM products JOIN providers ON products.provider_pdt = providers.id_pvd 
        WHERE status_pdt = 1;`;
    return await query(sql, []);
};

//Funcion para buscar un producto por su ID
const findById = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `SELECT products.id_pdt, products.fit_pdt, products.num_pdt, products.skuPrenda_pdt, products.nombre_pdt, products.matKin_pdt, 
        products.talla_pdt, products.consumo_pdt, products.tipTela_pdt, products.costoMT_pdt, products.costoTela_pdt, products.costoEtiqueta_pdt, 
        products.costoBoton_pdt, products.costoMaquila_pdt, products.costoAcabado_pdt, products.costoBordSeri_pdt, products.costoEmpaque_pdt, 
        products.costoTrans_pdt, products.costoAdmin_pdt, products.costoOtro_pdt, products.comisVenta_pdt, products.sumaTotal_pdt, 
        products.image_pdt, providers.name_pvd, products.status_pdt FROM products JOIN providers ON products.provider_pdt = providers.id_pvd 
        WHERE id_pdt = ?;`;
    return await query(sql, [id]);
};

//Funcion para insertar un nuevo producto en la base de datos
const save = async(product) => {
    //Valida que se proporcionen los campos necesarios del producto
    if(!product.fit_pdt) throw Error('Missing field: fit_pdt');
    if(!product.num_pdt) throw Error('Missing field: num_pdt');
    if(!product.skuPrenda_pdt) throw Error('Missing field: skuPrenda_pdt');
    if(!product.nombre_pdt) throw Error('Missing field: nombre_pdt');
    if(!product.matKin_pdt) throw Error('Missing field: matKin_pdt');
    if(!product.talla_pdt) throw Error('Missing field: talla_pdt');
    //if(!product.consumo_pdt) throw Error('Missing field: consumo_pdt');
    if(!product.tipTela_pdt) throw Error('Missing field: tipTela_pdt');
    /*if(!product.costoMT_pdt) throw Error('Missing field: costoMT_pdt');
    if(!product.costoTela_pdt) throw Error('Missing field: costoTela_pdt');
    if(!product.costoEtiqueta_pdt) throw Error('Missing field: costoEtiqueta_pdt');
    if(!product.costoBoton_pdt) throw Error('Missing field: costoBoton_pdt');
    if(!product.costoMaquila_pdt) throw Error('Missing field: costoMaquila_pdt');
    if(!product.costoAcabado_pdt) throw Error('Missing field: costoAcabado_pdt');
    if(!product.costoBordSeri_pdt) throw Error('Missing field: costoBordSeri_pdt');
    if(!product.costoEmpaque_pdt) throw Error('Missing field: costoEmpaque_pdt');
    if(!product.costoTrans_pdt) throw Error('Missing field: costoTrans_pdt');
    if(!product.costoAdmin_pdt) throw Error('Missing field: costoAdmin_pdt');
    if(!product.costoOtro_pdt) throw Error('Missing field: costoOtro_pdt');
    if(!product.comisVenta_pdt) throw Error('Missing field: comisVenta_pdt');
    if(!product.image_pdt) throw Error('Missing field: image_pdt');*/
    if(!product.provider_pdt) throw Error('Missing field: provider_pdt');
    const sql = `INSERT INTO products(fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, 
        costoTela_pdt, costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
        costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, image_pdt, provider_pdt) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?);`;
    const {insertedId} = await query(sql, [product.fit_pdt, product.num_pdt, product.skuPrenda_pdt, product.nombre_pdt, product.matKin_pdt, 
        product.talla_pdt, product.consumo_pdt, product.tipTela_pdt, product.costoMT_pdt, product.costoTela_pdt, product.costoEtiqueta_pdt, 
        product.costoBoton_pdt, product.costoMaquila_pdt, product.costoAcabado_pdt, product.costoBordSeri_pdt, product.costoEmpaque_pdt, 
        product.costoTrans_pdt, product.costoAdmin_pdt, product.costoOtro_pdt, product.comisVenta_pdt, product.image_pdt, product.provider_pdt]);
    return {...product, id: insertedId};
};

//Funcion para actualizar la informacion de un producto en la base de datos
const update = async(product) => {
    if(!product.fit_pdt) throw Error('Missing field: fit_pdt');
    if(!product.num_pdt) throw Error('Missing field: num_pdt');
    if(!product.skuPrenda_pdt) throw Error('Missing field: skuPrenda_pdt');
    if(!product.nombre_pdt) throw Error('Missing field: nombre_pdt');
    if(!product.matKin_pdt) throw Error('Missing field: matKin_pdt');
    if(!product.talla_pdt) throw Error('Missing field: talla_pdt');
    //if(!product.consumo_pdt) throw Error('Missing field: consumo_pdt');
    if(!product.tipTela_pdt) throw Error('Missing field: tipTela_pdt');
    /*if(!product.costoMT_pdt) throw Error('Missing field: costoMT_pdt');
    if(!product.costoTela_pdt) throw Error('Missing field: costoTela_pdt');
    if(!product.costoEtiqueta_pdt) throw Error('Missing field: costoEtiqueta_pdt');
    if(!product.costoBoton_pdt) throw Error('Missing field: costoBoton_pdt');
    if(!product.costoMaquila_pdt) throw Error('Missing field: costoMaquila_pdt');
    if(!product.costoAcabado_pdt) throw Error('Missing field: costoAcabado_pdt');
    if(!product.costoBordSeri_pdt) throw Error('Missing field: costoBordSeri_pdt');
    if(!product.costoEmpaque_pdt) throw Error('Missing field: costoEmpaque_pdt');
    if(!product.costoTrans_pdt) throw Error('Missing field: costoTrans_pdt');
    if(!product.costoAdmin_pdt) throw Error('Missing field: costoAdmin_pdt');
    if(!product.costoOtro_pdt) throw Error('Missing field: costoOtro_pdt');
    if(!product.comisVenta_pdt) throw Error('Missing field: comisVenta_pdt');
    if(!product.image_pdt) throw Error('Missing field: image_pdt');*/
    if(!product.provider_pdt) throw Error('Missing field: provider_pdt');
    if(!product.id_pdt) throw Error('Missing fields: id_pdt');
    const sql = `UPDATE products SET fit_pdt = ?, num_pdt = ?, skuPrenda_pdt = ?, nombre_pdt = ?, matKin_pdt = ?, talla_pdt = ?, 
        consumo_pdt = ?, tipTela_pdt = ?, costoMT_pdt = ?, costoTela_pdt = ?, costoEtiqueta_pdt = ?, costoBoton_pdt = ?, costoMaquila_pdt = ?, 
        costoAcabado_pdt = ?, costoBordSeri_pdt = ?, costoEmpaque_pdt = ?, costoTrans_pdt = ?, costoAdmin_pdt = ?, costoOtro_pdt = ?, 
        comisVenta_pdt = ?, image_pdt = ?, status_pdt = 1, provider_pdt = ? WHERE id_pdt = ?;`;
    return await query(sql, [product.fit_pdt, product.num_pdt, product.skuPrenda_pdt, product.nombre_pdt, product.matKin_pdt, product.talla_pdt, 
        product.consumo_pdt, product.tipTela_pdt, product.costoMT_pdt, product.costoTela_pdt, product.costoEtiqueta_pdt, product.costoBoton_pdt, 
        product.costoMaquila_pdt, product.costoAcabado_pdt, product.costoBordSeri_pdt, product.costoEmpaque_pdt, product.costoTrans_pdt, 
        product.costoAdmin_pdt, product.costoOtro_pdt, product.comisVenta_pdt, product.image_pdt, product.provider_pdt, product.id_pdt]);
};

//Funcion para deshabilitar un producto en la base de datos
const disable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE products SET status_pdt = 0 WHERE id_pdt = ?;`;
    return await query(sql, [id]);
};

//Funcion para habilitar un producto previamente deshabilitado en la base de datos
const enable = async(id) => {
    if (isNaN(id)) throw Error('Wrong type: Is not number');
    if (!id) throw Error('Missing fields: id');
    const sql = `UPDATE products SET status_pdt = 1 WHERE id_pdt = ?;`;
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