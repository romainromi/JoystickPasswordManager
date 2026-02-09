import express from "express";
import { passwordRoutes } from "./routes/password.routes.js";
const app = express();
app.use(express.json());

app.use("/api/passwords", passwordRoutes);

app.listen(3000, () => {
	console.log("Serveur lancé sur http://localhost:3000");
});
