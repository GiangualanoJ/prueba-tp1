const { response } = require('express')
const { dbConnection } = require('../config/database')
const QueryTypes = require('sequelize')
const moment = require('moment');


// Gráfico de Ventas por Fecha
const Data1 = async (req, res = response) => {

    try {

        const query1 = `SELECT fechaDeCarga, cantidad FROM Pedidos`

        const result = await dbConnection.query(query1, { type: QueryTypes.SELECT })

        result[0].forEach(row => {
            row.fechaDeCarga = moment(row.fechaDeCarga).format('YYYY-MM-DD');
        });


        // console.log(result[0])

        res.json({Resultado: result[0]});

    } catch (error) {
        console.log(error)
    }

}

const Data2 = async (req, res = response) => {
    try{
        const query1 = `SELECT cliente, saldoTotal FROM Pedidos`

        const result = await dbConnection.query(query1, { type: QueryTypes.SELECT })
        // console.log(result)
        res.json({Resultado: result[0]})


    } catch(error){
        console.log(error)
    }
}

const Data3 = async (req, res = response) => {

    try {
        const query = 'SELECT nombreProducto, cantidad FROM ListaProductos'

        const result = await dbConnection.query(query, { type: QueryTypes.SELECT })
        // console.log(result)

        res.json({ Resultado: result[0] })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    Data1,
    Data2,
    Data3
}
