const express = require('express')
const { getPerdido, CreatePedido, DeletePedido, UpdatePedido, DeletePedidos, getProducts } = require('../controllers/PedidosController')

const router = express.Router()

router.get('/verPedido', getPerdido)
router.post('/crearPedido', CreatePedido)
router.delete('/:id', DeletePedido)
router.post('/borrarPedidos', DeletePedidos)
router.put('/:pedidoId', UpdatePedido)
router.get('/getProducts', getProducts)

module.exports = router