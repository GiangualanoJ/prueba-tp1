const { dbConnection } = require('../config/database'); 
const { DataTypes } = require('sequelize');
const  Producto  = require('./Productos'); 

const Proveedores = dbConnection.define('Proveedores', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    cuit: {
        type: DataTypes.BIGINT
    }
}, {
    timestamps: false
})

 Proveedores.hasMany(Producto, {
    foreignKey: 'proveedorID',
    as: 'Productos'
 }); 


Proveedores.sync({ alter: true }).then(() => {
    console.log("Table Proveedores sync successfully");
}).catch((error) => {
    console.log("hubo un error", error);
})



module.exports =  { Proveedores }