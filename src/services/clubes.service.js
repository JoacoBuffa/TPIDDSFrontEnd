
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/empleados";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceClubes;


async function Buscar(nombreClub, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombreClub, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.idClub);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.put(urlResource + "/suspender/" + item.idClub, {
    activo: !item.activo,
  });

}

async function Eliminar(item) {
  await httpService.delete(urlResource + "/" + item.idClub);
}


async function Grabar(item) {
  if (item.idClub === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.idClub, item);
  }
}


export const clubesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar,Eliminar
};
