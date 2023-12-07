require('dotenv').config();
const express = require('express');
const cors = require('cors');
/* Crear el servidor de express */
const app = express();

const admin = require("firebase-admin");
const serviceAccount = require("./trabajopractico3-7ab63-firebase-adminsdk-4f4ll-8f1122cad0.json")
/* Configurar CORS */
app.use(cors());

/* Lectura y parseo del body */
app.use(express.json());


/* Rutas */
app.use('/login', require('./routes/auth'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/productos', require('./routes/productos'))
app.use('/pedidos', require('./routes/Pedidos'))
app.use('/listaProductos', require('./routes/ListaProductos'))
app.use('/reporteVentas', require('./routes/ReporteVentas'))
app.use('/reporteCompras', require('./routes/ReporteCompras'))
app.use('/proveedores', require('./routes/proveedores'));
app.use('/clientes', require('./routes/clientes'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.DATABASE_PORT}`);
});
