const express = require('express')
const { Data1, Data2, Data3 } = require('../controllers/ReporteVentasController')

const router = express.Router()

router.get('/ventas1', Data1)
router.get('/ventas2', Data2)
router.get('/ventas3', Data3)

module.exports = router