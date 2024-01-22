import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EditarForm.css'; 

const EditarForm = ({ empleado, onGuardar, onCancel }) => {
  const [edicionEmpleado, setEdicionEmpleado] = useState({ ...empleado });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setEdicionEmpleado({
      ...edicionEmpleado,
      [e.target.name]: e.target.value,
    });
  };

  const validarCampos = () => {
    const erroresValidacion = {};

    if (!edicionEmpleado.name.trim()) {
      erroresValidacion.name = 'El nombre es requerido';
    }

    if (!edicionEmpleado.email.trim()) {
      erroresValidacion.email = 'El correo electrónico es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(edicionEmpleado.email)) {
      erroresValidacion.email = 'Ingresa un correo electrónico válido';
    }

    if (!edicionEmpleado.department.trim()) {
      erroresValidacion.department = 'El departamento es requerido';
    }

    setErrores(erroresValidacion);

    return Object.keys(erroresValidacion).length === 0;
  };

  const handleGuardar = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        if (!validarCampos()) {
          return;
        }

        await axios.put(
          `http://localhost:5146/api/employee/${edicionEmpleado.id}`,
          edicionEmpleado,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Llamar a la función de guardar en el componente padre
        onGuardar(edicionEmpleado);
      } else {
        console.warn('No hay token almacenado. El usuario no está autenticado.');
      }
    } catch (error) {
      console.error(`Error al guardar los cambios del empleado con ID ${edicionEmpleado.id}:`, error);
    }
  };

  const handleCancelar = () => {
    onCancel();
  };

  return (
    <div className="editar-form-container">
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={edicionEmpleado.name}
          onChange={(e) => handleChange(e)}
          name="name"
        />
        {errores.name && <p className="text-danger">{errores.name}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="text"
          className="form-control"
          value={edicionEmpleado.email}
          onChange={(e) => handleChange(e)}
          name="email"
        />
        {errores.email && <p className="text-danger">{errores.email}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label">Departamento:</label>
        <input
          type="text"
          className="form-control"
          value={edicionEmpleado.department}
          onChange={(e) => handleChange(e)}
          name="department"
        />
        {errores.department && <p className="text-danger">{errores.department}</p>}
      </div>
      <button onClick={handleGuardar} className="btn btn-primary btn-primary-i me-2">
        Guardar
      </button>
      <button onClick={handleCancelar} className="btn btn-secondary btn-secondary-i">
        Cancelar
      </button>
    </div>
  );
};

export default EditarForm;
