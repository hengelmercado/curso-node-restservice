const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearProductos, obtenerProductos, obtenerProducto, actualizarProductos, borrarProductos } = require('../controllers/productos');
const { message } = require('../dictionary/dictionary');
const { validarJWT, esAdminRol } = require('../middlewares');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', message.id_req),
    check('id', message.id_no_valido).isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', message.nombre_req).not().isEmpty(),
    check('categoria', message.categoria_req).not().isEmpty(),
    check('categoria', message.id_no_valido).isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProductos);

router.put('/:id', [
    validarJWT,
    check('id', message.id_req),
    check('id', message.id_no_valido).isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProductos);

router.delete('/:id', [
    validarJWT,
    check('id', message.id_req),
    check('id', message.id_no_valido).isMongoId(),
    check('id').custom(existeProductoPorId),
    esAdminRol,
    validarCampos
], borrarProductos);

module.exports = router;