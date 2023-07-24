const bcrypt = require('bcryptjs');

const validateError = (error) => {
    switch (error.message) {
        case "Wrong type":
            return "Review request fields";
        case "Missing fields":
            return "Validate fields";
        case "Inexistent role":
            return "Role not registered";
        case "Nothing found":
            return "No data found";
        case "Password mismatch":
            return "Credentials mismatch";
        case "User disabled":
            return "User disabled";
        case "User not found or not enable":
            return "User not found or not enable";
        case "Invalid name":
            return error.message;
        case "Invalid email":
            return error.message;
        case "Email already in use":
            return error.message;
        default:
            return "Review request";
    }
};

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
};

const validatePassword = async(password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};

module.exports = {
    validateError,
    hashPassword,
    validatePassword
};