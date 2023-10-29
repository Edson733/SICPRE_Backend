//Importa la variable app desde el modulo express
const {app} = require('./config/express'); //{app} app : app

//Inicia el servidor en el puerto definido y si captura un error lo muestra en consola
const main = () => {
    try {
        app.listen(app.get("port"));
        console.log(`Server running in http://localhost:${app.get("port")}/`);
    } catch (error) {
        console.log(error);
    }
};

main();