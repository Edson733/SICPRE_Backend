//Importa el modulo para trabajar con el cifrado de contraseñas
const bcrypt = require('bcryptjs');

//Funcion que toma un error como entrada y devuelve un mensaje de error personalizado
const validateError = (error) => {
    switch (error.message) {
        case "Wrong type":
            return "Review request fields";
            break;
        case "Missing fields":
            return "Validate fields";
            break;
        case "Nonexistent role":
            return "Role not registered";
            break;
        case "Nothing found":
            return "No data found";
            break;
        case "Password mismatch":
            return "Credentials mismatch";
            break;
        case "User disabled":
            return "User disabled";
            break;
        case "User not found or not enable":
            return "User not found or not enable";
            break;
        case "Invalid name":
            return error.message;
            break;
        case "Invalid email":
            return error.message;
            break;
        case "Email already in use":
            return error.message;
            break;
        default:
            return "Review request";
            break;
    }
};

//Funcion asincrona para cifrar una contraseña
const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(15); //Genera una variable aleatorio para el cifrado
    return await bcrypt.hash(password, salt); //Aplica el cifrado a la contraseña utilizando la variable aleatoria
};

//Funcion asincrona para verificar si una contraseña coincide con su version cifrada
const validatePassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword); //Compara la contraseña con su version cifrada y devuelve un valor booleano para indicar si coinciden
};

//Exporta las funciones para su uso en otros modulos
module.exports = {
    validateError,
    hashPassword,
    validatePassword
};