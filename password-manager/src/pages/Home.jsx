export default function Home() {
    return (
        <div className="flex flex-col items-center justify-start min-h-full p-6 bg-white text-center pt-20">
            {/* Titre centré horizontalement, un peu plus haut */}
            <h1 className="text-4xl font-bold text-pink-500 mb-6">
                Bienvenue sur Joystick Password Manager
            </h1>

            {/* Espace pour présentation */}
            <div className="max-w-2xl text-gray-700">
                <p>
                    Joystick Password Manager est une application conçue pour vous aider à gérer vos mots de passe de manière sécurisée et efficace. Avec notre interface conviviale, vous pouvez stocker, organiser et accéder à tous vos mots de passe en un seul endroit, tout en bénéficiant d'une protection renforcée grâce à notre système de chiffrement avancé. Que vous soyez un particulier ou une entreprise, Joystick Password Manager est la solution idéale pour garder vos informations sensibles en sécurité.
                </p>
            </div>
        </div>
    );
}
