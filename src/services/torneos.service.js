
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceTorneos;


async function Buscar(Nombre_torneo, Finalizado, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre_torneo, Finalizado, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.ID_Torneo);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.ID_Torneo);
}


async function Grabar(item) {
  if (item.ID_Torneo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.ID_Torneo, item);
  }
}


export const torneosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
