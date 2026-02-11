// src/pages/Login.jsx
export default function Login() {
    return (
        <div className="flex flex-col items-center justify-start min-h-full p-6 pt-20">
            <h1 className="text-3xl font-bold text-pink-500 mb-6">Connexion</h1>
            <form className="flex flex-col w-full max-w-sm gap-4 bg-white p-6 rounded shadow">
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button className="bg-pink-300 hover:bg-pink-400 text-white font-semibold py-2 px-4 rounded">
                    Se connecter
                </button>
            </form>
        </div>
    );
}
