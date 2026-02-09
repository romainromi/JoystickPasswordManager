import { z } from "zod";

export const validateRegister = (req, res, next) => {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    });

    try {
        schema.parse(req.body);
        if (req.body.password !== req.body.confirmPassword) {
            return res
                .status(400)
                .json({ message: "Les mots de passe ne corespondent pas" });
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
