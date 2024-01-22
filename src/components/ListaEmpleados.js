import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrearForm from './CrearForm';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 
import '../styles/ListaEmpleados.css';

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarCrearForm, setMostrarCrearForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [empleadoIdToDelete, setEmpleadoIdToDelete] = useState(null);

  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get('http://localhost:5146/api/employee', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setEmpleados(response.data);
        } else {
          console.warn('No hay token almacenado. El usuario no está autenticado.');
        }
      } catch (error) {
        console.error('Error al cargar la lista de empleados:', error);
      }
    };

    cargarEmpleados();
  }, []);

  const handleBorrar = (empleadoId) => {
    setEmpleadoIdToDelete(empleadoId);
    setShowModal(true);
  };

  const confirmarBorrado = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token && empleadoIdToDelete) {
        await axios.delete(`http://localhost:5146/api/employee/${empleadoIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axios.get('http://localhost:5146/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmpleados(response.data);
      } else {
        console.warn('No hay token almacenado o no se proporcionó un ID de empleado.');
      }
    } catch (error) {
      console.error(`Error al borrar el empleado con ID ${empleadoIdToDelete}:`, error);
    } finally {

      setEmpleadoIdToDelete(null);
      setShowModal(false);
    }
  };

  const handleMostrarCrearForm = () => {
    setMostrarCrearForm(true);
  };

  const handleCrearFormCancelar = () => {
    setMostrarCrearForm(false);
  };
   const handleEmpleadoCreado = (nuevoEmpleado) => {
    setEmpleados([...empleados, nuevoEmpleado]);
    setMostrarCrearForm(false);
  };


  return (
    <div className="lista-empleados-container">
      <h2>Empleados</h2>
      <button onClick={handleMostrarCrearForm} className="btn btn-primary btn-primary-new">
        + Nuevo Empleado
      </button>
      {mostrarCrearForm && (
        <CrearForm onEmpleadoCreado={handleEmpleadoCreado} onCancel={handleCrearFormCancelar} />
      )}

      <table className="table table-light mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>
                <Link to={`/empleados/${empleado.id}`} className="bold-link">
                  {empleado.name}
                </Link>
              </td>
              <td>{empleado.department}</td>
              <td>
                <span
                  className="material-symbols-outlined"
                  onClick={() => handleBorrar(empleado.id)}
                >
                  delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {/* Modal de confirmación de borrado */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Borrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas borrar a este empleado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarBorrado}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaEmpleados;
