import pool from "../config/db.js";

export async function getAll() {
	const [passwords] = await pool.query("SELECT * FROM mots_de_passes");
	return passwords;
}

export async function getByID(id) {
	const [passwords] = await pool.query("SELECT * FROM mots_de_passes WHERE id=?", [id]);
	return passwords[0];
}

export async function createPass(url, identifiant, password, utilisateur_id) {
	const [passwords] = await pool.query("INSERT INTO mots_de_passes (url, identifiant, password, utilisateur_id) VALUES (?,?,?,?)", [url, identifiant, password, utilisateur_id]);
	return passwords;
}

export async function updatePass(url, username, password, id) {
	const [passwords] = await pool.query("UPDATE mots_de_passes SET identifiant=?, password=?, url=? WHERE id=?", [username, password, url, id]);
	return passwords;
}

export async function deletePass(id) {
	const [result] = await pool.query("DELETE FROM mots_de_passes WHERE id=?", [id]);
	return result;
}
