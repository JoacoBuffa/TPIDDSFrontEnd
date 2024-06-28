import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ClubesRegistro({
  AccionABMC,
  Ciudades,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombreClub */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombreClub">
              Nombre de Club<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombreClub", {
                  required: { value: true, message: "nombre de club es requerido" },
                  minLength: {
                    value: 5,
                    message: "nombre de club debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 60,
                    message: "nombre de club debe tener como máximo 60 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombreClub ? "is-invalid" : "")
                }
              />
              {errors?.nombreClub && touchedFields.nombreClub && (
                <div className="invalid-feedback">
                  {errors?.nombreClub?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo fechaCreacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaCreacion">
              Fecha Creacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaCreacion", {
                  required: { value: true, message: "fecha de creacion es requerido" }
                })}
                className={
                  "form-control " + (errors?.fechaCreacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaCreacion?.message}
              </div>
            </div>
          </div>


          {/* campo torneosGanados */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="torneosGanados">
              Cant de Torneos Ganados<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("torneosGanados", {
                  required: { value: true, message: "cant de torneos ganados es requerido" },
                  min: {
                    value: 0,
                    message: "cant de torneos ganados debe ser mayor a 0",
                  },
                  max: {
                    value: 999,
                    message: "cant de torneos ganados debe ser menor o igual a 999",
                  },
                })}
                className={
                  "form-control " + (errors?.torneosGanados ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.torneosGanados?.message}</div>
            </div>
          </div>


          
          {/* campo activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="activo">
              Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="activo"
                {...register("activo", {
                  required: { value: true, message: "activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.activo ? " is-invalid" : "")
                }
                enabled    // POR DEFAULT ESTE ESTABA DISABLED
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.activo?.message}</div>
            </div>
          </div>

          {/* campo idCiudad */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="idCiudad">
              Ciudad<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("idCiudad", {
                  required: { value: true, message: "ciudad es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.idCiudad ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Ciudades?.map((x) => (
                  <option value={x.idCiudad} key={x.idCiudad}>
                    {x.nombreCiudad}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.idCiudad?.message}
              </div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-danger">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

