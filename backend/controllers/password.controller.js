// backend/controllers/password.controller.js
import { getAll } from "../models/password.model.js";

export function getAllPasswords(req, res) {
	const passwords = getAll();
	return res.status(200).json({ passwords });
}

export function getPasswordByID(req, res) {
	return;
}

export function updatePassword(req, res) {
	return;
}

export function addPassword(req, res) {
	return;
}

export function deletePassword(req, res) {
	return;
}
