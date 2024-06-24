import React from 'react';

const EmpleadoListado = ({ empleados, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Empleados</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ApellidoYNombre</th>
            <th>FechaNacimiento</th>
            <th>DNI</th>
            <th>Suspendido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.IdEmpleado}>
                <td>{empleado.IdEmpleado}</td>
                <td>{empleado.ApellidoYNombre}</td>
                <td>{empleado.FechaNacimiento}</td>
                <td>{empleado.Dni}</td>
                <td>{empleado.Suspendido ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={() => onEdit(empleado)}>Editar</button>
                  <button onClick={() => onDelete(empleado.IdEmpleado)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron empleados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadoListado;
