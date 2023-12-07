const { response } = require('express');

const { Proveedores } = require('../models/proveedores');

const getProveedor = async (req, res = response) => {
    try {
        const proveedor = await Proveedores.findAll()
        res.json(proveedor)
    } catch (error) {
        console.log(error)
    }
}

const createProveedor = async (req, res = response) => {
    try {
        const proveedor = new Proveedores(req.body)
        await proveedor.save()

        res.json({ proveedor })
    } catch (error) {
        console.log(error)
    }
}


const updateProveedor = async (req, res = response) => {

    const id = req.params.id
    const { nombre, cuit } = req.body

    try {
        const proveedor = await Proveedores.findByPk(id)
        console.log(proveedor)

        if (!proveedor) {
            return res.status(201).json({
                ok: false,
                message: "proveedor no encontrado"
            })
        }
        proveedor.id = id
        proveedor.nombre = nombre
        proveedor.cuit = cuit



        await proveedor.save()
        res.json(proveedor)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el proveedor"
        })
    }

};

const deleteProveedor = async (req, res = response) => {

    try {
        const id = req.params.id
        await Proveedores.destroy({ where: { id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getProveedor,
    createProveedor,
    updateProveedor,
    deleteProveedor
}