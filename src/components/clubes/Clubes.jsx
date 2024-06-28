import React, { useState, useEffect } from "react";
import moment from "moment";
import ClubesBuscar from "./ClubesBuscar";
import ClubesListado from "./ClubesListado";
import ClubesRegistro from "./ClubesRegistro";
import { clubesService } from "../../services/clubes.service";

// ESTE ES IMPORTANTE CUANDO ENLACE CON CIUDADES ------------------------------------------
import { ciudadesService } from "../../services/ciudades.service";
//import { clubesFamiliasMockService as clubesfamiliasService } from "../../services/clubesFamilias-mock.service";
import modalDialogService from "../../services/modalDialog.service";



function Clubes() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [nombreClub, setnombreClub] = useState("");
  //const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // ESTE ES IMPORTANTE CUANDO ENLACE CON CIUDADES ------------------------------------------
  const [Ciudades, setCiudades] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarCiudades() {
      let data = await ciudadesService.Buscar();
      setCiudades(data);
    }
    BuscarCiudades();
  }, []);

  useEffect(() => {
    Buscar(1);
  }, []);


  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await clubesService.Buscar(nombreClub, _pagina);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await clubesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    // if (!item.Activo) {
    //   //alert("No puede modificarse un registro Inactivo.");
    //   modalDialogService.Alert("No puede modificarse un registro Inactivo.");
    //   return;
    // }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        idClub: 0,
        nombreClub: '',
        fechaCreacion: '',
        torneosGanados: '',
        activo: true,
        idCiudad: '',
      });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function Eliminar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere eliminar el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await clubesService.Eliminar(item);
        await Buscar();
      }
    );  
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.activo ? "suspender" : "activar") +
        " el club?",
      undefined,
      undefined,
      undefined,
      async () => {
        await clubesService.ActivarDesactivar(item);
        await Buscar();
        modalDialogService.Confirm(
          `Club ${
            item.activo ? "suspendido" : "activado"
          } correctamente.`
        );
        }
      );
    }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await clubesService.Grabar(item);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    //}, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="text-center text-white display-6 fw-bold shadow-lg p-3 mb-3 bg-dark rounded">
        Clubes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ClubesBuscar
          nombreClub={nombreClub}
          setnombreClub={setnombreClub}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ClubesListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Ciudades,
            Eliminar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <ClubesRegistro
          {...{ AccionABMC, Ciudades, Item, Grabar, Volver }} // ESTE ES IMPORTANTE CUANDO ENLACE CON CIUDADES ----- agregar Ciudades,---------- --------------------------
        />
      )}
    </div>
  );
}
export { Clubes };
