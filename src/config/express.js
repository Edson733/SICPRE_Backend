//Importa los modulos necesarios y enrutadores, ademas se importa la configuracion de variables de entorno
const express = require('express');
const cors = require('cors');
const {userRouter, providerRouter, provider_controlRouter, productRouter, salesRouter, authRouter} = require('../modules/controller/router');
require('dotenv').config();

const app = express(); //Se crea la instancia del servidor
app.set("port", process.env.PORT || 8080); //Se establece el puerto en el que se ejecutara el servidor web

//Middlewares(funciones que se ejecutan antes de procesar las solicitudes)
app.use(cors({origins: '*'})); //Permite recibir solicitudes desde cualquier origen ('*')
app.use(express.json({limit: '50mb'})); //Permite parsear el cuerpo de solicitudes en formato JSON con un limite de 50MB

//Ruta de inicio
app.get("/", (request, response) => {
    response.send("Bienvenido a backend SICPRE"); //Maneja solicitudes GET en la ruta raiz y responde con un mensaje de bienvenida
});

//Endpoints(rutas para diferentes partes de la API)
app.use('/api-sicpre/users', userRouter);
app.use('/api-sicpre/providers', providerRouter);
app.use('/api-sicpre/providers-control', provider_controlRouter);
app.use('/api-sicpre/products', productRouter);
app.use('/api-sicpre/sales', salesRouter);
app.use('/api-sicpre/auth', authRouter);

//Exporta la instancia
module.exports = {
    app
};