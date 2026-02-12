import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditCredential({ credentials, setCredentials }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [site, setSite] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (id !== "new") {
            const item = credentials.find(
                (d) => d.id === Number.parseInt(id)
            );

            if (item) {
                setSite(item.site);
                setLogin(item.login);
                setPassword(item.password);
            }
        }
    }, [id, credentials]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id === "new") {
            const newCredential = {
                id: Date.now(),
                site,
                login,
                password,
            };

            setCredentials([...credentials, newCredential]);
        } else {
            setCredentials(
                credentials.map((c) =>
                    c.id === Number.parseInt(id)
                        ? { ...c, site, login, password }
                        : c
                )
            );
        }

        navigate("/dashboard");
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">
                {id === "new"
                    ? "Ajouter un identifiant"
                    : "Modifier un identifiant"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl shadow-pink-100 p-8 space-y-5 border border-pink-100"
            >
                <input
                    type="text"
                    placeholder="Site"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />

                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-3 rounded-xl shadow-md hover:bg-pink-600 transition"
                >
                    {id === "new" ? "Ajouter" : "Modifier"}
                </button>
            </form>
        </div>
    );
}
