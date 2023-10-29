//Importa funciones que van a ser usadas en este modulo
const {response, Router} = require('express');
const {findAll, findEnable, findById, save, saveUs, update, enable, disable} = require('./users.gateway');
const {validateError} = require('../../../utils/functions');

//Controlador para obtener todos los usuarios en la base de datos
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

//Controlador para obtener todos los usuarios habilitados en la base de datos
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

//Controlador para obtener un usuario por su ID
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

//Controlador para insertar un nuevo usuario en la base de datos
const insert = async(req, res = response) => {
    try {
        const {name_usr, lastname_usr, role_usr, email_usr, password_usr} = req.body;
        const results = await save({name_usr, lastname_usr, role_usr, email_usr, password_usr});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para insertar un nuevo usuario con el rol de Cliente en la base de datos
const register = async(req, res = response) => {
    try {
        const {name_usr, lastname_usr, email_usr, password_usr} = req.body;
        const results = await saveUs({name_usr, lastname_usr, email_usr, password_usr});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para modificar la informacion de un usuario en la base de datos
const modific = async(req, res = response) => {
    try {
        const {name_usr, lastname_usr, role_usr, email_usr, password_usr, usuarioId_usr} = req.body;
        const results = await update({name_usr, lastname_usr, role_usr, email_usr, password_usr, usuarioId_usr});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Controlador para deshabilitar un usuario en la base de datos
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

//Controlador para habilitar un usuario previamente deshabilitado en la base de datos
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
const userRouter = Router();
userRouter.get(`/all`, [], getAll); //Ruta para obtener todos los usuarios
userRouter.get(`/all/enable`, [], getEnable); //Ruta para obtener todos los usuarios habilitados
userRouter.get(`/:id`, [], getById); //Ruta para obtener un usuario por su ID
userRouter.post(`/save`, [], insert); //Ruta para insertar un nuevo usuario
userRouter.post(`/register`, [], register); //Ruta para insertar un nuevo usuario con rol Cliente
userRouter.put(`/update`, [], modific); //Ruta para actualizar un usuario
userRouter.put(`/disable/:id`, [], disa); //Ruta para deshabilitar un usuario
userRouter.put(`/enable/:id`, [], ena); //Ruta para habilitar un usuario

//Exporta el enrutador para su uso en otros modulos
module.exports = {
    userRouter
};