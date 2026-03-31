import * as Usuario from "../models/usuario.js";

const listarUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.getUsuario();
        res.json(usuarios);
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.getUsuarioById(id);
        res.json(usuario);
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};

const createUsuario = async (req, res) => {
    try {
        const { nombre, apellido, mail, contrasenia, rol, id } = req.body;

        if (
            !nombre || 
            !apellido || 
            !mail ||
            !contrasenia ||
            !rol ||
            !id
        ) {
            return res.status(400).json({ error: "nombre, apellido, mail, contraseña, rol e id son obligatorios" });
        }
    } catch (error ) {
        console.log("ERROR REAL:", error);
        res.status(400).json({ error: "Error al crear usuario" });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.deleteUsuario(id);
        res.status(204).send();
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al eliminar usuario "});
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, mail, contrasenia, rol} = req.body;
        const usuarioActualizado = await Usuario.updateUsuario(id, nombre, apellido, mail, contrasenia, rol);
        res.json(usuarioActualizado);
    } catch (error) {
        console.log("ERROR REAL:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};