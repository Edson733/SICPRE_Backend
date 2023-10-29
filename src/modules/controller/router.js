//Importa los enrutadores desde los diferentes modulos
const {userRouter} = require('./users/users.controller'); //Importa el enrutador para gestionar rutas relacionadas con usuarios
const {providerRouter} = require('./providers/providers.controller'); //Importa el enrutador para gestionar rutas relacionadas con proveedores
const {provider_controlRouter} = require('./provider_control/provider_control.controller'); //Importa el enrutador para gestionar rutas relacionadas con control de proveedores
const {productRouter} = require('./products/products.controller'); //Importa el enrutador para gestionar rutas relacionadas con productos
const {salesRouter} = require('./sales/sales.controller'); //Importa el enrutador para gestionar rutas relacionadas con ventas
const {authRouter} = require('./auth/auth.controller'); //Importa el enrutador para gestionar rutas relacionadas con la autenticacion y autorizacion de usuarios

//Exporta los modulospara que puedan ser usados en otros modulos
module.exports = {
    userRouter, 
    providerRouter, 
    provider_controlRouter,
    productRouter,
    salesRouter,
    authRouter
};