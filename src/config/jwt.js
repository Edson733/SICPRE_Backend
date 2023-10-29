//Importa los modulos para trabajar con respuestas HTTP y tokens JWT
const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Funcion para generar un token JWT a partir de un 'payload'
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET); //Genera un token JWT utilizando la clave secreta
};

//Funcion de middleware para verificar la validez de un token en las solicitudes entrantes
const verifyToken = (req, res = response, next) => {
    const token = req.header('Authorization'); //Lee el token del encabezado en la solicitud HTTP
    if(!token){
        return res.status(400).json({message: 'No se proporciono un token'}); //Si no se proporciona el token, responde con un error 400
    }
    try {
        // Verifica la validez del token utilizando la clave secreta
        const decoded = jwt.verify(token, process.env.SECRET);
        // Agrega el objeto decodificado del token al objeto de solicitud para su uso posterior
        req.user = decoded;
        next(); // Continúa con la siguiente función de middleware o ruta, ya que el token es valido
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'Token no valido'}); //Si el token no es valido, responde con un error 400
    }
};

//Exporta las funciones para ser utilizadas en otros modulos
module.exports = {
    generateToken,
    verifyToken
};