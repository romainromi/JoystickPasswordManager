import { db } from "../config/db.js";

export async function getAll(userId) {
	const [passwords] = await db.query("SELECT url, identifiant, iv, value, tag FROM mots_de_passes WHERE utilisateur_id=?", [userId]);
	return passwords;
}

export async function getByID(id, userId) {
	const [passwords] = await db.query("SELECT url, identifiant, iv, value, tag FROM mots_de_passes WHERE id=? AND utilisateur_id=?", [id, userId]);
	return passwords[0];
}

export async function createPass(url, identifiant, password, userId) {
	const [passwords] = await db.query("INSERT INTO mots_de_passes (url, identifiant, iv, value, tag, utilisateur_id) VALUES (?,?,?,?,?,?)", [
		url,
		identifiant,
		password.iv,
		password.value,
		password.tag,
		userId,
	]);
	return passwords;
}

export async function updatePass(url, username, password, id, userId) {
	const [passwords] = await db.query("UPDATE mots_de_passes SET identifiant=?, iv=?, value=?, tag=?, url=? WHERE id=? AND utilisateur_id=?", [
		username,
		password.iv,
		password.value,
		password.tag,
		url,
		id,
		userId,
	]);
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
