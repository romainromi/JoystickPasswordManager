import { Router } from "express";

export const passwordRoutes = Router();

// passwordRoutes.get("/", (req, res) => {
// 	res.send("Hello from password routes");
// });
import { getAllPasswords, getPasswordByID, addPassword, updatePassword, deletePassword } from "../controllers/password.controller.js";

passwordRoutes.get("/", getAllPasswords);
passwordRoutes.post("/", addPassword);
passwordRoutes.get("/:id", getPasswordByID);
passwordRoutes.patch("/:id", updatePassword);
passwordRoutes.delete("/:id", deletePassword);

// module.exports = passwordRoutes;
