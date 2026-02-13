import { Router } from "express";
import { validateUId, validatePasswordData, validatePasswordAccess } from "../middleware/validation.middleware.js";

export const passwordRoutes = Router();

// passwordRoutes.get("/", (req, res) => {
// 	res.send("Hello from password routes");
// });
import { getAllPasswords, getPasswordByID, addPassword, updatePassword, deletePassword } from "../controllers/password.controller.js";

passwordRoutes.get("/", getAllPasswords);
passwordRoutes.post("/", validatePasswordData, addPassword);
passwordRoutes.get("/:uid", validateUId, validatePasswordAccess, getPasswordByID);
passwordRoutes.patch("/:uid", validateUId, validatePasswordData, validatePasswordAccess, updatePassword);
passwordRoutes.delete("/:uid", validateUId, validatePasswordAccess, deletePassword);

// module.exports = passwordRoutes;
