//Importa funciones que van a ser usadas en este modulo
const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./sales.gateway');
const {validateError} = require('../../../utils/functions');

//Controlador para obtener todas las ventas en la base de datos
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

//Controlador para obtener todas las ventas habilitadas en la base de datos
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

//Controlador para obtener una venta por su ID
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

//Controlador para insertar una nueva venta en la base de datos
const insert = async(req, res = response) => {
    try {
        const {product_sls, client_sls, totalCount_sls} = req.body;
        const results = await save({product_sls, client_sls, totalCount_sls});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para modificar la informacion de una venta en la base de datos
const modific = async(req, res = response) => {
    try {
        const {product_sls, client_sls, totalCount_sls, id_sls} = req.body;
        const results = await update({product_sls, client_sls, totalCount_sls, id_sls});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para deshabilitar una venta en la base de datos
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

//Controlador para habilitar una venta previamente deshabilitada en la base de datos
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
const salesRouter = Router();
salesRouter.get(`/all`, [], getAll); //Ruta para obtener todas las ventas
salesRouter.get(`/all/enable`, [], getEnable); //Ruta para obtener las ventas habilitadas
salesRouter.get(`/:id`, [], getById); //Ruta para obtener una venta por su ID
salesRouter.post(`/save`, [], insert); //Ruta para insertar una nueva venta
salesRouter.put(`/update`, [], modific); //Ruta para actualizar una venta
salesRouter.put(`/disable/:id`, [], disa); //Ruta para deshabilitar una venta
salesRouter.put(`/enable/:id`, [], ena); //Ruta para habilitar una venta

//Exporta el enrutador para su uso en otros modulos
module.exports = {
    salesRouter
};