import React, { useState, useEffect } from "react";
//import { articulosFamiliasMockService } from '../services/articulosFamilias-mock.service';
import { tiposEntrenadoresService } from "../services/tiposEntrenadores.service";
function TiposEntrenadores() {
  const tituloPagina = "Tipos Entrenadores";
  const [tiposEntrenadores, settiposEntrenadores] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarTiposEntrenadores();
  }, []);
  async function BuscarTiposEntrenadores() {
    let data = await tiposEntrenadoresService.Buscar();
    settiposEntrenadores(data);
  }
  return (
    <div>
      <div className="text-center text-white display-6 fw-bold shadow-lg p-3 mb-3 bg-dark rounded">{tituloPagina}</div>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead className="text-white text-center bg-dark">
          <tr>
            <th style={{ width: "40%" }} className="text-white text-center bg-dark">IdPosicion</th>
            <th style={{ width: "60%" }} className="text-white text-center bg-dark">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {tiposEntrenadores &&
            tiposEntrenadores.map((tipoEntrenador) => (
              <tr key={tipoEntrenador.id_tipoEntrenador}>
                <td>{tipoEntrenador.id_tipoEntrenador}</td>
                <td>{tipoEntrenador.nombreTipoEntrenador}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { TiposEntrenadores };
