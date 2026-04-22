import { Router } from "express";
import jwt from "jsonwebtoken";
import PedidoController from "../controllers/pedido_controller.js";

const router = Router();

// Middleware — verifica token y pone los datos del usuario en req.usuario
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

router.get("/",       verificarToken, PedidoController.getAll);
router.get("/:id",    verificarToken, PedidoController.getById);
router.post("/",      verificarToken, PedidoController.create);
router.put("/:id",    verificarToken, PedidoController.update);
router.delete("/:id", verificarToken, PedidoController.delete);

export default router;