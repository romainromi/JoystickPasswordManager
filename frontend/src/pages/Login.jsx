import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "L'email ne peut pas être vide";
        } else if (!validateEmail(email)) {
            newErrors.email = "Veuillez entrer un email valide";
        }

        if (!password.trim()) {
            newErrors.password = "Le mot de passe ne peut pas être vide";
        } else if (password.length < 6) {
            newErrors.password = "Le mot de passe doit faire au moins 6 caractères";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsAuthenticated(true);
        navigate("/dashboard");
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">
                Connexion
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl shadow-pink-100 p-8 space-y-5 border border-pink-100"
            >
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-pink-100'} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full p-3 rounded-xl border ${errors.password ? 'border-red-400' : 'border-pink-100'} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-3 rounded-xl shadow-md hover:bg-pink-600 transition"
                >
                    Se connecter
                </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                    to="/register"
                    className="text-pink-500 font-semibold hover:underline"
                >
                    S’inscrire
                </Link>
            </p>
        </div>
    );
}
