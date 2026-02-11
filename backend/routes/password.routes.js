import { Router } from "express";
import { validateId, validatePasswordData, validatePasswordAccess } from "../middleware/validation.middleware.js";

export const passwordRoutes = Router();

// passwordRoutes.get("/", (req, res) => {
// 	res.send("Hello from password routes");
// });
import { getAllPasswords, getPasswordByID, addPassword, updatePassword, deletePassword } from "../controllers/password.controller.js";

passwordRoutes.get("/", getAllPasswords);
passwordRoutes.post("/", validatePasswordData, addPassword);
passwordRoutes.get("/:id", validateId, validatePasswordAccess, getPasswordByID);
passwordRoutes.patch("/:id", validateId, validatePasswordData, validatePasswordAccess, updatePassword);
passwordRoutes.delete("/:id", validateId, validatePasswordAccess, deletePassword);

// module.exports = passwordRoutes;
