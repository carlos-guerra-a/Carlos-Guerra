// src/ShowEmpleado.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/ShowEmpleado.css';
import EditarForm from './EditarForm';

const ShowEmpleado = () => {
  const [empleado, setEmpleado] = useState(null);
  const [showEditarForm, setShowEditarForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const cargarEmpleado = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get(`http://localhost:5146/api/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setEmpleado(response.data);
        } else {
          console.warn('No hay token almacenado. El usuario no está autenticado.');
        }
      } catch (error) {
        console.error(`Error al cargar la información del empleado con ID ${id}:`, error);
      }
    };

    cargarEmpleado();
  }, [id]);

  const handleEditar = () => {
    setShowEditarForm(true);
  };

  const handleGuardarEdicion = (empleadoActualizado) => {
    setEmpleado(empleadoActualizado);
    setShowEditarForm(false);
  };

  if (!empleado) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`show-empleado-container${showEditarForm ? ' expanded-background' : ''}`}>
      <div className="card">
        <img src="/profile.jpeg" alt="Empleado" className="show-empleado-image" />

        {!showEditarForm && (
          <React.Fragment>
            <div className="employee-info">
              <p className="show-empleado-name">{empleado.name}</p>
              <p className="show-empleado-details">Email: {empleado.email}</p>
              <p className="show-empleado-details">Departamento: {empleado.department}</p>
            </div>
            <button className="btn btn-primary" onClick={handleEditar}>
              Editar
            </button>
          </React.Fragment>
        )}

        {showEditarForm && (
          <EditarForm empleado={empleado} onGuardar={handleGuardarEdicion} onCancel={() => setShowEditarForm(false)} />
        )}
      </div>

      <Link to="/lista-empleados" className={`btn btn-secondary btn-back${showEditarForm ? ' form-visible' : ''}`}>
        Volver
      </Link>
    </div>
  );
};

export default ShowEmpleado;
