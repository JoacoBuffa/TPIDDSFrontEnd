import React, {useState, useEffect} from 'react';
//import { articulosFamiliasMockService } from '../services/articulosFamilias-mock.service';
import {posicionesService } from '../services/posiciones.service';
function Posiciones() {
  const tituloPagina = 'Posiciones';
  const [posiciones, setPosiciones] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarPosiciones();
  }, []);
  async function BuscarPosiciones() {
    let data = await posicionesService.Buscar();
    setPosiciones(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdPosicion</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {posiciones &&
            posiciones.map((posicion) => (
              <tr key={posicion.IdPosicion}>
                <td>{posicion.IdPosicion}</td>
                <td>{posicion.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export {Posiciones};