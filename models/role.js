const {Schema, model} = require('mongoose');
const { message } = require('../dictionary/dictionary');

const RoleSchema = Schema({
    rol: {
        type: String,
        require: [true, message.role_req]
    }
});



module.exports = model( 'Role', RoleSchema );