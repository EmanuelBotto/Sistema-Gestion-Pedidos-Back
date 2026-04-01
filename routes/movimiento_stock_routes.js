import { Router } from "express";
import MovimientoStockController from "../controllers/movimiento_stock_controller.js";

const router = Router();

router.get("/",       MovimientoStockController.getAll);
router.get("/:id",    MovimientoStockController.getById);
router.post("/",      MovimientoStockController.create);
router.delete("/:id", MovimientoStockController.delete);

export default router;
