const express = require('express')
const { CreateProducto, getProductos, getProductos2, updateProducto } = require('../controllers/ListaProductosController')

const router = express.Router()

router.post('/crearProducto', CreateProducto)
router.get('/verProducto', getProductos)
router.get('/:pedidoId', getProductos2)
router.put('/:id', updateProducto)
router.put('/:pedidoId', updateProducto)

module.exports = router