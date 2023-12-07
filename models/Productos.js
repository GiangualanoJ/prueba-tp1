const { dbConnection } = require('../config/database');
const { DataTypes } = require('sequelize');

const Producto = dbConnection.define('Productos', {
    nombre: {
        type: DataTypes.STRING
    },
    nombreComercial: {
        type: DataTypes.STRING
    },
    imagen: {
        type: DataTypes.BLOB
    },
    precio: {
        type: DataTypes.INTEGER
    },
    categoria: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    compra: {
        type: DataTypes.INTEGER
    },
    inventario: {
        type: DataTypes.STRING,
        required: true
    },
    rating: {
        type: DataTypes.INTEGER
    },
    unidadDeMedida: {
        type: DataTypes.STRING
    },
    proveedorID: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

// Producto.sync({ alter: true }).then(() => {
//     console.log("Table Producto sync successfully");
// }).catch((error) => {
//     console.log("Hubo un error", error);
// });

module.exports =  Producto;
