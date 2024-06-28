import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
import { config } from "../config";
const urlResource = config.urlResourceJugadores;

async function Buscar(NombreApellido, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { NombreApellido, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdJugador);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.put(urlResource + "/suspender/" + item.IdJugador, {
    activo: !item.activo,
  });
}

async function Grabar(item) {
  if (item.IdJugador === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdJugador, item);
  }
}

async function Eliminar(item) {
  await httpService.delete(urlResource + "/" + item.IdJugador);
}

export const jugadoresService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
  Eliminar,
};
