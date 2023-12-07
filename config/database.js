const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
})

module.exports = {dbConnection};