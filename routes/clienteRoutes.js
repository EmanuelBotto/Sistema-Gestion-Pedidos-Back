import { Router } from "express";
import {
    listarCliente,
    obtenerCliente,
    crearCliente,
    eliminarCliente,
    actualizarCliente,
} from "../controllers/clienteController.js";

const router = Router();

router.get("/", listarCliente);
router.get("/:id", obtenerCliente);
router.post("/", crearCliente);
router.delete("/:id", eliminarCliente);
router.put("/:id", actualizarCliente);

export default router;