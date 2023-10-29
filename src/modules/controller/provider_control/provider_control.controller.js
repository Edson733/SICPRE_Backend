//Importa funciones que van a ser usadas en este modulo
const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./provider_control.gateway');
const {validateError} = require('../../../utils/functions');

//Controlador para obtener todos los controles de proveedores en la base de datos
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

//Controlador para obtener todos los controles de proveedores habilitados en la base de datos
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

//Controlador para obtener un control de proveedor por su ID
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

//Controlador para insertar un nuevo control de proveedor en la base de datos
const insert = async(req, res = response) => {
    try {
        const {prinCont_pcl, numExt_pcl, sitWeb_pcl, startDate_pcl, evalDes_pcl, category_pcl, limCre_pcl, hisPag_pcl, datBan_pcl, 
            comentary_pcl, provider_pcl_pvd} = req.body;
        const results = await save({prinCont_pcl, numExt_pcl, sitWeb_pcl, startDate_pcl, evalDes_pcl, category_pcl, limCre_pcl, 
            hisPag_pcl, datBan_pcl, comentary_pcl, provider_pcl_pvd});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para modificar la informacion de un control de proveedor en la base de datos
const modific = async(req, res = response) => {
    try {
        const {prinCont_pcl, numExt_pcl, sitWeb_pcl, startDate_pcl, evalDes_pcl, category_pcl, limCre_pcl, hisPag_pcl, datBan_pcl, 
            comentary_pcl, provider_pcl_pvd, id_pcl} = req.body;
        const results = await update({prinCont_pcl, numExt_pcl, sitWeb_pcl, startDate_pcl, evalDes_pcl, category_pcl, limCre_pcl, 
            hisPag_pcl, datBan_pcl, comentary_pcl, provider_pcl_pvd, id_pcl});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para deshabilitar un control de proveedor en la base de datos
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

//Controlador para habilitar un control de proveedor previamente deshabilitado en la base de datos
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
const provider_controlRouter = Router();
provider_controlRouter.get(`/all`, [], getAll); //Ruta para obtener todos los controles de proveedores
provider_controlRouter.get(`/all/enable`, [], getEnable); //Ruta para obtener los controles de proveedores habilitados
provider_controlRouter.get(`/:id`, [], getById); //Ruta para obtener un control de proveedor por su ID
provider_controlRouter.post(`/save`, [], insert); //Ruta para insertar un nuevo control de proveedor
provider_controlRouter.put(`/update`, [], modific); //Ruta para actualizar un control de proveedor
provider_controlRouter.put(`/disable/:id`, [], disa); //Ruta para deshabilitar un control de proveedor
provider_controlRouter.put(`/enable/:id`, [], ena); //Ruta para habilitar un control de proveedor

//Exporta el enrutador para su uso en otros modulos
module.exports = {
    provider_controlRouter
};