import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 5,
	message: {
		message: "Trop de tentatives échouées, Réessayez dans 10 minutes ",
	},
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: true,
});
