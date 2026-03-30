import express from "express";
import cors from "cors";
import turnosRoutes from "./routes/turno_route.js";
import usuarioRoutes from "./routes/usuario_routes.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://sistema-de-turnos-x23u.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/turnos", turnosRoutes);
app.use("/api/usuarios", usuarioRoutes);

export default app;