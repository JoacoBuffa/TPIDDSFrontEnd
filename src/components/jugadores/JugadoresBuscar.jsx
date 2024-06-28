import React from "react";
export default function JugadoresBuscar ({NombreApellido, setNombreApellido, Activo, setActivo, Buscar, Agregar}) {

    return (
    <form>
      <div className="container-fluid">
        <div className="row justify-content-center ">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre y Apellido:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombreApellido(e.target.value)}
              value={NombreApellido}
              maxLength="55"
              autoFocus
            />
          </div>
         
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };
