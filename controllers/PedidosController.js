const { response } = require('express')
const Pedidos = require('../models/Pedidos')
const ListaProductos = require('../models/ListaProductos')
const {dbConnection} = require('../config/database')
const QueryTypes = require('sequelize')
const getPerdido = async (req, res = response) => {
    
    try {
        const pedido = await Pedidos.findAll()
        res.json(pedido)

    } catch (error) {
        console.log(error)
    }
}

const getProducts = async (req, res = response) => {
    try {
        const query = `SELECT nombre FROM Productos`
        const resultado = await dbConnection.query(query, { type: QueryTypes.SELECT })
        // console.log(resultado)
        res.json(resultado)
    }catch (error) {
        console.log(error)
    }
}

const CreatePedido = async (req, res = response) => {


    
    const q = await ListaProductos.findOne({
        order: [['pedidoId', 'Desc']],
        attributes: ['pedidoId'],
        raw: true
    });

    const IDpedido = q.pedidoId
    
    // console.log('console log en create pedido',q)
    // console.log('console log en create pedido',IDpedido)
    
    const { literal, fn, col } = require('sequelize');

    const sumCantidad = await ListaProductos.findOne({
      attributes: [[fn('SUM', col('cantidad')), 'sumCantidad']],
      where: { pedidoId: IDpedido},
      raw: true,
    });
    // console.log(sumCantidad)
    // console.log(sumCantidad.sumCantidad)

    

    const sumPrecio = await ListaProductos.findOne({
      attributes: [[fn('SUM', col('precioXproductos')), 'sumPrecio']],
      where: { pedidoId: IDpedido},
      raw: true,
    });


    try {
        const pedido = new Pedidos({
            // Utiliza los datos del req.body para crear el pedido
            cliente: req.body.cliente,
            listaProductos: req.body.listaProductos,
            cantidad: sumCantidad.sumCantidad,
            fechaDeEntrega: req.body.fechaDeEntrega,
            pedidoId: IDpedido,
            saldoTotal: sumPrecio.sumPrecio
        })
        await pedido.save()

        res.json( pedido )

    } catch (error) {
        console.log(error)
    }
}

const DeletePedido = async (req, res = response) => {

    try {
        const id = req.params.id
        await Pedidos.destroy({ where: { id } })

        res.json({ id })

    } catch (error) {
        console.log(error)
    }
}

const UpdatePedido = async (req, res = response) => {

    const id = req.params.pedidoId
    const { cliente, listaProductos, cantidad, fechaDeEntrega } = req.body

    try {
        const pedido = await Pedidos.findByPk(id)
        // console.log(pedido)

        if (!pedido) {
            return res.status(201).json({
                ok: false,
                message: "Pedido no encontrado"
            })
        }

        pedido.cliente = cliente
        pedido.listaProductos = listaProductos
        pedido.cantidad = cantidad
        pedido.fechaDeEntrega = fechaDeEntrega

        await pedido.save()
        res.json(pedido)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el pedido"
        })
    }

};

const DeletePedidos = async (req, res = response) => {
    try {
        const ids = req.body.ids; // Obtén los IDs de los pedidos a eliminar desde req.body
        console.log(ids)
        // Elimina los pedidos que coincidan con los IDs proporcionados
        const result = await Pedidos.destroy({ where: { id: ids } });

        if (result > 0) {
            res.json({ message: 'Pedidos eliminados correctamente' });
        } else {
            res.json({ message: 'No se encontraron pedidos para eliminar' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar los pedidos' });
    }


};


module.exports = {
    getPerdido,
    CreatePedido,
    DeletePedido,
    UpdatePedido,
    DeletePedidos,
    getProducts
}