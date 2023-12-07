const { response } = require('express')
const ReportesCompras = require('../models/ReportesCompras')
const {dbConnection} = require('../config/database')
const QueryTypes = require('sequelize')

const getCompras = async (req, res = response) => {
    try {
    const compras = await ReportesCompras.findAll()
    const query = `SELECT nombre FROM Proveedores`
    const resultado = await dbConnection.query(query, { type: QueryTypes.SELECT })
    console.log(resultado[0])

    res.json({compras, resultado})
    }catch (error) {
        console.log(error)
    }
}

const buyer = async (req, res = response) => {
    try{
        const compra = new ReportesCompras(req.body)
        await compra.save()

        res.json({compra})
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getCompras,
    buyer
}