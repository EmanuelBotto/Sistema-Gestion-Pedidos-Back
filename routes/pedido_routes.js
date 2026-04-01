import { Router } from "express";
import PedidoController from "../controllers/pedido_controller.js";

const router = Router();

router.get("/",       PedidoController.getAll);
router.get("/:id",    PedidoController.getById);
router.post("/",      PedidoController.create);
router.put("/:id",    PedidoController.update);
router.delete("/:id", PedidoController.delete);

export default router;
