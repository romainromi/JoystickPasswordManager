import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

export default function Dashboard({ credentials, setCredentials }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [visiblePasswords, setVisiblePasswords] = useState(new Set());

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const fetchCredentials = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("jstoken");
            if (!token) {
                setError("Token manquant");
                return;
            }
            const response = await fetch('http://localhost:5000/api/passwords', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors du chargement des identifiants');
                return;
            }

            const passwords = Array.isArray(data.passwords) ? data.passwords : [];
            setCredentials(passwords);
            setError("");
        } catch (err) {
            setError('Erreur serveur');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    }, [setCredentials]);

    useEffect(() => {
        fetchCredentials();
    }, [fetchCredentials]);

    const handleDelete = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce credential ?')) {
            return;
        }

        try {
            const token = localStorage.getItem("jstoken");
            if (!token) {
                setError("Token manquant");
                return;
            }
            const response = await fetch(`http://localhost:5000/api/passwords/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.status === 204 ? null : await response.json();

            if (!response.ok) {
                setError((data && data.message) || 'Erreur lors de la suppression');
                return;
            }

            setCredentials((prev) => prev.filter((c) => c.uid !== id));
            setError("");
        } catch (err) {
            setError('Erreur serveur');
            console.error('Error:', err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Chargement des identifiants...</p>
                </div>
            ) : credentials.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">Aucun identifiant enregistré</p>
                    <Link
                        to="/edit/new"
                        className="bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-pink-600 transition inline-block"
                    >
                        + Ajouter le premier
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-12">
                        <h1 className="text-4xl font-bold text-pink-600">
                            Vos identifiants
                        </h1>

                        <Link
                            to="/edit/new"
                            className="bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-pink-600 transition"
                        >
                            + Ajouter
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {credentials.map((item) => (
                            <div
                                key={item.uid}
                                className="bg-white rounded-2xl shadow-lg shadow-pink-100 p-6 border border-pink-100 hover:shadow-xl transition"
                            >
                                <h2 className="text-xl font-semibold text-pink-600 mb-2">
                                    {item.site}
                                </h2>

                                <p className="text-gray-600 text-sm mb-1">
                                    {item.login}
                                </p>

                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-gray-400 text-sm">
                                        {visiblePasswords.has(item.uid) ? item.password : '•'.repeat(Math.min(item.password.length, 10))}
                                    </p>
                                    <button
                                        onClick={() => togglePasswordVisibility(item.uid)}
                                        className="text-gray-400 hover:text-gray-600 transition ml-2"
                                        title={visiblePasswords.has(item.uid) ? "Masquer" : "Afficher"}
                                    >
                                        {visiblePasswords.has(item.uid) ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>

                                <div className="flex justify-between">
                                    <Link
                                        to={`/edit/${item.uid}`}
                                        className="text-pink-500 font-medium hover:text-pink-600"
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(item.uid)}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

Dashboard.propTypes = {
    credentials: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        site: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    })).isRequired,
    setCredentials: PropTypes.func.isRequired,
};
