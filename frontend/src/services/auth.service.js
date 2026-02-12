export const Authenticate = async (email, password) => {
    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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
    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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
