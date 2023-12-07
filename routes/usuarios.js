const { Router } = require('express');
const { getUsuarios, createUsuario, updateUsuario, borrarUsuario } = require('../controllers/usuarios'); /* Importa los controladores */
const { validarJWT } = require('../middlewares/validar-jwt'); /* valida el token */

const router = Router();


router.get( '/', validarJWT , getUsuarios );
router.post( '/createUsuario', createUsuario );
router.delete( '/:id', validarJWT, updateUsuario );
router.delete( '/:id', validarJWT, borrarUsuario );


module.exports = router;  