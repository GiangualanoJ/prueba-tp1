const { response } = require('express')
const Productos = require('../models/Productos')

const getProducto = async (req, res = response) => {
    try {

        const producto = await Productos.findAll()
        res.json(producto)

    } catch (error) {
        console.log(error)
    }
} /* Obtiene los productos de la tabla 'Productos' */

const createProducto = async (req, res = response) => {
    try {

        const producto = new Productos(req.body)
        await producto.save()

        res.json({ producto })

    } catch (error) {
        console.log(error)
    }
} /* Permite crear un nuevo producto */


const updateProducto = async (req, res = response) => {

    const id = req.params.id
    const { nombre, nombreComercial, imagen, precio, categoria, rating, inventario, proveedor, compra, cantidad, unidadDeMedida } = req.body

    try {
        const producto = await Productos.findByPk(id)
        console.log(producto)

        if (!producto) {
            return res.status(201).json({
                ok: false,
                message: "producto no encontrado"
            })
        }

        producto.nombre = nombre
        producto.nombreComercial = nombreComercial
        producto.imagen = imagen
        producto.precio = precio
        producto.categoria = categoria
        producto.rating = rating
        producto.inventario = inventario
        producto.proveedor = proveedor
        producto.compra = compra
        producto.cantidad = cantidad
        producto.unidadDeMedida = unidadDeMedida


        await producto.save()
        res.json(producto)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el producto"
        })
    }

}; /* Encuentra el producto por el id y luego permite actualizarlo */

const deleteProducto = async (req, res = response) => {

    try {
        const id = req.params.id
        await Productos.destroy({ where: { id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
} /* Encuentra el producto por el id y luego lo elimina */




module.exports = {
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
}