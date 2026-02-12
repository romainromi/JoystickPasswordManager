import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditCredential from "./pages/EditCredential.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [credentials, setCredentials] = useState([
    { id: 1, site: "Google", login: "user@gmail.com", password: "123456" },
    { id: 2, site: "Facebook", login: "user@fb.com", password: "abcdef" },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("jstoken");
    const tokenExp = localStorage.getItem("jstoken_exp");
    const now = Date.now();

    if (token && tokenExp && Number(tokenExp) > now) {
      setIsAuthenticated(true);
      return;
    }

    localStorage.removeItem("jstoken");
    localStorage.removeItem("jstoken_exp");
    setIsAuthenticated(false);
  }, []);

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
            element={
              isAuthenticated ? (
                <Dashboard
                  credentials={credentials}
                  setCredentials={setCredentials}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/edit/:id"
            element={
              isAuthenticated ? (
                <EditCredential
                  credentials={credentials}
                  setCredentials={setCredentials}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
