const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
} 
const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'put API - Controller'
    });
} 
const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'post API - Controller',
        body
    });
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
} 
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
} 


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}