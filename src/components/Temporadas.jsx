import React, {useState, useEffect} from 'react';
//import { articulosFamiliasMockService } from '../services/articulosFamilias-mock.service';
import {temporadasService } from '../services/temporadas.service';
function Temporadas() {
  const tituloPagina = 'Temporadas';
  const [temporadas, setTemporadas] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarTemporadas();
  }, []);
  async function BuscarTemporadas() {
    let data = await temporadasService.Buscar();
    setTemporadas(data);
  };
  return (
    <div>
      <div className="text-center text-white display-6 fw-bold shadow-lg p-3 mb-3 bg-dark rounded">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "25%" }} className="text-white text-center bg-dark">Id_Temporada</th>
            <th style={{ width: "25%" }} className="text-white text-center bg-dark">Año</th>
            <th style={{ width: "25%" }} className="text-white text-center bg-dark">FechaDesde</th>
            <th style={{ width: "25%" }} className="text-white text-center bg-dark">FechaHasta</th>
          </tr>
        </thead>
        <tbody>
          {temporadas &&
            temporadas.map((temporada) => (
              <tr key={temporada.Id_Temporada}>
                <td>{temporada.Id_Temporada}</td>
                <td>{temporada.Año}</td>
                <td>{temporada.FechaDesde}</td>
                <td>{temporada.FechaHasta}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export {Temporadas};