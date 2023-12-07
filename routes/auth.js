const { Router } = require('express');
const { login } = require('../controllers/auth');
/* Importa los controladores necesarios */

/* const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); */

const router = Router();

/* Ruta para el inicio de sesión */
router.post('/', login);


module.exports = router;
 