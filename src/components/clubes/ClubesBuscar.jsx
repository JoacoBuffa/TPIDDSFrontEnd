import React from "react";
export default function ClubesBuscar ({nombreClub, setnombreClub, Buscar, Agregar}) {

    return (
      <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-3">
            <label className="col-form-label text-muted ">Ingrese nombre de club a buscar:</label>
          </div>
          <div className="col-sm-8 col-md-6">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setnombreClub(e.target.value)}
              value={nombreClub}
              maxLength="60"
              autoFocus
            />
          </div>
          {/* <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Activo:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <select
              className="form-control"
              onChange={(e) => setActivo(e.target.value)}
              value={Activo}
            >
              <option value={""}></option>
              <option value={false}>NO</option>
              <option value={true}>SI</option>
            </select>
          </div> */}
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn btn-dark"
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn btn-danger"
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
