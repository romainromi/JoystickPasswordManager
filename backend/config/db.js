import mysql from "mysql2/promise";
import "dotenv/config";

let db;

try {
    let env = preprocess.env;

    db = mysql.createPool({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASS,
        database: env.DB_NAME,
    });

    await db.getConnection();
    console.log(`Connexion a la database ${env.DB_NAME} réussi`);
} catch (error) {
    console.error(
        ("Erreur lors de la connexion a la base de données", error.message),
    );
    process.exit(1);
}

export { db };
