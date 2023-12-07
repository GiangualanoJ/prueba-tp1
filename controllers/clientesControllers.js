const { response } = require('express')
const Clientes = require('../models/Clientes')

const getCliente = async (req, res = response) => {
    try {
        const producto = await Clientes.findAll()
        res.json(producto)
    } catch (error) {
        console.log(error)
    }
}

const createCliente = async (req, res = response) => {
    try {
        const cliente = new Clientes(req.body)
        await cliente.save()

        res.json({ cliente })
    } catch (error) {
        console.log(error)
    }
}


const updateCliente = async (req, res = response) => {

    const id = req.params.id
    const { nombre, cuit } = req.body

    try {
        const cliente = await Clientes.findByPk(id)
        console.log(cliente)

        if (!cliente) {
            return res.status(201).json({
                ok: false,
                message: "cliente no encontrado"
            })
        }
        cliente.id = id
        cliente.nombre = nombre
        cliente.cuit = cuit



        await cliente.save()
        res.json(cliente)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el cliente"
        })
    }

};

const deleteCliente = async (req, res = response) => {

    try {
        const id = req.params.id
        await Clientes.destroy({ where: { id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
}