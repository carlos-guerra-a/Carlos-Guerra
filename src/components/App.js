import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './LoginForm';
import ListaEmpleados from './ListaEmpleados';
import ShowEmpleado from './ShowEmpleado';
import Navbar from './Navbar';
import '../styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = JSON.parse(localStorage.getItem('user'));

    setIsLoggedIn(storedIsLoggedIn);
    setUser(storedUser);
  }, []);

  const handleLogin = (credentials) => {
    setIsLoggedIn(true);
    setUser(credentials);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(credentials));

    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <div className="container mt-4">
          {!isLoggedIn && (
            <div className="welcome-section">
              <div className="photo-section">
                <div className="welcome-message">
                  <h2 className="welcome-title">Bienvenido</h2>
                  {showLoginForm ? (
                    <Login onLogin={handleLogin} onCancel={() => setShowLoginForm(false)} />
                  ) : (
                    <button className="btn btn-primary" onClick={() => setShowLoginForm(true)}>
                      Iniciar Sesión
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/lista-empleados" element={<ListaEmpleados />} />
            <Route path="/empleados/:id" element={<ShowEmpleado />} />
            <Route path="/*" element={<Navigate to="/lista-empleados" />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
