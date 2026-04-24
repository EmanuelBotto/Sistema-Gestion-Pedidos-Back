import express from "express";
import cors from "cors";

import productoRoutes from "./routes/producto_routes.js";
import pedidoRoutes from "./routes/pedido_routes.js";
import movimientoStockRoutes from "./routes/movimiento_stock_routes.js"; 
import usuarioRoutes from "./routes/usuarioRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import detallePedidoRoutes from "./routes/detallePedidoRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // 👈 AGREGADO

const app = express();

// ⚠️ Mejor manejo de CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONT_URL
  ].filter(Boolean), // 👈 evita undefined
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

// 🔐 RUTA DE LOGIN (IMPORTANTE que vaya antes o no importa el orden, pero que exista)
app.use("/api/auth", authRoutes);

// 📦 Rutas principales
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/movimientos-stock", movimientoStockRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes); // 👈 corregido plural
app.use("/api/detalle-pedido", detallePedidoRoutes); // 👈 más consistente

export default app;