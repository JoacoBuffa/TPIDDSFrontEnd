import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../api/axiosConfig';
import EmpleadoListado from './EmpleadoListado';
import EmpleadoRegistro from './EmpleadoRegistro';

const Empleado = () => {
  const { register, handleSubmit } = useForm();
  const [empleados, setEmpleados] = useState([]);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);

  const buscarEmpleados = async (data) => {
    try {
      const response = await axios.get(`/api/empleados?ApellidoYNombre=${data.ApellidoYNombre}`);
      setEmpleados(response.data.Items);
    } catch (error) {
      console.error("Error fetching empleados", error);
    }
  };

  const agregarEmpleado = () => {
    setEditingEmpleado(null);
    setShowRegistro(true);
  };

  const editarEmpleado = (empleado) => {
    setEditingEmpleado(empleado);
    setShowRegistro(true);
  };

  const eliminarEmpleado = async (id) => {
    try {
      await axios.delete(`/api/empleados/${id}`);
      setEmpleados(empleados.filter(emp => emp.IdEmpleado !== id));
    } catch (error) {
      console.error("Error deleting empleado", error);
    }
  };

  return (
    <div>
      <h2>Componente Empleado</h2>
      <form onSubmit={handleSubmit(buscarEmpleados)}>
        <input {...register("ApellidoYNombre")} placeholder="Apellido y Nombre" />
        <button type="submit">Buscar</button>
      </form>
      <button onClick={agregarEmpleado}>Agregar Empleado</button>
      <EmpleadoListado empleados={empleados} onEdit={editarEmpleado} onDelete={eliminarEmpleado} />
      {showRegistro && (
        <EmpleadoRegistro empleado={editingEmpleado} onClose={() => setShowRegistro(false)} />
      )}
    </div>
  );
};

export default Empleado;
