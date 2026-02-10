import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { passwordRoutes } from "./routes/password.routes.js";
import { authMiddleware } from "../backend/middleware/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5137",
	}),
);

app.use("/auth", authRoutes);
app.use("/api/passwords", authMiddleware, passwordRoutes);
app.get("/", (req, res) => res.send("Test backend"));

export default app;
