import db from "../config/db.js";

export async function getAll() {
	const [passwords] = await db.execute("SELECT * FROM mots_de_passes");
	return passwords;
}
