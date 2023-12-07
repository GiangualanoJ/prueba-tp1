const { response } = require('express');
const ListaProductos = require('../models/ListaProductos');
const { dbConnection } = require('../config/database')
const QueryTypes = require('sequelize')

const CreateProducto = async (req, res = response) => {

    try {
        const { productos } = req.body;

        const q = await ListaProductos.findOne({
            order: [['pedidoId', 'Desc']],
            attributes: ['pedidoId'],
            raw: true
        });


        if (q != null) {
            // console.log('tenia algo')
            const productosConPedidoId = productos.map(async (producto) => {
                const query2 = `SELECT precio FROM Productos WHERE nombre = '${producto.nombreProducto}'`;
                const precio = await dbConnection.query(query2, { type: QueryTypes.SELECT });
                const precioXunidad = precio[0][0].precio;

                return {
                    ...producto,
                    pedidoId: producto.pedidoId + q.pedidoId,
                    precioXproductos: precioXunidad * producto.cantidad,
                };
            });
            Promise.all(productosConPedidoId)
                .then((productosCreados) => {
                    ListaProductos.bulkCreate(productosCreados)
                        .then(() => {
                            res.status(201).json({ mensaje: 'Lista de productos creada exitosamente' });
                        })
                })
        } else {
            // console.log("estaba en null")
            const productosConPedidoId = productos.map(async (producto) => {
                const query2 = `SELECT precio FROM Productos WHERE nombre = '${producto.nombreProducto}'`;
                const precio = await dbConnection.query(query2, { type: QueryTypes.SELECT });
                const precioXunidad = precio[0][0].precio;

                return {
                    ...producto,
                    pedidoId: producto.pedidoId + 0,
                    precioXproductos: precioXunidad * producto.cantidad,
                };
            });
            Promise.all(productosConPedidoId)
                .then((productosCreados) => {
                    ListaProductos.bulkCreate(productosCreados)
                        .then(() => {
                            res.status(201).json({ mensaje: 'Lista de productos creada exitosamente' });
                        })
                })
        }


    } catch (error) {
        console.log("Hubo un error al crear la lista de productos", error)
    }
}

const updateProducto = async (req, res = response) => {
    try {

        const { productos } = req.body;
        // console.log(productos)

        // Obtener los IDs de los productos a actualizar
        const productoIds = productos.map((producto) => producto.id);

        // Verificar si los productos existen en la base de datos
        const productosEncontrados = await ListaProductos.findAll({
            where: { id: productoIds },
        });

        if (productosEncontrados.length !== productoIds.length) {
            return res.status(404).json({ mensaje: "Algunos productos no fueron encontrados" });
        }

        productos.forEach(async (producto) => {

            const productoEncontrado = productosEncontrados.find((p) => p.id === producto.id);

            // console.log('1', productoEncontrado.dataValues)

            productoEncontrado.nombreProducto = producto.nombreProducto;
            productoEncontrado.cantidad = producto.cantidad;
            productoEncontrado.pedidoId = producto.pedidoId;

            const query = `SELECT precio FROM Productos WHERE nombre = '${producto.nombreProducto}'`;
            const [precio] = await dbConnection.query(query, { type: QueryTypes.SELECT });
            const precioXunidad = precio[0].precio;
            productoEncontrado.precioXproductos = precioXunidad * producto.cantidad;
            // console.log('2', precioXunidad)
            

            // console.log('3', productosEncontrados.map((producto) => producto.dataValues));
            
            
            // Guardar los cambios en la base de datos
            await Promise.all(productosEncontrados.map((producto) => producto.save()));

            /* recordar que para poder ver los productos en la tabla de la web , se debe recargar la página */
        });
        


        res.json(productosEncontrados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al actualizar los productos" });
    }
};


const getProductos = async (req, res = response) => {
    try {
        const productos = await ListaProductos.findAll()
        res.json(productos)
    } catch (error) {
        console.log(error)
    }
}

const getProductos2 = async (req, res = response) => {
    try {
        const { pedidoId } = req.params;


        const productos = await ListaProductos.findAll({
            where: { pedidoId },
        });
        res.json(productos);


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    CreateProducto,
    getProductos,
    updateProducto,
    getProductos2
}