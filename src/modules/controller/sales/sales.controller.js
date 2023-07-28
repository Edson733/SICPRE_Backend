const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./sales.gateway');
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
        const {product_sls, client_sls, totalCount_sls} = req.body;
        const results = await save({product_sls, client_sls, totalCount_sls});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

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

const salesRouter = Router();
salesRouter.get(`/all`, [], getAll);
salesRouter.get(`/all/enable`, [], getEnable);
salesRouter.get(`/:id`, [], getById);
salesRouter.post(`/save`, [], insert);
salesRouter.put(`/update`, [], modific);
salesRouter.put(`/disable/:id`, [], disa);
salesRouter.put(`/enable/:id`, [], ena);

module.exports = {
    salesRouter
};