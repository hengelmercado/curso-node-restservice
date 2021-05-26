const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario')
    ]);

    res.json({
        total,
        categorias
    })
}

const obtenerCategoria = async(req, res = response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario');

    res.json({
        categoria
    });

}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    
    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const {usuario,  estado, ...datos} = req.body;
    
    nombre = datos.nombre.toUpperCase();
    datos.nombre = nombre;
    datos.usuario = req.usuario._id;

    const categoriaDB = await Categoria.findOne({nombre});
    if( categoriaDB && String(categoriaDB._id) !== id) {
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        });
    }

    const categoria = await Categoria.findByIdAndUpdate(id, datos, {new: true});

    res.json({
        categoria
    });


}

const eliminarCategoria = async(req, res = response) => {
    const {id} = req.params;

    const datos = {
        usuario: req.usuario._id,
        estado: false
    };

    const categoria = await Categoria.findByIdAndUpdate(id, datos);

    res.json({
        categoria
    });
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}