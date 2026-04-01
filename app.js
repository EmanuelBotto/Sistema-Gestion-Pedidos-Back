import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productoRoutes from "./routes/producto_routes.js";
import pedidoRoutes from "./routes/pedido_routes.js";
import movimientoStockRoutes from "./routes/movimiento_stock_routes.js";
  
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",  
     process.env.FRONT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/movimientos-stock", movimientoStockRoutes);

export default app;
