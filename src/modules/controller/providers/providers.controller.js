//Importa funciones que van a ser usadas en este modulo
const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./providers.gateway');
const {validateError} = require('../../../utils/functions');

//Controlador para obtener todos los proveedores en la base de datos
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

//Controlador para obtener todos los proveedores habilitados en la base de datos
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

//Controlador para obtener un proveedor por su ID
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

//Controlador para insertar un nuevo proveedor en la base de datos
const insert = async(req, res = response) => {
    try {
        const {rfc_pvd, name_pvd, dirFis_pvd, dirSuc_pvd, phone_pvd, email_pvd} = req.body;
        const results = await save({rfc_pvd, name_pvd, dirFis_pvd, dirSuc_pvd, phone_pvd, email_pvd});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para modificar la informacion de un proveedor en la base de datos
const modific = async(req, res = response) => {
    try {
        const {rfc_pvd, name_pvd, dirFis_pvd, dirSuc_pvd, phone_pvd, email_pvd, id_pvd} = req.body;
        const results = await update({rfc_pvd, name_pvd, dirFis_pvd, dirSuc_pvd, phone_pvd, email_pvd, id_pvd});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para deshabilitar un proveedor en la base de datos
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

//Controlador para habilitar un proveedor previamente deshabilitado en la base de datos
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
const providerRouter = Router();
providerRouter.get(`/all`, [], getAll); //Ruta para obtener todos los proveedores
providerRouter.get(`/all/enable`, [], getEnable); //Ruta para obtener todos los proveedores habilitados
providerRouter.get(`/:id`, [], getById); //Ruta para obtener un proveedor por su ID
providerRouter.post(`/save`, [], insert); //Ruta para insertar un nuevo proveedor
providerRouter.put(`/update`, [], modific); //Ruta para actualizar un proveedor
providerRouter.put(`/disable/:id`, [], disa); //Ruta para deshabilitar un proveedor
providerRouter.put(`/enable/:id`, [], ena); //Ruta para habilitar un proveedor

//Exporta el enrutador para su uso en otros modulos
module.exports = {
    providerRouter
};