const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./provider_control.gateway');
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

const provider_controlRouter = Router();
provider_controlRouter.get(`/all`, [], getAll);
provider_controlRouter.get(`/all/enable`, [], getEnable);
provider_controlRouter.get(`/:id`, [], getById);
provider_controlRouter.post(`/save`, [], insert);
provider_controlRouter.put(`/update`, [], modific);
provider_controlRouter.put(`/disable/:id`, [], disa);
provider_controlRouter.put(`/enable/:id`, [], ena);

module.exports = {
    provider_controlRouter
};