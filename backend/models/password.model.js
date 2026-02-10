import { db } from "../config/db.js";

export async function getAll() {
	const [passwords] = await db.query("SELECT * FROM mots_de_passes");
	return passwords;
}

export async function getByID(id) {
	const [passwords] = await db.query("SELECT * FROM mots_de_passes WHERE id=?", [id]);
	return passwords[0];
}

export async function createPass(url, identifiant, password, utilisateur_id) {
	const [passwords] = await db.query("INSERT INTO mots_de_passes (url, identifiant, password, utilisateur_id) VALUES (?,?,?,?)", [url, identifiant, password, utilisateur_id]);
	return passwords;
}

export async function updatePass(url, username, password, id) {
	const [passwords] = await db.query("UPDATE mots_de_passes SET identifiant=?, password=?, url=? WHERE id=?", [username, password, url, id]);
	return passwords;
}

export async function deletePass(id) {
	const [result] = await db.query("DELETE FROM mots_de_passes WHERE id=?", [id]);
	return result;
}
