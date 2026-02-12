import { Link } from "react-router-dom";

export default function Dashboard({ credentials, setCredentials }) {
    const handleDelete = (id) => {
        setCredentials(credentials.filter((c) => c.id !== id));
    };

    return (
        <div className="max-w-6xl mx-auto">
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
                                className="text-pink-500 font-medium hover:underline"
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
        </div>
    );
}
