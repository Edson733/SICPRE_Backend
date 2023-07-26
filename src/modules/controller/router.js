const {userRouter} = require('./users/users.controller');
const {providerRouter} = require('./providers/providers.controller');
const {provider_controlRouter} = require('./provider_control/provider_control.controller');

module.exports = {
    userRouter, 
    providerRouter, 
    provider_controlRouter
};