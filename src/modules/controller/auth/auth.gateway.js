const {query} = require('../../../utils/mysql');
const {generateToken} = require('../../../config/jwt');

const login = async(email, password) => {
    console.log(email, password);
    if(!email || !password) throw Error('User fields');
    const sql = `SELECT * FROM users WHERE email_usr = ? && password_usr = ? && status_usr = 1;`;
    const existUser = await query(sql, [email, password]);
    if(existUser.length === 0) throw Error('User not found or not enable');
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

module.exports = {
    login
};