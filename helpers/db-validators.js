const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRole = await Role.findOne({rol});
    if(!existeRole){
        throw new Error(`El rol ${rol} no está registrado en la DB`)
    }
}

const correoExiste = async(correo = '') => {
    const existeEmail =  await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const usuarioExistePorId = async(id = '') => {

    const existeUsuario =  await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe ${id}`)
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    usuarioExistePorId
}