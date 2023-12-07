const { dbConnection } = require('../config/database')
const { DataTypes } = require('sequelize')

const ReportesCompras = dbConnection.define('ReportesCompras', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proveedor:{
        type: DataTypes.STRING
    },
    imac:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    macbook:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    iphone:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ipadPro:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    airPods:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    watch:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    timestamps: false
})

// ReportesCompras.sync({alter: true}).then(() => {
//     console.log('Tabla ReportesCompras creada')
// }).catch((error) => {
//     console.log(error)
// })

module.exports = ReportesCompras

