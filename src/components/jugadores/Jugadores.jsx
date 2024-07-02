import React, { useState, useEffect } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { jugadoresService } from "../../services/jugadores.service";
import { posicionesService } from "../../services/posiciones.service";
//import { posicionesMockService as posicionesService } from "../../services/posiciones-mock.service";
import modalDialogService from "../../services/modalDialog.service";




function Jugadores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [NombreApellido, setNombreApellido] = useState("");
  const [Activo, setActivo] = useState("");
  const [Nombre, setNombre] = useState("");
  const [IdPosicion, setIdPosicion] = useState("");

  const [Items, setItems] = useState(null);  
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Posiciones, setPosiciones] = useState(null);

  useEffect(() => {
    async function fetchData() {
      modalDialogService.BloquearPantalla(true);
    const data = await jugadoresService.Buscar(NombreApellido, Activo, Pagina);
    modalDialogService.BloquearPantalla(false);
    const datap = await posicionesService.Buscar(IdPosicion, Nombre);
    setPosiciones(datap);
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
  }, [NombreApellido, Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await jugadoresService.Buscar(NombreApellido, Activo, _pagina);
    modalDialogService.BloquearPantalla(false);
    const datap = await posicionesService.Buscar(IdPosicion, Nombre);
    setPosiciones(datap);
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
    const data = await jugadoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      //alert("No puede modificarse un registro Inactivo.");
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdJugador: 0,
                  NombreApellido: '',
                  FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
                  Activo: true,
                  Altura: '',
                  Peso: '',
                  IdPosicion: ''
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
        await jugadoresService.Eliminar(item);
        await Buscar();
      }
    );  
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await jugadoresService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await jugadoresService.Grabar(item);
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
        Jugadores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <JugadoresBuscar
          NombreApellido={NombreApellido}
          setNombreApellido={setNombreApellido}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <JugadoresListado
          {...{
            Items,
            Consultar,
            Modificar,
            Eliminar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Posiciones,
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
        <JugadoresRegistro
          {...{ AccionABMC, Posiciones, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Jugadores };
