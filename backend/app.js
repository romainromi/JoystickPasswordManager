import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import helmet from "helmet";
import { passwordRoutes } from "./routes/password.routes.js";
import { authMiddleware } from "../backend/middleware/auth.middleware.js";
import Logger from "./middleware/logger.middleware.js";

const app = express();

app.use(helmet());

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5137",
	}),
);

app.set("trust proxy", true);
app.use(Logger);
app.use("/auth", authRoutes);
app.use("/api/passwords", authMiddleware, passwordRoutes);
app.get("/", (req, res) => res.send("Test backend"));

export default app;
