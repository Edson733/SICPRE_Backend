const express = require('express');
const cors = require('cors');
const {userRouter} = require('../modules/controller/router');
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
app.use('/api/users', userRouter);

module.exports = {
    app
}; //{app : app}