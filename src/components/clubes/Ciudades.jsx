import React, {useState, useEffect} from 'react';

import {ciudadesService } from '../../services/ciudades.service';
function Ciudades() {
  const tituloPagina = 'Ciudades';
  const [ciudades, setCiudades] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarCiudades();
  }, []);
  async function BuscarCiudades() {
    let data = await ciudadesService.Buscar();
    setCiudades(data);
  };
  return (
    <div>
      <div className="text-center text-white display-6 fw-bold shadow-lg p-3 mb-3 bg-dark rounded">{tituloPagina}</div>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "50%" }} className="text-white text-center bg-dark">Id Ciudad</th>
            <th style={{ width: "50%" }} className="text-white text-center bg-dark">Nombre de Ciudad</th>
            
          </tr>
        </thead>
        <tbody>
          {ciudades &&
            ciudades.map((ciudad) => (
              <tr key={ciudad.idCiudad}>
                <td className="text-center">{ciudad.idCiudad}</td>
                <td className="text-center">{ciudad.nombreCiudad}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export {Ciudades};