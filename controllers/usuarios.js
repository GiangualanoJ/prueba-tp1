const { response } = require('express');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, 'nombre email role google');

        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.log(error)
    }
}

const createUsuario = async (req, res = response) => {
    try {
        const usuario = new Usuario(req.body)
        await usuario.save()

        res.json({ usuario })
    } catch (error) {
        console.log(error)
    }
}

const updateUsuario = async (req, res = response) => {

    const id = req.params.id
    const { nombre, email, imagen } = req.body

    try {
        const usuario = await Usuario.findByPk(id)
        console.log(usuario)

        if (!usuario) {
            return res.status(201).json({
                ok: false,
                message: "usuario no encontrado"
            })
        }

        usuario.nombre = nombre
        usuario.email = email
        usuario.imagen = imagen



        await usuario.save()
        res.json(usuario)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el producto"
        })
    }

};

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await usuarioDB.destroy();


        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    borrarUsuario
}