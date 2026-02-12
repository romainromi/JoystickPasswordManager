import { z } from "zod";
import { passwordBelongstoUser } from "../models/password.model.js";

export const validateRegister = (req, res, next) => {
	const schema = z.object({
		email: z.email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	});

	try {
		schema.parse(req.body);
		if (req.body.password !== req.body.confirmPassword) {
			return res.status(400).json({ message: "Les mots de passe ne corespondent pas" });
		}

		next();
	} catch (error) {
		return res.status(400).json({
			message: error.issues.map((err) => err.message).join(", "),
		});
	}
};

export const validateLogin = (req, res, next) => {
	const schema = z.object({
		email: z.email(),
		password: z.string().min(6),
	});

	try {
		schema.parse(req.body);
		next();
	} catch (error) {
		return res.status(400).json({
			message: error.issues.map((err) => err.message).join(", "),
		});
	}
};

export const validatePasswordAccess = async (req, res, next) => {
	if (await passwordBelongstoUser(req.params.id, req.user.id)) next();
	else {
		return res.status(401).json({
			message: "Accès refusé",
		});
	}
};

export const validatePasswordData = (req, res, next) => {
	req.body.url = req.body.site;
	req.body.username = req.body.login;
	const schema = z.object({
		url: z.url(),
		username: z
			.string()
			.min(6)
			.max(30)
			.regex(/^(?!.*(?:delete|update|select))[^ &]+$/i), // reject spaces, &, delete, update, select, DELETE, UPDATE, SELECT
		password: z
			.string()
			.min(6)
			.regex(/^(?!.*(?:delete|update|select))[^ &]+$/i),
	});

	try {
		schema.parse(req.body);
		next();
	} catch (error) {
		return res.status(400).json({
			errors: error.issues.map((err) => {
				return {
					field: err.path[0],
					error: err.message,
				};
			}),
		});
	}
};

export const validateId = (req, res, next) => {
	req.params = { ...req.params, id: Number.isInteger(Number(req.params.id)) ? Number(req.params.id) : 0 };

	const schema = z.object({
		id: z.number(),
	});

	try {
		schema.parse(req.params);
		next();
	} catch (error) {
		return res.status(400).json({
			errors: error.issues.map((err) => {
				return {
					field: err.path[0],
					error: err.message,
				};
			}),
		});
	}
};
