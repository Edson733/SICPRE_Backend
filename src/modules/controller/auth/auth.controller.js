//Importa las funciones a ser utilzadas en este modulo
const {response, Router} = require('express');
const {login} = require('./auth.gateway');
const {validateError} = require('../../../utils/functions');

//Funcion para manejar la autenticacion de un usuario
const signin = async(req, res = response) => {
    try {
        // La sesion esta activa
        console.log(req.body); //Imprime en la consola el cuerpo de la solicitud
        //Extrae el correo electronico y la contraseña del cuerpo de la solicitud
        const {email_usr, password_usr} = req.body;
        //Llama a la funcion login para intentar autenticar al usuario utilizando el correo y la contraseña
        const token = await login(email_usr, password_usr);
        //Si la autenticacion tiene exito, imprime en consola el token y un codigo de estado 200(OK)
        console.log(token);
        console.log("La sesión esta activa");
        res.status(200).json(token);
    } catch (err) {
        // La sesion no esta activa
        //Si la autenticacion falla, imprime en consola el error, un mensaje de error y un codigo de estado 400(Bad Request)
        console.log(err);
        console.log("La sesión no esta activa");
        const message = validateError(err);
        res.status(400).json({message});
    }
};

//Cra un enrutador para manejar las rutas relacionadas
const authRouter = Router();
//Define una ruta POST para la funcion que maneja las solicitudes de inicio de sesion
authRouter.post(`/`, signin);

//Exporta el enrutador para ser utilizado en otros modulos
module.exports = {
    authRouter
};