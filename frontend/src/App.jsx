import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditCredential from "./pages/EditCredential.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("jstoken");
    const tokenExp = localStorage.getItem("jstoken_exp");
    const now = Date.now();
    const isValid = Boolean(token && tokenExp && Number(tokenExp) > now);

    if (!isValid) {
      localStorage.removeItem("jstoken");
      localStorage.removeItem("jstoken_exp");
      localStorage.removeItem("uid");
    }

    return isValid;
  });
  const [isAuthCheckComplete] = useState(true);

  const [credentials, setCredentials] = useState([]);

  const renderProtected = (element) => {
    if (!isAuthCheckComplete) return null;
    if (!isAuthenticated) return <Navigate to="/login" />;
    return element;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      {/* Fond dégradé moderne */}
      <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-pink-100 px-6 py-16">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={renderProtected(
              <Dashboard
                credentials={credentials}
                setCredentials={setCredentials}
              />
            )}
          />

          <Route
            path="/edit/:id"
            element={renderProtected(
              <EditCredential
                credentials={credentials}
                setCredentials={setCredentials}
              />
            )}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
