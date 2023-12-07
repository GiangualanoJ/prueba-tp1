const { dbConnection } = require('../config/database')
const { DataTypes } = require('sequelize')

const ListaProducto = require('./ListaProductos')

const Pedidos = dbConnection.define('Pedidos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cliente: {
        type: DataTypes.STRING
    },
    pedidoId: {
        type: DataTypes.INTEGER,
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    saldoTotal:{
        type: DataTypes.INTEGER
    },
    fechaDeCarga:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fechaDeEntrega:{
        type: DataTypes.DATE
    }
},{
    timestamps: false
})

// ListaProducto.hasMany(Pedidos,{
//     foreignKey: 'pedidoId'
// })
// Pedidos.belongsTo(ListaProducto,{
//     foreignKey: 'pedidoId'
// })

// ListaProducto.sync({alter: true}).then(() => {
//     console.log('Tabla ListaProductos creada')
// }).catch((error) => {
//     console.log(error)
// })
// Pedidos.sync({alter: true}).then(() => {
//     console.log('Tabla Pedidos creada')
// }).catch((error) => {
//     console.log(error)
// })

// dbConnection.sync({ alter: true })
//   .then(() => {
//     console.log('Tablas creadas o actualizadas correctamente')
//   })
//   .catch((error) => {
//     console.log('Error al crear las tablas:', error)
//   })

module.exports = Pedidos