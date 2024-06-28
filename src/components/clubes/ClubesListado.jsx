import React from "react";
import moment from "moment";

export default function ClubesListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Ciudades,
  Eliminar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  const getNombreCiudad = (idCiudad) => {
    const ciudad = Ciudades.find((c) => c.idCiudad === idCiudad);
    return ciudad ? ciudad.nombreCiudad : "Ciudad no encontrada";
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped ">
        <thead>
          <tr>
            <th className="text-white text-center bg-dark">Nombre de Club</th>
            <th className="text-white text-center bg-dark">Fecha de Creacion</th>
            <th className="text-white text-center bg-dark">Cantidad de torneos ganados</th>
            <th className="text-white text-center bg-dark">Activo</th>
            <th className="text-white text-center bg-dark">Ciudad</th>
            <th className="text-white text-center bg-dark text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.idClub}>
                <td>{Item.nombreClub}</td>
                <td className="text-center">
                  {moment(Item.fechaCreacion).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">{Item.torneosGanados}</td>
                <td className="text-center">{Item.activo ? "SI" : "NO"}</td>
                <td className="text-center">{getNombreCiudad(Item.idCiudad)}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-dark"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.activo ? "times" : "check")}
                    ></i>
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
            ))}
        </tbody>
      </table>

      {/* Paginador */}
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
          <div className="col">
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
