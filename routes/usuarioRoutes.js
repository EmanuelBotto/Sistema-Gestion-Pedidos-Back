import { Router } from "express";
import {
    listarUsuario,
    obtenerUsuario,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/", listarUsuario);
router.get("/:id", obtenerUsuario);
router.post("/", crearUsuario);
router.delete("/:id", eliminarUsuario);
router.put("/:id", actualizarUsuario);

export default router;