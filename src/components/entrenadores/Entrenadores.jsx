import React, { useState, useEffect } from "react";
import moment from "moment";
import EntrenadoresBuscar from "./EntrenadoresBuscar";
import EntrenadoresListado from "./EntrenadoresListado";
import EntrenadoresRegistro from "./EntrenadoresRegistro";
import { entrenadoresService } from "../../services/entrenadores.service";
import { tiposEntrenadoresService } from "../../services/tiposEntrenadores.service";
//import { posicionesMockService as posicionesService } from "../../services/posiciones-mock.service";
import modalDialogService from "../../services/modalDialog.service";

function Entrenadores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [nombreEntrenador, setnombreEntrenador] = useState("");
  const [Activo, setActivo] = useState("");
  const [Nombre, setNombre] = useState("");
  const [id_tipoEntrenador, setid_tipoEntrenador] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [TiposEntrenadores, setTiposEntrenadores] = useState(null);

  useEffect(() => {
    async function fetchData() {
      modalDialogService.BloquearPantalla(true);
      const data = await entrenadoresService.Buscar(
        nombreEntrenador,
        Activo,
        Pagina
      );
      modalDialogService.BloquearPantalla(false);
      const datap = await tiposEntrenadoresService.Buscar(
        id_tipoEntrenador,
        Nombre
      );
      setTiposEntrenadores(datap);
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
  }, [nombreEntrenador, Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await entrenadoresService.Buscar(
      nombreEntrenador,
      Activo,
      _pagina
    );
    modalDialogService.BloquearPantalla(false);
    const datap = await tiposEntrenadoresService.Buscar(
      id_tipoEntrenador,
      Nombre
    );
    setTiposEntrenadores(datap);
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
    const data = await entrenadoresService.BuscarPorId(item);
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
      id_Entrenador: 0,
      nombreEntrenador: "",
      fechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
      añosExperiencia: "",
      id_tipoEntrenador: "",
      tieneClub: "",
      clubActual: "",
      Activo: true,
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
        await entrenadoresService.Eliminar(item);
        await Buscar();
        modalDialogService.Confirm(`Entrenador eliminado correctamente`);
      }
    );
  }
  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "suspender" : "activar") +
        " el entrenador?",
      undefined,
      undefined,
      undefined,
      async () => {
        await entrenadoresService.ActivarDesactivar(item);
        await Buscar();
        modalDialogService.Confirm(
          `Entrenador ${item.Activo ? "suspendido" : "activado"} correctamente.`
        );
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await entrenadoresService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
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
        Entrenadores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <EntrenadoresBuscar
          nombreEntrenador={nombreEntrenador}
          setnombreEntrenador={setnombreEntrenador}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <EntrenadoresListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Eliminar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            TiposEntrenadores,
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
        <EntrenadoresRegistro
          {...{ AccionABMC, TiposEntrenadores, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Entrenadores };
