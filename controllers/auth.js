const { response } = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/usuario")
const { generarJWT } = require("../helpers/jwt")
const admin = require("firebase-admin")

const login = async (req, res = response) => {

  try {
    const { firebaseToken } = req.body;

    /* Verificar el token de Firebase y obtener los datos del usuario */
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
  
    const user = {
      nombre: decodedToken.name,
      email: decodedToken.email,
      img: decodedToken.picture,
      role: 'USER_ROLE',
    };

    /* Buscar al usuario en la base de datos por su correo electrónico */
    let usuarioDB = await Usuario.findOne({ where: { email: user.email } });

    if (!usuarioDB) {
      /* El usuario no existe, crear uno nuevo */
      usuarioDB = await Usuario.create(user);
    }

    /* Generar un token JWT para el usuario */
    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    res.json({
      ok: true,
      token,
      usuario: usuarioDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

}

module.exports = {
  login
}
