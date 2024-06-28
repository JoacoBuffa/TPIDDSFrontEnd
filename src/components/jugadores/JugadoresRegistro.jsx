import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function JugadoresRegistro({
  AccionABMC,
  Posiciones,
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

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="NombreApellido">
                Nombre y Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("NombreApellido", {
                  required: { value: true, message: "Nombre y apellido es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre y apellido debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre y apellido debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.NombreApellido ? "is-invalid" : "")
                }
              />
              {errors?.NombreApellido && touchedFields.NombreApellido && (
                <div className="invalid-feedback">
                  {errors?.NombreApellido?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Dni */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Dni">
                DNI:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Dni", {
                  min: {
                    value: 10000,
                    message: "DNI debe ser mayor a 10000",
                  },
                  max: {
                    value: 99999999,
                    message: "DNI debe ser menor a 99.999.999",
                  },
                })}
                className={"form-control " + (errors?.Dni ? "is-invalid" : "")}
              />
              {errors?.Dni && touchedFields.Dni && (
                <div className="invalid-feedback">{errors?.Dni?.message}</div>
              )}
            </div>
          </div>

          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaNacimiento">
                Fecha Nacimiento:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaNacimiento")}
                className={
                  "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
              />
            </div>
          </div>

          {/* campo Peso */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Peso">
                Peso:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="float"
                {...register("Peso", {
                  min: {
                    value: 1,
                    message: "Peso debe ser mayor a 1",
                  },
                  max: {
                    value: 200,
                    message: "Peso debe ser menor a 200",
                  },
                })}
                className={"form-control " + (errors?.Peso ? "is-invalid" : "")}
              />
              {errors?.Peso && touchedFields.Peso && (
                <div className="invalid-feedback">{errors?.Peso?.message}</div>
              )}
            </div>
          </div>

          {/* campo Altura */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Altura">
                Altura:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="float"
                {...register("Altura", {
                  min: {
                    value: 1,
                    message: "Altura debe ser mayor a 1",
                  },
                  max: {
                    value: 220,
                    message: "Altura debe ser menor a 220",
                  },
                })}
                className={"form-control " + (errors?.Altura ? "is-invalid" : "")}
              />
              {errors?.Altura && touchedFields.Altura && (
                <div className="invalid-feedback">{errors?.Altura?.message}</div>
              )}
            </div>
          </div>

          {/* campo IdPosicion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdPosicion">
                Posición<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdPosicion", {
                  required: { value: true, message: "Posición es requerido" },
                })}
                className={
                  "form-control " + (errors?.IdPosicion ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Posiciones?.map((x) => (
                  <option value={x.IdPosicion} key={x.IdPosicion}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdPosicion?.message}
              </div>
            </div>
          </div>


          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Activo"
                {...register("Activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.Activo ? " is-invalid" : "")
                }
                enabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Activo?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
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

