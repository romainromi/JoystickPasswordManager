import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jstoken");
        localStorage.removeItem("jstoken_exp");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <nav className="bg-white/70 backdrop-blur-md border-b border-pink-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
            <Link
                to="/"
                className="text-2xl font-bold text-pink-500 tracking-tight"
            >
                Joystick
            </Link>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <Link
                            to="/dashboard"
                            className="text-pink-500 font-medium hover:text-pink-600 transition"
                        >
                            Dashboard
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="bg-pink-500 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-pink-600 transition"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-pink-500 font-medium hover:text-pink-600 transition"
                        >
                            Connexion
                        </Link>

                        <Link
                            to="/register"
                            className="bg-pink-500 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-pink-600 transition"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
