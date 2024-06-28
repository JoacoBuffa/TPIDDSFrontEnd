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

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre_torneo">
                Nombre torneo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre_torneo", {
                  required: { value: true, message: "Nombre_torneo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre_torneo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre_torneo debe tener como máximo 55 caracteres",
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

          {/* campo Dni */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaDeFinal">
                Fecha Final:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaDeFinal", {
                  required: { value: true, message: "fechaDeFinal es requerido" },
                })}
                className={"form-control " + (errors?.fechaDeFinal ? "is-invalid" : "")}
              />
              {errors?.fechaDeFinal && touchedFields.fechaDeFinal && (
                <div className="invalid-feedback">{errors?.fechaDeFinal?.message}</div>
              )}
            </div>
          </div>

          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="PromedioGoles">
                PromedioGoles
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("PromedioGoles")}
                className={
                  "form-control " + (errors?.PromedioGoles ? "is-invalid" : "")
                }
              />
            </div>
          </div>
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
                enabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Finalizado?.message}</div>
            </div>
          </div>

          {/* campo IdPosicion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Id_Temporada">
                Temporada <span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("Id_Temporada", {
                  required: { value: true, message: "Temporada es requerido" },
                })}
                className={
                  "form-control " + (errors?.Id_Temporada ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Temporadas?.map((x) => (
                  <option value={x.Id_Temporada} key={x.Id_Temporada}>
                    {x.Año}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.Id_Temporada?.message}
              </div>
            </div>
          </div>


          {/* campo Activo */}
          

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

