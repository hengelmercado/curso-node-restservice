const { Router } = require('express');
const { check } = require('express-validator');
const {esAdminRol, tieneRol, validarCampos, validarJWT} = require('../middlewares');
const { esRolValido, correoExiste, usuarioExistePorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPut);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El maximo debe ser de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( correoExiste ),
    // check('role', 'No es un role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPost);
router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE', "VENTAS_ROLE"),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos,
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;