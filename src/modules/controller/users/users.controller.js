const {response, Router} = require('express');
const {findAll, findEnable, findById, save, saveUs, update, enable, disable} = require('./users.gateway');
const {validateError} = require('../../../utils/functions');

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

const insert = async(req, res = response) => {
    try {
        const {name_usr, lastname_usr, rol_usr, email_usr, password_usr} = req.body;
        const results = await save({name_usr, lastname_usr, rol_usr, email_usr, password_usr});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

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

const modific = async(req, res = response) => {
    try {
        const {name_usr, lastname_usr, rol_usr, email_usr, password_usr, usuarioId_usr} = req.body;
        const results = await update({name_usr, lastname_usr, rol_usr, email_usr, password_usr, usuarioId_usr});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

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