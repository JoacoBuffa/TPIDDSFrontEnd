import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TorneosRegistro({
  AccionABMC,
  Temporadas,
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

          {/* campo nombre de torneo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre_torneo">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre_torneo", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre_torneo ? "is-invalid" : "")
                }
              />
              {errors?.Nombre_torneo && touchedFields.Nombre_torneo && (
                <div className="invalid-feedback">
                  {errors?.Nombre_torneo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo fechaDeFinal */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaDeFinal">
                Fecha Final<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaDeFinal", {
                  required: { value: true, message: "Fecha de final es requerido" }
                })}
                className={
                  "form-control " + (errors?.fechaDeFinal ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaDeFinal?.message}
              </div>
            </div>
          </div>
          


          {/* campo PromedioGoles */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="PromedioGoles">
                Promedio de goles<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("PromedioGoles", {
                  required: { value: true, message: "Promedio de goles es requerido" },
                  min: {
                    value: 0.01,
                    message: "Promedio de goles debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Promedio de goles debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.PromedioGoles ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.PromedioGoles?.message}</div>
            </div>
          </div>

          {/* campo Finalizado */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Finalizado">
                Finalizado<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Finalizado"
                {...register("Finalizado", {
                  required: { value: true, message: "Finalizado es requerido" },
                })}
                className={
                  "form-control" + (errors?.Finalizado ? " is-invalid" : "")
                }
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Finalizado?.message}</div>
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

