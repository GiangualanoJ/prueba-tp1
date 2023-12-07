const {dbConnection} = require('../config/database');
const { DataTypes } = require('sequelize');


const ListaProducto = dbConnection.define('ListaProducto', {
  // Definiciones de columnas
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
  },
  nombreProducto: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    // allowNull: false
  },
  precioXproductos: {
    type: DataTypes.FLOAT,
  }
},{
    timestamps: false
});




module.exports = ListaProducto;