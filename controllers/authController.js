import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsuarioByMail, getUsuarioByMailConCliente } from "../models/usuario.js";

export const login = async (req, res) => {
    const { mail, contrasenia } = req.body;

    try {
        if (!mail || !contrasenia) {
            return res.status(400).json({ error: "mail y contrasenia son obligatorios" });
        }

        const usuario = await getUsuarioByMail(mail);

        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const hash = usuario.contrasenia || "";
        let passwordValida = false;

        if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
            passwordValida = await bcrypt.compare(contrasenia, hash);
        } else {
            passwordValida = contrasenia === hash;
        }

        if (!passwordValida) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("Falta JWT_SECRET en variables de entorno");
            return res.status(500).json({ error: "Configuración incompleta del servidor (JWT_SECRET)" });
        }

        // ✅ Se incluye mail y cliente_id en el token para que los controllers
        //    puedan filtrar por cliente sin hacer una consulta extra
        const token = jwt.sign(
            {
                id:         usuario.id,
                rol:        usuario.rol,
                mail:       usuario.mail,
                cliente_id: usuario.cliente_id ?? null,
            },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        const usuarioSeguro = {
            id:         usuario.id,
            nombre:     usuario.nombre,
            apellido:   usuario.apellido,
            mail:       usuario.mail,
            rol:        usuario.rol,
            cliente_id: usuario.cliente_id ?? null,
        };

        res.json({ token, usuario: usuarioSeguro });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en login" });
    }
};

// ── /ME ──────────────────────────────────────────────────────────────────────
// Si el rol es "cliente" devuelve también los datos de la tabla cliente
export const me = async (req, res) => {
    try {
        const { rol, mail } = req.usuario;

        let usuario;

        if (rol === "cliente") {
            usuario = await getUsuarioByMailConCliente(mail);
        } else {
            const raw = await getUsuarioByMail(mail);
            if (raw) {
                const { contrasenia: _, ...rest } = raw;
                usuario = rest;
            }
        }

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ usuario });

    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al obtener sesión" });
    }
};