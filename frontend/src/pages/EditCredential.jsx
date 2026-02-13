import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditCredential({ credentials, setCredentials }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [site, setSite] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id === "new") {
            setSite("");
            setLogin("");
            setPassword("");
            return;
        }

        const item = credentials.find((d) => String(d.uid) === String(id));
        if (item) {
            setSite(item.site);
            setLogin(item.login);
            setPassword(item.password);
        }

        let isActive = true;
        const fetchCredential = async () => {
            try {
                const token = localStorage.getItem("jstoken");
                if (!token) {
                    if (isActive) {
                        setErrors({ submit: "Token manquant" });
                    }
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/passwords/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    if (isActive) {
                        setErrors({ submit: data.message || "Erreur lors du chargement" });
                    }
                    return;
                }

                const payload = data?.data || {};
                if (isActive) {
                    setSite(payload.site || "");
                    setLogin(payload.login || "");
                    setPassword(payload.password || "");
                }
            } catch (error) {
                if (isActive) {
                    setErrors({ submit: "Erreur serveur" });
                }
                console.error("Error:", error);
            }
        };

        fetchCredential();

        return () => {
            isActive = false;
        };
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
            const token = localStorage.getItem("jstoken");
            if (!token) {
                setErrors({ submit: "Token manquant" });
                return;
            }
            let response;

            if (id === "new") {
                // Créer un nouveau credential
                response = await fetch('http://localhost:5000/api/passwords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
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
                        Authorization: `Bearer ${token}`,
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
            const savedItem = {
                uid: data?.uid ?? (id === "new" ? Date.now() : Number.parseInt(id)),
                site,
                login,
                password,
            };

            if (id === "new") {
                setCredentials([...credentials, savedItem]);
            } else {
                setCredentials(
                    credentials.map((c) => (c.uid === savedItem.uid ? savedItem : c))
                );
            }

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
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-3 pr-12 rounded-xl border ${errors.password ? 'border-red-400' : 'border-pink-100'} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            title={showPassword ? "Masquer" : "Afficher"}
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
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
