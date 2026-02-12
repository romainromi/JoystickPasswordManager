export default function Home() {
    return (
        <div className="max-w-5xl mx-auto text-center mt-24">
            <h1 className="text-5xl font-bold text-pink-600 leading-tight mb-6">
                Gérez vos mots de passe
                <br />
                <span className="text-pink-400">simplement & en sécurité</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Une solution moderne pour stocker, organiser et protéger
                vos identifiants en toute simplicité.
            </p>

            <div className="flex justify-center gap-4">
                <a
                    href="/register"
                    className="bg-pink-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-pink-600 transition"
                >
                    Commencer
                </a>

                <a
                    href="/login"
                    className="border border-pink-300 text-pink-500 px-8 py-3 rounded-2xl hover:bg-pink-50 transition"
                >
                    Se connecter
                </a>
            </div>
        </div>
    );
}
