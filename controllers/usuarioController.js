import bcrypt from "bcrypt";
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

const crearUsuario = async (req, res) => {
    const { nombre, apellido, mail, contrasenia, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        // ✅ Se llama al modelo en lugar de llamarse a sí misma recursivamente
        const usuario = await Usuario.createUsuario(
            nombre,
            apellido,
            mail,
            hashedPassword,
            rol
        );

        res.status(201).json(usuario);

    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.deleteUsuario(id);
        res.status(204).send();
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, mail, contrasenia, rol } = req.body;

        // ✅ Se hashea la contraseña antes de actualizar
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        const usuarioActualizado = await Usuario.updateUsuario(id, nombre, apellido, mail, hashedPassword, rol);
        res.json(usuarioActualizado);
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

export { listarUsuario, obtenerUsuario, crearUsuario, eliminarUsuario, actualizarUsuario };