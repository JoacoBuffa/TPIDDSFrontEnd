import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../api/axiosConfig';

const EmpleadoRegistro = ({ empleado, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: empleado || {}
  });

  const onSubmit = async (data) => {
    try {
      if (empleado) {
        await axios.put(`/api/empleados/${empleado.IdEmpleado}`, data);
      } else {
        await axios.post('/api/empleados', data);
      }
      onClose();
    } catch (error) {
      console.error("Error saving empleado", error);
    }
  };

  React.useEffect(() => {
    reset(empleado || {});
  }, [empleado, reset]);

  return (
    <div>
      <h3>{empleado ? 'Editar' : 'Registrar'} Empleado</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("ApellidoYNombre", { required: true })} placeholder="Apellido y Nombre" />
        <input {...register("FechaNacimiento", { required: true })} placeholder="Fecha de Nacimiento" />
        <input {...register("Dni", { required: true })} placeholder="DNI" />
        <input type="checkbox" {...register("Suspendido")} /> Suspendido
        <button type="submit">{empleado ? 'Guardar Cambios' : 'Registrar'}</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default EmpleadoRegistro;
