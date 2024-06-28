import React from "react";
import moment from "moment";

export default function TorneosListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
  Temporadas
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Fecha de final</th>
            <th className="text-center">Promedio de goles</th>
            <th className="text-center">Finalizado</th>
            <th className="text-center">Temporada</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => { 
              const temporada = Temporadas.find(
                (p) => p.Id_Temporada === Item.Id_Temporada
              );
              const Año = temporada ? temporada.Año : "";

            return(
              <tr key={Item.ID_Torneo}>
                <td>{Item.Nombre_torneo}</td>
                <td className="text-end">
                  {moment(Item.fechaDeFinal).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.PromedioGoles}</td>
                <td>{Item.Finalizado ? "SI" : "NO"}</td>
                <td className="text-center">{Año}</td>
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
                    className={
                      "btn btn-sm " +
                      (Item.Finalizado
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Finalizado ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Finalizado ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            )})}
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

          <div className="col">
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
