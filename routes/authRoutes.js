import { Router } from "express";
import jwt from "jsonwebtoken";
import { login, me } from "../controllers/authController.js";

const router = Router();

// Middleware inline — verifica el token JWT y pone los datos en req.usuario
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token requerido" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // { id, rol, mail }
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};

router.post("/login", login);
router.get("/me", verificarToken, me);

export default router;