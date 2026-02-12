import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditCredential({ credentials, setCredentials }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [site, setSite] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

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

    const validateEmail = (email) => {
        const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!site.trim()) {
            newErrors.site = "Le site ne peut pas être vide";
        }

        if (!login.trim()) {
            newErrors.login = "Le login/email ne peut pas être vide";
        } else if (!validateEmail(login)) {
            newErrors.login = "Veuillez entrer un email valide";
        }

        if (!password.trim()) {
            newErrors.password = "Le mot de passe ne peut pas être vide";
        } else if (password.length < 6) {
            newErrors.password = "Le mot de passe doit faire au moins 6 caractères";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            let response;

            if (id === "new") {
                // Créer un nouveau credential
                response = await fetch('http://localhost:5000/api/passwords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        site,
                        login,
                        password,
                    }),
                });
            } else {
                // Modifier un credential existant
                response = await fetch(`http://localhost:5000/api/passwords/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        site,
                        login,
                        password,
                    }),
                });
            }

            const data = await response.json();

            if (!response.ok) {
                setErrors({ submit: data.message || 'Erreur lors de l\'enregistrement' });
                return;
            }

            // Succès !
            navigate("/dashboard");
        } catch (error) {
            setErrors({ submit: 'Erreur serveur' });
            console.error('Error:', error);
        }
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
                {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {errors.submit}
                    </div>
                )}
                <div>
                    <input
                        type="text"
                        placeholder="Site"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        className={`w-full p-3 rounded-xl border ${errors.site ? 'border-red-400' : 'border-pink-100'} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    />
                    {errors.site && <p className="text-red-500 text-sm mt-1">{errors.site}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Login/Email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className={`w-full p-3 rounded-xl border ${errors.login ? 'border-red-400' : 'border-pink-100'} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    />
                    {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full p-3 rounded-xl border ${errors.password ? 'border-red-400' : 'border-pink-100'} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

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
