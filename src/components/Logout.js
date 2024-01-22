import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css'; 

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();

    localStorage.removeItem('token');

    localStorage.setItem('isLoggedIn', 'false');

    navigate('/');
  };

  return (
    <div>
      <button className="btn btn-logout" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Logout;