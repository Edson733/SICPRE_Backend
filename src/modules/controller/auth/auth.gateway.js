//Importa las funciones para interactuar con la base de datos MySQL y generar tokens JWT
const {query} = require('../../../utils/mysql');
const {generateToken} = require('../../../config/jwt');

//Funcion para autenticar a un usuario con un correo electronico y contraseña
const login = async(email, password) => {
    console.log(email, password); //Imprime en la consola el correo y contraseña recibidos
    //Comprueba si el correo electronico y la contraseña son validos
    if(!email) throw Error('User fields: email');
    if(!password) throw Error('User fields: password');
    //Prepara una consulta SQL para buscar un usuario en la base de datos que coincida con el correo y contraseña proporcionados
    const sql = `SELECT * FROM users WHERE email_usr = ? && password_usr = ? && status_usr = 1;`;
    //Ejecuta la consulta en la base de datos y los parametros proporcionados
    const existUser = await query(sql, [email, password]);
    //Comprueba si se encontro un usuario en la base de datos con las credenciales proporcionadas
    if(existUser.length === 0) throw Error('User not found or not enable');
    //Si la contraseña coincide, genera un token JWT y lo devuelve como respuesta
    if(await !existUser[0].password) {
        return {
            token: generateToken({
                id: existUser[0].usuarioId_usr,
                email: email,
                password: password,
                role: existUser[0].role_usr
            })
        };
    }
};

//Exporta la funcion para ser usada en otros modulos
module.exports = {
    login
};