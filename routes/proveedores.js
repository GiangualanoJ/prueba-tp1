const { Router } = require('express');
const { getProveedor, createProveedor, updateProveedor, deleteProveedor } = require('../controllers/proveedoresControlles');



const router = Router();

router.get( '/', getProveedor ),
router.post( '/createProveedores', createProveedor ),
router.put('/:id', updateProveedor ),
router.delete('/:id', deleteProveedor )



module.exports = router;
 /* hola1 */