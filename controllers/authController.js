import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsuarioByMail } from "../models/usuario.js";

export const login = async (req, res) => {
    const { mail, contrasenia } = req.body;

    try {
        const usuario = await getUsuarioByMail(mail);

        if (!usuario) {
            return res.status(400).json({ error: "Usuario no existe" });
        }

        const passwordValida = await bcrypt.compare(
            contrasenia,
            usuario.contrasenia
        );

        if (!passwordValida) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({ token, usuario });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en login" });
    }
};