import { db } from "../config/db.js";

export const createUser = async (email, passwordHash, verifyToken, role = "USER") => {
    const [result] = await db.query(
        `INSERT INTO utilisateurs (email, password, verify_token, role) VALUES (?, ?, ?, ?)`,
        [email, passwordHash, verifyToken, role]
    )
    return result.insertId
};

export const findUserByEmail = async (email) => {
    const [rows] = await db.query(`SELECT * FROM utilisateurs WHERE email = ?`, [email])
    return rows[0]
};

export const findUserByVerifyToken = async (token) => {
    const [rows] = await db.query(`SELECT * FROM utilisateurs WHERE verify_token = ?`, [token])
    return rows[0]
};

export const verifyUser = async (userId) => {
    await db.query(`UPDATE utilisateurs SET is_verified=1, verify_token=NULL WHERE id = ?`, [userId]);
};

export const verifyResetToken = async (userId) => {
    await db.query(`UPDATE utilisateurs SET reset_token = NULL WHERE id = ?`, [userId]);
};

export const findUserByResetToken = async (token) => {
    const [rows] = await db.query(`SELECT * FROM utilisateurs WHERE reset_token = ?`,[token])
    return rows[0]
};

export const updatePassword = async (userId, passwordHash) => {
    await db.query(`UPDATE utilisateurs SET password=?  WHERE id = ?`, [passwordHash, userId]);
};

export const saveResetPassword = async (userId, token) => {
    await db.query(`UPDATE users SET reset_token = ? WHERE id = ?`, [token, userId]);
};