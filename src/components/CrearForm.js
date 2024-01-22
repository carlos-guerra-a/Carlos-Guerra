import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CrearForm.css'; 

const CrearForm = ({ onEmpleadoCreado, onCancel }) => {
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    name: '',
    email: '',
    department: '',
  });
  const [errores, setErrores] = useState({
    name: '',
    email: '',
    department: '',
  });

  const handleChange = (e) => {
    setNuevoEmpleado({
      ...nuevoEmpleado,
      [e.target.name]: e.target.value,
    });

    // Limpiar el mensaje de error cuando el usuario comienza a escribir en el campo
    setErrores({
      ...errores,
      [e.target.name]: '',
    });
  };

  const validarFormulario = () => {
    let formularioValido = true;
    const nuevosErrores = {};

    // Validar campos requeridos
    for (const campo in nuevoEmpleado) {
      if (!nuevoEmpleado[campo]) {
        nuevosErrores[campo] = 'Este campo es requerido.';
        formularioValido = false;
      }
    }

    // formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (nuevoEmpleado.email && !emailRegex.test(nuevoEmpleado.email)) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido.';
      formularioValido = false;
    }

    setErrores(nuevosErrores);

    return formularioValido;
  };

  const handleCrearEmpleado = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        if (validarFormulario()) {
          const response = await axios.post(
            'http://localhost:5146/api/employee',
            nuevoEmpleado,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          onEmpleadoCreado(response.data);

          // Limpiar el formulario 
          setNuevoEmpleado({
            name: '',
            email: '',
            department: '',
          });
        }
      } else {
        console.warn('No hay token almacenado. El usuario no está autenticado.');
      }
    } catch (error) {
      console.error('Error al crear un nuevo empleado:', error);
    }
  };

  return (
    <div className="crear-form-container">
     
      <form>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="name" value={nuevoEmpleado.name} onChange={handleChange} className="form-control" />
          {errores.name && <div className="error-message">{errores.name}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={nuevoEmpleado.email} onChange={handleChange} className="form-control" />
          {errores.email && <div className="error-message">{errores.email}</div>}
        </div>
        <div className="form-group">
          <label>Departamento:</label>
          <input type="text" name="department" value={nuevoEmpleado.department} onChange={handleChange} className="form-control" />
          {errores.department && <div className="error-message">{errores.department}</div>}
        </div>
        <button type="button" onClick={handleCrearEmpleado} className="btn btn-primary btn-primary-i">Crear Empleado</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary btn-secondary-i">Cancelar</button>
      </form>
    </div>
  );
};

export default CrearForm;
