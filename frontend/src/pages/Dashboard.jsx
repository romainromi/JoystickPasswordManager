import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

export default function Dashboard({ credentials, setCredentials }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCredentials = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/passwords', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors du chargement des identifiants');
                return;
            }

            setCredentials(data);
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
            const response = await fetch(`http://localhost:5000/api/passwords/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur lors de la suppression');
                return;
            }

            setCredentials(credentials.filter((c) => c.id !== id));
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
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg shadow-pink-100 p-6 border border-pink-100 hover:shadow-xl transition"
                            >
                                <h2 className="text-xl font-semibold text-pink-600 mb-2">
                                    {item.site}
                                </h2>

                                <p className="text-gray-600 text-sm mb-1">
                                    {item.login}
                                </p>

                                <p className="text-gray-400 text-sm mb-6">
                                    {item.password}
                                </p>

                                <div className="flex justify-between">
                                    <Link
                                        to={`/edit/${item.id}`}
                                        className="text-pink-500 font-medium hover:text-pink-600"
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(item.id)}
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
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        site: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    })).isRequired,
    setCredentials: PropTypes.func.isRequired,
};
