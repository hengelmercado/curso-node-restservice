const { message } = require('../dictionary/dictionary');
const { Categoria, Role, Usuario, Producto } = require('../models');

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
        throw new Error(`${message.id_no_existe} ${id}`);
    }
}

const existeCategoriaPorId = async(id = '') => {

    const existeCategotia =  await Categoria.findById(id);
    if (!existeCategotia) {
        throw new Error(`${message.id_no_existe} ${id}`);
    }
}

const existeProductoPorId = async(id = '') => {

    const existeProducto =  await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`${message.id_no_existe} ${id}`);
    }
}

module.exports = {
    esRolValido,
    correoExiste,
    usuarioExistePorId,
    existeCategoriaPorId,
    existeProductoPorId
}