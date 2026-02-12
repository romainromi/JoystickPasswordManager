import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full p-3 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    required
                    className="w-full p-3 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

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
