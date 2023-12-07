const { dbConnection } = require('../config/database');
const {DataTypes} = require('sequelize')

const Usuario = dbConnection.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    img: {
        type: DataTypes.STRING,
    }, 
    role: {
        type: DataTypes.STRING,
        required: true,
        default: 'ROLE_USUARIO' 
    },
}, {
    timestamps: false
})


// Usuario.sync({}).then(() => {
//     console.log("Tabla Usuarios sincronizada correctamente")
// }).catch(error => console.log(error))

module.exports = Usuario
