const {Response, Router} = require('express');
const {findAll, findById, findEnable, save, saveUs, update, enable, disable, emailExist} = require('./users.gateway');
const {validateError} = require('../../../utils/functions');

const getAll = async(req, res = Response) => {
    try {
        const results = await findAll();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const getEnable = async(req, res = Response) => {
    try {
        const results = await findEnable();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const getById = async(req, res = Response) => {
    try {
        const {id} = req.params;
        const results = await findById(id);
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const insert = async(req, res = Response) => {
    try {
        const emailExis = await emailExist(req.body.email);
        console.log(emailExis);
        if( /^[a-zA-Z ]+$/.test(req.body.name) == false) throw Error('Invalid name');
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.email) == false) throw Error('Invalid email');
        if(emailExis[0] != null) throw Error('Email already in use');
        const {name_usr, lastname_usr, rol_usr, email_usr, password_usr, fechaCreacion_usr} = req.body;
        const results = await save({name_usr, lastname_usr, rol_usr, email_usr, password_usr, fechaCreacion_usr});
        res.status(200).json({results});
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const register = async(req, res = Response) => {
    try {
        const emailExis = await emailExist(req.body.email);
        console.log(emailExis);
        if( /^[a-zA-Z ]+$/.test(req.body.name) == false) throw Error('Invalid name');
        if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.email) == false) throw Error('Invalid email');
        if(emailExis[0] != null) throw Error('Email already in use');
        const {name_usr, lastname_usr, email_usr, password_usr, fechaCreacion_usr} = req.body;
        const results = await saveUs({name_usr, lastname_usr, email_usr, password_usr, fechaCreacion_usr});
        res.status(200).json({results});
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const modific = async(req, res = Response) => {
    try {
        const {name_usr, lastname_usr, rol_usr, email_usr, password_usr, fechaCreacion_usr, usuarioId_usr} = req.body;
        const results = await update({name_usr, lastname_usr, rol_usr, email_usr, password_usr, fechaCreacion_usr, usuarioId_usr});
        res.status(200).json({results});
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const disa = async(req, res = Response) => {
    try {
        const {id} = req.params;
        const results = await disable(id);
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const ena = async(req, res = Response) => {
    try {
        const {id} = req.params;
        const results = await enable(id);
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({message});
    }
};

const userRouter = Router();
userRouter.get(`/all`, [], getAll);
userRouter.get(`/all/enable`, [], getEnable);
userRouter.get(`/:id`, [], getById);
userRouter.post(`/save`, [], insert);
userRouter.post(`/register`, [], register);
userRouter.put(`/update`, [], modific);
userRouter.put(`/disable/:id`, [], disa);
userRouter.put(`/enable/:id`, [], ena);

module.exports = {
    userRouter
};