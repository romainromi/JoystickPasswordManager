import nodemailer from "nodemailer"
import "dotenv/config"

const env= process.env

export const transporter = nodemailer.createTransport({
    host: env.BREVO_SMTP_HOST,
    port: Number(env.BREVO_SMTP_PORT),
    auth: {
        user: env.BREVO_SMTP_USER,
        pass: env.BREVO_SMTP_PASS
    }
})

transporter.verify((err, success) => {
    if(err) console.error("erreur SMTP", err.message);
    else console.log("SMTP connecté");
})

export const sendVerificationMail = async (email, token) => {

    await transporter.sendMail({
        from: `Joystick Password Manager <${process.env.BREVO_SMTP_MAIL}>`,
        to: email,
        subject: "Confirmez votre adresse mail",
        html: `<h2>Bienvenue sur Joystick Password Manager </h2>
        <p>Merci pour votre inscription, veuillez cliquer sur le lien ci-dessous pour valider votre compte et accèder a tout le contenu du site !</p>
        <a href="http://localhost:5000/auth/verify?token=${token}">Vérifier mon email</a>
        `
    })
}

export const sendResetPasswordEmail = async (email, token) => {
    await transporter.sendMail({
        from: `Joystick Password Manager <${process.env.BREVO_SMTP_MAIL}>`,
        to: email,
        subject: "Changez de mot de passe",
        html: `<h2>Mot de passe oublié?</h2>
        <p>Cliquez ci-dessous pour réinitialiser votre mot de passe, si vous n'etes pas a l'origine de cette demande veuillez nous contacter</p>
        <a href="http://localhost:5000/auth/reset-password-request?token=${token}">Changer mon mot de passe</a>
        `
    })
}