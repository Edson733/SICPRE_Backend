const {response, Router} = require('express');
const {findAll, findEnable, findById, save, update, disable, enable} = require('./products.gateway');
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
        const {fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, costoTela_pdt, 
            costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
            costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, provider_pdt} = req.body;
        const results = await save({fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, 
            costoTela_pdt, costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, 
            costoTrans_pdt, costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, provider_pdt});
        res.status(200).json({results});
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const modific = async(req, res = response) => {
    try {
        const {fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, costoTela_pdt, 
            costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
            costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, provider_pdt, id_pdt} = req.body;
        const results = await update({fit_pdt, num_pdt, skuPrenda_pdt, nombre_pdt, matKin_pdt, talla_pdt, consumo_pdt, tipTela_pdt, costoMT_pdt, costoTela_pdt, 
            costoEtiqueta_pdt, costoBoton_pdt, costoMaquila_pdt, costoAcabado_pdt, costoBordSeri_pdt, costoEmpaque_pdt, costoTrans_pdt, 
            costoAdmin_pdt, costoOtro_pdt, comisVenta_pdt, provider_pdt, id_pdt});
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

const productRouter = Router();
productRouter.get(`/all`, [], getAll);
productRouter.get(`/all/enable`, [], getEnable);
productRouter.get(`/:id`, [], getById);
productRouter.post(`/save`, [], insert);
productRouter.put(`/update`, [], modific);
productRouter.put(`/disable/:id`, [], disa);
productRouter.put(`/enable/:id`, [], ena);

module.exports = {
    productRouter
};