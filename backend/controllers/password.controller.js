// backend/controllers/password.controller.js
import { getAll, getByID, createPass, updatePass, deletePass } from "../models/password.model.js";
import { encrypt, decrypt } from "../services/crypto.service.js";

export async function getAllPasswords(req, res) {
	let passwords = await getAll(req.user.id);
	passwords = passwords.map((pLine) => {
		const p = decrypt({
			iv: pLine.iv,
			value: pLine.value,
			tag: pLine.tag,
		});
		const { iv, value, tag, ...cleanPasswordLine } = pLine;
		return { ...cleanPasswordLine, password: p };
	});
	return res.status(200).json({ passwords });
}

export async function getPasswordByID(req, res) {
	let passwordLine = await getByID(req.params.id, req.user.id);
	const password = decrypt({
		iv: passwordLine.iv,
		value: passwordLine.value,
		tag: passwordLine.tag,
	});

	const { iv, value, tag, ...cleanPasswordLine } = passwordLine;
	return res.status(200).json({ data: { ...cleanPasswordLine, password: password } });
}

export async function updatePassword(req, res) {
	try {
		const hash = encrypt(req.body.password);
		await updatePass(req.body.url, req.body.username, hash, req.params.id, req.user.id);
		return res.status(200).json({ message: "Mot de passe modifié" });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: "Erreur pendant le sauvegarde de mot de passe" });
	}
}

export async function addPassword(req, res) {
	try {
		const hash = encrypt(req.body.password);
		await createPass(req.body.url, req.body.username, hash, req.user.id);
		return res.status(200).json({ message: "Mot de passe ajouté" });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: "Erreur pendant le sauvegarde de mot de passe" });
	}
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
