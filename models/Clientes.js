const { dbConnection } = require('../config/database'); 
const { DataTypes } = require('sequelize');
const Cliente = dbConnection.define('Clientes', {

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




// Cliente.sync({ alter: true }).then(() => {
//     console.log("Table Clientes sync successfully");
// }).catch((error) => {
//     console.log("hubo un error", error);
// })

module.exports =  Cliente 


