const express = require('express');
const cors = require('cors');
const {userRouter, providerRouter, provider_controlRouter, productRouter, salesRouter, authRouter} = require('../modules/controller/router');
require('dotenv').config(); //Importaciones

const app = express(); //Instanciar server
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(cors({origins: '*'})); //Permite recibir cualquier peticion con X origen
app.use(express.json({limit: '50mb'})); //Permite recibir json en el body de la peticion hasta 50mb

//Routes
app.get("/", (request, response) => {
    response.send("Bienvenido a backend SICPRE");
});

//Endpoints
app.use('/api-sicpre/users', userRouter);
app.use('/api-sicpre/providers', providerRouter);
app.use('/api-sicpre/providers-control', provider_controlRouter);
app.use('/api-sicpre/products', productRouter);
app.use('/api-sicpre/sales', salesRouter);
app.use('/api-sicpre/auth', authRouter);

module.exports = {
    app
}; //{app : app}