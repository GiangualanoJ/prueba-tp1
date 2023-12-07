const express = require('express')
const { getCompras, buyer } = require('../controllers/ReporteComprasController')

const router = express.Router()

router.get('/compras', getCompras)
router.post('/buyer', buyer)

module.exports = router