import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css'; 

const LoginForm = ({ onLogin, onCancel }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5146/api/auth/login', credentials);

      // Almacenar token 
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Llamar a la función con el token
      onLogin({ ...credentials, token });

      console.log('Respuesta de la API:', response.data);

      // Limpiar cualquier mensaje de error existente
      setError(null);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-primary-i">
          Iniciar Sesión
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary btn-secondary-i ml-2">
          Cancelar
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginForm;
