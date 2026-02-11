// src/pages/EditCredential.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditCredential() {
    const { id } = useParams(); // récupère l'ID de l'identifiant
    const navigate = useNavigate();

    // Données factices pour l'exemple
    const dummyData = [
        { id: 1, site: "Google", login: "user@gmail.com", password: "••••••" },
        { id: 2, site: "Facebook", login: "user@fb.com", password: "••••••" },
    ];

    // State pour le formulaire
    const [site, setSite] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    // Si on est en mode modification, remplir le formulaire
    useEffect(() => {
        if (id !== "new") {
            const item = dummyData.find(d => d.id === Number.parseInt(id));
            if (item) {
                setSite(item.site);
                setLogin(item.login);
                setPassword(item.password);
            }
        }
    }, [id, dummyData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici tu feras la logique pour sauvegarder les données
        alert(`Identifiant ${id === "new" ? "ajouté" : "modifié"} !`);
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-full p-6 pt-20">
            <h1 className="text-3xl font-bold text-pink-500 mb-6">
                {id === "new" ? "Ajouter un identifiant" : "Modifier un identifiant"}
            </h1>

            <form
                className="flex flex-col w-full max-w-sm gap-4 bg-white p-6 rounded shadow"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Site"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                    type="submit"
                    className="bg-pink-300 hover:bg-pink-400 text-white font-semibold py-2 px-4 rounded"
                >
                    {id === "new" ? "Ajouter" : "Modifier"}
                </button>
            </form>
        </div>
    );
}
