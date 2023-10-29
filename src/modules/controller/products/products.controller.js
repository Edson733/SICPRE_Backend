//Importa funciones que van a ser usadas en este modulo
const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./products.gateway');
const {validateError} = require('../../../utils/functions');

//Controlador para obtener todos los productos en la base de datos
const getAll = async(req, res = response) => {
    try {
        const results = await findAll();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para obtener todos los productos habilitados en la base de datos
const getEnable = async(req, res = response) => {
    try {
        const results = await findEnable();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para obtener un producto por su ID
const getById = async(req, res = response) => {
    try {
        const {id} = req.params;
        const results = await findById(id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para insertar un nuevo producto en la base de datos
const insert = async(req, res = response) => {
    try {
        const {fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, costoTela_pdt, 
            costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
            costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, image_pdt, provider_pdt} = req.body;
        const results = await save({fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, costoTela_pdt, 
            costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
            costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, image_pdt, provider_pdt});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para modificar la informacion de un producto en la base de datos
const modific = async(req, res = response) => {
    try {
        const {fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, costoTela_pdt, 
            costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
            costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, image_pdt, provider_pdt, id_pdt} = req.body;
        const results = await update({fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, 
            costoTela_pdt, costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, 
            costoTrans_pdt, costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, image_pdt, provider_pdt, id_pdt});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para deshabilitar un producto en la base de datos
const disa = async(req, res = response) => {
    try {
        const {id} = req.params;
        const results = await disable(id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para habilitar un producto previamente deshabilitado en la base de datos
const ena = async(req, res = response) => {
    try {
        const {id} = req.params;
        const results = await enable(id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Define las rutas y los metodos HTTP correspondientes para cada controlador
const productRouter = Router();
productRouter.get(`/all`, [], getAll); //Ruta para obtener todos los productos
productRouter.get(`/all/enable`, [], getEnable); //Ruta para obtener los productos habilitados
productRouter.get(`/:id`, [], getById); //Ruta para obtener un producto por su ID
productRouter.post(`/save`, [], insert); //Ruta para insertar un nuevo producto
productRouter.put(`/update`, [], modific); //Ruta para actualizar un producto
productRouter.put(`/disable/:id`, [], disa); //Ruta para deshabilitar un producto
productRouter.put(`/enable/:id`, [], ena); //Ruta para habilitar un producto

//Exporta el enrutador para su uso en otros modulos
module.exports = {
    productRouter
};