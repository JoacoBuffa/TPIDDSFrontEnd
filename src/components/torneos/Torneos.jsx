import React, { useState, useEffect } from "react";
import moment from "moment";
import TorneosBuscar from "./TorneosBuscar";
import TorneosListado from "./TorneosListado";
import TorneosRegistro from "./TorneosRegistro";
import { torneosService } from "../../services/torneos.service";
import { temporadasService } from "../../services/temporadas.service";
//import { aorneosFamiliasMockService as aorneosfamiliasService } from "../../services/aorneosFamilias-mock.service";
import modalDialogService from "../../services/modalDialog.service";



function Torneos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre_torneo, setNombre_torneo] = useState("");
  const [Finalizado, setFinalizado] = useState("");
  const [Año, setAño] = useState("");
  const [Id_Temporada, setId_Temporada] = useState("");


  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Temporadas, setTemporadas] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])

  useEffect(() => {
    async function fetchData() {
      modalDialogService.BloquearPantalla(true);
    const data = await torneosService.Buscar(Nombre_torneo, Finalizado, Pagina);
    modalDialogService.BloquearPantalla(false);
    const datap = await temporadasService.Buscar(Id_Temporada, Año);
    setTemporadas(datap);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

      // generar array de las páginas para mostrar en select del paginador
      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    }

    fetchData();
  }, [Nombre_torneo, Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await torneosService.Buscar(Nombre_torneo, Finalizado, _pagina);
    modalDialogService.BloquearPantalla(false);
    const datap = await temporadasService.Buscar(Id_Temporada, Año);
    setTemporadas(datap);
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
    const data = await torneosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        ID_Torneo: 0,
        Nombre_torneo: '',
        fechaDeFinal: moment(new Date()).format("YYYY-MM-DD"),
        PromedioGoles: '',
        Finalizado: true,
        Id_Temporada: ''
      });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Finalizado ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await torneosService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await torneosService.Grabar(item);
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
      <div className="tituloPagina">
        Torneos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <TorneosBuscar
          Nombre_torneo={Nombre_torneo}
          setNombre_torneo={setNombre_torneo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <TorneosListado
          {...{
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
        <TorneosRegistro
          {...{ AccionABMC, Temporadas, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Torneos };
