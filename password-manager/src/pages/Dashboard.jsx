// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";

export default function Dashboard() {
    // Données factices pour le moment
    const dummyData = [
        { id: 1, site: "Google", login: "user@gmail.com", password: "••••••" },
        { id: 2, site: "Facebook", login: "user@fb.com", password: "••••••" },
    ];

    return (
        <div className="p-6">
            {/* Titre */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-pink-500">Vos identifiants</h1>

                {/* Bouton Ajouter */}
                <Link
                    to="/edit/new"
                    className="bg-pink-300 hover:bg-pink-400 text-white font-semibold py-2 px-4 rounded"
                >
                    Ajouter un identifiant
                </Link>
            </div>

            {/* Tableau des identifiants */}
            <table className="min-w-full border border-gray-200 rounded">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="p-2 text-left">Site</th>
                        <th className="p-2 text-left">Login</th>
                        <th className="p-2 text-left">Mot de passe</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map(item => (
                        <tr key={item.id} className="border-t">
                            <td className="p-2">{item.site}</td>
                            <td className="p-2">{item.login}</td>
                            <td className="p-2">{item.password}</td>
                            <td className="p-2 flex gap-2">
                                {/* Bouton Modifier */}
                                <Link
                                    to={`/edit/${item.id}`}
                                    className="bg-yellow-300 hover:bg-yellow-400 py-1 px-2 rounded"
                                >
                                    Modifier
                                </Link>

                                {/* Bouton Supprimer */}
                                <button className="bg-red-300 hover:bg-red-400 py-1 px-2 rounded">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
