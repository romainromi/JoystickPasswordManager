import { db } from "../config/db.js";
import crypto from "crypto";

export async function getAll(userId) {
	const [passwords] = await db.query("SELECT url as site, identifiant as login, iv, value, tag , uid FROM mots_de_passes WHERE utilisateur_id=?", [userId]);
	return passwords;
}

export async function getByUID(uid, userId) {
	const [passwords] = await db.query("SELECT url as site, identifiant as login, iv, value, tag, uid FROM mots_de_passes WHERE uid=? AND utilisateur_id=?", [uid, userId]);

	return passwords[0];
}

export async function createPass(url, identifiant, password, userId) {
	let uuid = crypto.randomUUID();
	const [passwords] = await db.query("INSERT INTO mots_de_passes (url, identifiant, iv, value, tag, utilisateur_id, uid) VALUES (?,?,?,?,?,?,?)", [
		url,
		identifiant,
		password.iv,
		password.value,
		password.tag,
		userId,
		uuid,
	]);
	return passwords;
}

export async function updatePass(url, username, password, uid, userId) {
	const [passwords] = await db.query("UPDATE mots_de_passes SET identifiant=?, iv=?, value=?, tag=?, url=? WHERE uid=? AND utilisateur_id=?", [
		username,
		password.iv,
		password.value,
		password.tag,
		url,
		uid,
		userId,
	]);
	return passwords;
}

export async function deletePass(uid, userId) {
	const [result] = await db.query("DELETE FROM mots_de_passes WHERE uid=? AND utilisateur_id=?", [uid, userId]);
	return result;
}

export async function passwordBelongstoUser(passUId, userId) {
	const [result] = await db.query("SELECT * FROM mots_de_passes WHERE uid=? AND utilisateur_id=?", [passUId, userId]);
	return result.length > 0;
}
