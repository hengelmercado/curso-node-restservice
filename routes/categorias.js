const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categotias - publico
router.get('/', obtenerCategorias);

// Obtener categotia por id - publico
router.get('/:id', [
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// Crear categoria - Privado - Cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria - Privado - Cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCategoria);

// Eliminar categoria - Privado - Admin
router.delete('/:id', [
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarJWT,
    esAdminRol,
    validarCampos,
], eliminarCategoria);

module.exports = router;