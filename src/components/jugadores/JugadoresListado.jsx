import React from "react";
import moment from "moment";

export default function JugadoresListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Pagina,
  Eliminar,
  RegistrosTotal,
  Posiciones,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-white text-center bg-dark">Nombre y Apellido</th>
            <th className="text-white text-center bg-dark">Fecha de Nacimiento</th>
            <th className="text-white text-center bg-dark">Activo</th>
            <th className="text-white text-center bg-dark">Altura</th>
            <th className="text-white text-center bg-dark">Peso</th>
            <th className="text-white text-center bg-dark">Posicion</th>
            <th className="text-white text-center bg-dark">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => {
              const posicion = Posiciones.find(
                (p) => p.IdPosicion === Item.IdPosicion
              );
              const nombrePosicion = posicion ? posicion.Nombre : "";

              return (
              <tr key={Item.IdJugador}>
                <td>{Item.NombreApellido}</td>
                <td className="text-end">
                {moment(Item.FechaNacimiento).format("DD/MM/YYYY")}
                </td>
                <td>{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-end">{Item.Altura}</td>
                <td className="text-end">{Item.Peso}</td>
                <td className="text-center">{nombrePosicion}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                 
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Item)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );})}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>
        </div>
      </div>
    </div>
  );
}
