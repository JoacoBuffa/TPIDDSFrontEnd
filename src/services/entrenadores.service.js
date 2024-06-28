import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
import { config } from "../config";
const urlResource = config.urlResourceEntrenadores;

async function Buscar(nombreEntrenador, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombreEntrenador, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.id_Entrenador);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.put(urlResource + "/suspender/" + item.id_Entrenador, {
    activo: !item.activo,
  });
}

async function Eliminar(item) {
  await httpService.delete(urlResource + "/" + item.id_Entrenador);
}
async function Grabar(item) {
  if (item.id_Entrenador === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.id_Entrenador, item);
  }
}

export const entrenadoresService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
  Eliminar,
};
