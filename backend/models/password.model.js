import { db } from "../config/db.js";

export async function getAll(userId) {
	const [passwords] = await db.query("SELECT url, identifiant, password FROM mots_de_passes WHERE utilisateur_id=?", [userId]);
	return passwords;
}

export async function getByID(id, userId) {
	const [passwords] = await db.query("SELECT url, identifiant, password FROM mots_de_passes WHERE id=? AND utilisateur_id=?", [id, userId]);
	return passwords;
}

export async function createPass(url, identifiant, password, userId) {
	const [passwords] = await db.query("INSERT INTO mots_de_passes (url, identifiant, password, utilisateur_id) VALUES (?,?,?,?)", [url, identifiant, password, userId]);
	return passwords;
}

export async function updatePass(url, username, password, id, userId) {
	const [passwords] = await db.query("UPDATE mots_de_passes SET identifiant=?, password=?, url=? WHERE id=? AND utilisateur_id=?", [username, password, url, id, userId]);
	return passwords;
}

export async function deletePass(id, userId) {
	const [result] = await db.query("DELETE FROM mots_de_passes WHERE id=? AND utilisateur_id=?", [id, userId]);
	return result;
}

export async function passwordBelongstoUser(passId, userId) {
	const [result] = await db.query("SELECT * FROM mots_de_passes WHERE id=? AND utilisateur_id=?", [passId, userId]);
	return result.length > 0;
}
