const { response } = require("express");
const { Producto } = require("../models");


const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        productos
    })


}


const obtenerProducto = async(req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre')

    res.json({
        producto
    });

}


const crearProductos = async(req, res = response) => {

    const { estado, disponible, usuario, ...datos } = req.body;
    const nombre = datos.nombre.toUpperCase();
    datos.usuario = req.usuario._id;
    datos.nombre = nombre;

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${datos.nombre} ya existe`
        });
    }


    const producto = new Producto(datos);
    await producto.save();

    res.json({
        producto
    })


}


const actualizarProductos = async(req, res = response) => {

    const { id } = req.params;

    const { estado, usuario, ...datos } = req.body;
    const nombre = datos.nombre.toUpperCase();
    datos.usuario = req.usuario._id;
    datos.nombre = nombre;

    const productoDB = await Producto.findOne({nombre});

    if(productoDB && String(productoDB._id) === id){
        return res.status(400).json({
            msg: `El producto ${datos.nombre} ya existe`
        });
    }

    const producto = await Producto.findByIdAndUpdate(id, datos, {new: true});

    res.json({
        producto
    })
}


const borrarProductos = async(req, res = response) => {

    const { id } = req.params;

    const datos = {
        usuario: req.usuario._id,
        estado: false
    };

    const producto = await Producto.findByIdAndUpdate(id, datos, { new: true });

    res.json({
        producto
    })


}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProductos,
    actualizarProductos,
    borrarProductos
}
