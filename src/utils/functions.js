const bcrypt = require('bcryptjs');

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

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
};

const validatePassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    validateError,
    hashPassword,
    validatePassword
};