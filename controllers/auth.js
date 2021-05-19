const { response } = require("express");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Correo / Cpntraseña no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Correo / Contraseña no son correctos - estado'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            res.status(400).json({
                msg: 'Correo / Contraseña no son correctos - Contraseña'
            })
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });    
    }



}

const googleSignIn = (req, res = response) => {

    res.json({
        msg: 'Todo OK googel signin'
    })
}


module.exports = {
    login,
    googleSignIn
};