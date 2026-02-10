// src/components/Navbar.jsx
export default function Navbar() {
    return (
        <nav className="bg-pink-200 shadow p-4 flex justify-center items-center relative">
            {/* Nom du site centré */}
            <h1 className="text-2xl font-bold text-pink-700">
                Joystick Password Manager
            </h1>

            {/* Bouton Connexion à droite */}
            <button className="absolute right-4 bg-pink-300 hover:bg-pink-400 text-white font-semibold py-2 px-4 rounded">
                Connexion
            </button>
        </nav>
    );
}
