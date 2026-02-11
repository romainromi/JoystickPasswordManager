// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-pink-300 p-4 flex items-center justify-between">

            {/* Pour laisser le bouton à droite, on met un div vide à gauche */}
            <div className="w-1/3"></div>

            {/* Nom du site au centre */}
            <div className="text-white text-xl font-bold text-center w-1/3">
                <Link to="/" className="hover:underline">
                    Joystick Password Manager
                </Link>
            </div>

            {/* Bouton Connexion à droite */}
            <div className="w-1/3 flex justify-end">
                <Link
                    to="/login"
                    className="bg-white text-pink-500 font-semibold py-2 px-4 rounded hover:bg-pink-100"
                >
                    Connexion
                </Link>
            </div>
        </nav>
    );
}
