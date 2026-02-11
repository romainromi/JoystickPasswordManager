import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const ALGORITHM = "aes-256-gcm";
const KEY = crypto.createHash("sha256").update(process.env.CRYPTO_KEY).digest(); // 32 bytes

export function encrypt(plainText) {
	const iv = crypto.randomBytes(12); // GCM standard
	const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

	const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);

	return {
		iv: iv.toString("base64"),
		value: encrypted.toString("base64"),
		tag: cipher.getAuthTag().toString("base64"),
	};
}

export function decrypt(payload) {
	const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(payload.iv, "base64"));

	decipher.setAuthTag(Buffer.from(payload.tag, "base64"));

	const decrypted = Buffer.concat([decipher.update(Buffer.from(payload.value, "base64")), decipher.final()]);

	return decrypted.toString("utf8");
}
