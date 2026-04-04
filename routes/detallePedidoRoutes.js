import { Router } from "express";
import DetallePedidoController from "../controllers/detallePedidoController.js";

const router = Router();

router.get("/",     DetallePedidoController.getAll);
router.get("/:id",  DetallePedidoController.getById);
router.post("/",    DetallePedidoController.create);
router.put("/:id",  DetallePedidoController.update);
router.delete("/:id", DetallePedidoController.delete);

export default router;