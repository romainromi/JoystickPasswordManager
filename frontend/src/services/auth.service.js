export const Authenticate = async (email, password) => {
    const token = localStorage.getItem("jstoken");
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion');
    }

    return data;
};

export const inscrire = async (email, password, confirmPassword) => {
    const token = localStorage.getItem("jstoken");
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            email,
            password,
            confirmPassword,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
    }

    return data;
};
