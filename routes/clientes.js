const { Router } = require('express');
const { getCliente, createCliente, updateCliente, deleteCliente} = require('../controllers/clientesControllers');


const router = Router();

router.get( '/', getCliente ),
router.post( '/createClientes', createCliente ),
router.put( '/:id', updateCliente ),
router.delete( '/:id', deleteCliente )

module.exports = router;
 