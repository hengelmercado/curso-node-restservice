const { Schema, model } = require('mongoose');
const { message } = require('../dictionary/dictionary');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, message.nombre_req]
    },
    correo: {
        type: String,
        required: [true, message.correo_req],
        unique: true
    },
    password: {
        type: String,
        required: [true, message.pass_req]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );