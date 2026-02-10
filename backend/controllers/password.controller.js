// backend/controllers/password.controller.js
import { getAll, getByID, createPass, updatePass, deletePass } from "../models/password.model.js";
import bcrypt from "bcrypt";
const saltRounds = 12;

export async function getAllPasswords(req, res) {
	const passwords = await getAll(req.user.id);
	return res.status(200).json({ passwords });
}

export async function getPasswordByID(req, res) {
	const password = await getByID(req.params.id, req.user.id);
	return res.status(200).json({ data: password });
}

export function updatePassword(req, res) {
	bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
		if (err) {
			return res.status(500).json({ error: "Erreur pendant la generation de mot de passe" });
		}

		try {
			await updatePass(req.body.url, req.body.username, hash, req.params.id, req.user.id);
			return res.status(200).json({ message: "Mot de passe modifié" });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: "Erreur pendant le sauvegarde de mot de passe" });
		}
	});
}

export function addPassword(req, res) {
	bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
		if (err) {
			return res.status(500).json({ error: "Erreur pendant la generation de mot de passe" });
		}

		try {
			await createPass(req.body.url, req.body.username, hash, req.user.id);
			return res.status(200).json({ message: "Mot de passe ajouté" });
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ error: "Erreur pendant le sauvegarde de mot de passe" });
		}
	});
}

export async function deletePassword(req, res) {
	try {
		await deletePass(req.params.id, req.user.id);
		return res.status(204).send();
	} catch (error) {
		console.log(error.message);
		return res.status(500).send("Oops! Mot de passe pas supprimé");
	}
}
