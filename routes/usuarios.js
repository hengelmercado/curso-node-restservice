const { Router } = require('express');
const { check } = require('express-validator');
const {esAdminRol, tieneRol, validarCampos, validarJWT} = require('../middlewares');
const { esRolValido, correoExiste, usuarioExistePorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { message } = require('../dictionary/dictionary');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', message.id_no_valido).isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPut);
router.post('/',[
    check('nombre', message.nombre_req).not().isEmpty(),
    check('password', 'El maximo debe ser de 6 letras').isLength({min: 6}),
    check('correo', message.correo_no_valido).isEmail(),
    check('correo').custom( correoExiste ),
    // check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPost);
router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE', "VENTAS_ROLE"),
    check('id', message.id_no_valido).isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos,
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;