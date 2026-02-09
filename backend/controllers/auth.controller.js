import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { v4 as uuid4 } from "uuid";
import "dotenv/config";
import {
    createUser,
    findUserByEmail,
    findUserByVerifyToken,
    saveResetPassword,
    verifyUser,
} from "../models/user.model";
import { sendResetPasswordEmail, sendVerificationMail } from "../config/mailer";

export const register = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const existing = await findUserByEmail(email);
        if (existing)
            return res
                .status(400)
                .json({ message: "Cet email est déjà utilisé" });

        const passwordHash = await argon2.hash(password);
        const verifyToken = uuid4();

        await createUser(email, passwordHash, verifyToken);

        await sendVerificationMail(email, verifyToken);

        res.status(201).json({ message: "Compte crée, vérifier votre email" });
    } catch (error) {
        res.status(500).json({
            message: "erreur serveur",
            error: error.message,
        });
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        const user = await findUserByVerifyToken(token);
        if (!user) {
            return res.status(400).json({ message: "Toekn invalide" });
        }
        await verifyUser(user.id);
        res.status(200).json({ message: "votre compte a bien été vérifier" });
    } catch (error) {
        res.status(500).json({
            message: "erreur serveur",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user)
            return res
                .status(400)
                .json({ message: "Email ou mot de passe incorrect" });
        if (!user.is_verified)
            return res.status(403).json({ message: "Compte non vérifié" });

        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return res
                .status(400)
                .json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );

        return res.status(200).json({ token });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "erreur serveur", error: error.message });
    }
};

export const resetPasswordRequest = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await findUserByEmail(email)
        if(!user) return res.status(400).json({message: "Email non trouvé "})

        const resetToken = uuid4()
        await saveResetPassword(user.id, resetToken)
        await sendResetPasswordEmail(email, resetToken)

        res.status(200).json({message: "Email de réinitialisation envoyé"})
    } catch (error) {
        res.status(500).json({message: "erreur serveur", error: error.message})
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {token, password} = req.body;
        const user = await findUserByResetToken(token);
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé ou Token invalide" });
        }
        
        const passwordHash = await argon2.hash(password);

        await updatePassword(user.id, passwordHash);
        await verifyResetToken(user.id)

        res.status(200).json({message: "MOT DE PASSE REINITIALISER AVEC SUCCES"});
    } catch (error) {
        res.status(500).json({ message: "erreur server", error: error.message });
    }
}