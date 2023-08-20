const {response, Router} = require('express');
const {login} = require('./auth.gateway');
const {validateError} = require('../../../utils/functions');

const signin = async(req, res = response) => {
    try {
        // La sesion esta activa
        console.log(req.body);
        const {email_usr, password_usr} = req.body;
        const token = await login(email_usr, password_usr);
        console.log(token);
        console.log("La sesión esta activa");
        res.status(200).json(token);
    } catch (err) {
        // La sesion no esta activa
        console.log(err);
        console.log("La sesión no esta activa");
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const authRouter = Router();
authRouter.post(`/`, signin);

module.exports = {
    authRouter
};