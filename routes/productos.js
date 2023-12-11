const { dbconnection } = require('../config/database')
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getProducto, createProducto, updateProducto, deleteProducto } = require('../controllers/productControllers')
/* Importa los controladores modificacion */


const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../imagenes'), /* carpeta donde se almacenan las imagenes */
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-monkeywit-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('imagen')

const router = express.Router()

router.get('/verProducto', getProducto)
router.post('/crearProducto', createProducto)
router.put('/:id', updateProducto)
router.delete('/:id', deleteProducto)

router.post('/imagen/post', fileUpload, async (req, res) => {
    try {
        const connection = await dbconnection.getConnection();

        if (!connection) {
            return res.status(500).send('No se pudo conectar a la base de datos.');
        }

        const data = fs.readFileSync(path.join(__dirname, '../imagenes/' + req.file.filename));
        const base64Image = data.toString('base64');

        if (!base64Image) {
            return res.status(500).send('Error al leer la imagen.');
        }

        // Consulta SQL simple para inserción básica
        await connection.query('INSERT INTO Productos (imagen) VALUES (?)', [base64Image], (err) => {
            if (err) return res.status(500).send('Error en el servidor');
            res.send('¡Imagen guardada!');
        })

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    } finally {
        if (connection) {
            connection.release(); // Libera la conexión a la base de datos
        }
    }
});


module.exports = router

