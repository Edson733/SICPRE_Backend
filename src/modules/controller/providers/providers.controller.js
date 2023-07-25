const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./providers.gateway');
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
        const {rfc, name, dirFis, dirSuc, phone, email} = req.body;
        const results = await save({rfc, name, dirFis, dirSuc, phone, email});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async(req, res = response) => {
    try {
        
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const disa = async(req, res = response) => {
    try {
        
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const ena = async(req, res = response) => {
    try {
        
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const providerRouter = Router();
providerRouter.get(`/all`, [], getAll);
providerRouter.get(`/all/enable`, [], getEnable);
providerRouter.get(`/:id`, [], getById);
providerRouter.post(`/save`, [], insert);
providerRouter.put(`/update`, [], modific);
providerRouter.put(`/disable/:id`, [], disa);
providerRouter.put(`/enable/:id`, [], ena);

module.exports = {
    providerRouter
};