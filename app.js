import express from "express";
import cors from "cors";
import productoRoutes from "./routes/producto_routes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    process.env.FRONTEND_URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/productos", productoRoutes);
app.use("api/usuarios", usuarioRoutes);

export default app;