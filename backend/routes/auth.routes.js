import express from "express";
import { login, register, resetPassword, resetPasswordRequest, verifyEmail } from "../controllers/auth.controller.js";
import { validateLogin, validateRegister } from "../middleware/validation.middleware.js";
import { loginLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router()

router.post('/register', validateRegister, register)
router.get('/verify', verifyEmail)
router.post('/login', validateLogin, loginLimiter, login)
router.post('/reset-password-request', resetPasswordRequest)
router.post('/reset-password', resetPassword)

export default router