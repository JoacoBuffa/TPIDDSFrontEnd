import React from "react";
import moment from "moment";

export default function EntrenadoresListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  TiposEntrenadores,
  Eliminar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-white text-center bg-dark">
              Nombre y Apellido
            </th>
            <th className="text-white text-center bg-dark">
              Fecha de Nacimiento
            </th>
            <th className="text-white text-center bg-dark">Tipo Entrenador</th>
            <th className="text-white text-center bg-dark">Años Experiencia</th>
            <th className="text-white text-center bg-dark">Tiene Club</th>
            <th className="text-white text-center bg-dark">Club Actual</th>
            <th className="text-white text-center bg-dark">Activo</th>
            <th className="text-white text-center bg-dark text-nowrap">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => {
              const tipoEntrenador = TiposEntrenadores.find(
                (p) => p.id_tipoEntrenador === Item.id_tipoEntrenador
              );
              const nombreTipoEntrenador = tipoEntrenador
                ? tipoEntrenador.nombreTipoEntrenador
                : "";

              return (
                <tr key={Item.id_Entrenador}>
                  <td>{Item.nombreEntrenador}</td>
                  <td className="text-end">
                    {moment(Item.fechaNacimiento).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-center">{nombreTipoEntrenador}</td>
                  <td className="text-end">{Item.añosExperiencia}</td>
                  <td>{Item.tieneClub ? "SI" : "NO"}</td>
                  <td className="text-end">{Item.clubActual}</td>
                  <td>{Item.Activo ? "SI" : "NO"}</td>
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
                    {/* <button
                      className={
                        "btn btn-sm " +
                        (Item.Activo
                          ? "btn-outline-danger"
                          : "btn-outline-success")
                      }
                      title={Item.Activo ? "Desactivar" : "Activar"}
                      onClick={() => ActivarDesactivar(Item)}
                    >
                      <i
                        className={"fa fa-" + (Item.Activo ? "times" : "check")}
                      ></i>
                    </button> */}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      title="Eliminar"
                      onClick={() => Eliminar(Item)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
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
