import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EntrenadoresRegistro({
  AccionABMC,
  TiposEntrenadores,
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
              <label className="col-form-label" htmlFor="nombreEntrenador">
                Nombre y Apellido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombreEntrenador", {
                  required: {
                    value: true,
                    message: "Nombre y apellido es requerido",
                  },
                  minLength: {
                    value: 4,
                    message:
                      "Nombre y apellido debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message:
                      "Nombre y apellido debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                placeholder="Nombre y Apellido del Entrenador"
                className={
                  "form-control " +
                  (errors?.nombreEntrenador ? "is-invalid" : "")
                }
              />
              {errors?.nombreEntrenador && touchedFields.nombreEntrenador && (
                <div className="invalid-feedback">
                  {errors?.nombreEntrenador?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaNacimiento">
                Fecha Nacimiento:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaNacimiento")}
                className={
                  "form-control " +
                  (errors?.fechaNacimiento ? "is-invalid" : "")
                }
              />
            </div>
          </div>

          {/* campo añosExperiencia */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="añosExperiencia">
                Años Experiencia:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("añosExperiencia", {
                  min: {
                    value: 1,
                    message: "Años de experiencia debe ser mayor a 1",
                  },
                  max: {
                    value: 200,
                    message: "Años de experiencia debe ser menor a 200",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.añosExperiencia ? "is-invalid" : "")
                }
              />
              {errors?.añosExperiencia && touchedFields.añosExperiencia && (
                <div className="invalid-feedback">{errors?.Peso?.message}</div>
              )}
            </div>
          </div>

          {/* campo IdPosicion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="id_tipoEntrenador">
                Tipo Entrenador<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("id_tipoEntrenador", {
                  required: {
                    value: true,
                    message: "Tipo Entrenador es requerido",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.id_tipoEntrenador ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {TiposEntrenadores?.map((x) => (
                  <option value={x.id_tipoEntrenador} key={x.id_tipoEntrenador}>
                    {x.nombreTipoEntrenador}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.id_tipoEntrenador?.message}
              </div>
            </div>
          </div>

          {/* campo TieneClub */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="tieneClub">
                Tiene Club<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="tieneClub"
                {...register("tieneClub", {
                  required: { value: true, message: "Tiene Club es requerido" },
                })}
                className={
                  "form-control" + (errors?.tieneClub ? " is-invalid" : "")
                }
                enabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">
                {errors?.tieneClub?.message}
              </div>
            </div>
          </div>

          {/* campo clubActual */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="clubActual">
                Club Actual<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("clubActual", {
                  required: {
                    value: true,
                    message: "Club Actual es requerido",
                  },
                  minLength: {
                    value: 4,
                    message: "Club Actual debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Club Actual debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.clubActual ? "is-invalid" : "")
                }
              />
              {errors?.clubActual && touchedFields.clubActual && (
                <div className="invalid-feedback">
                  {errors?.nombreEntrenador?.message}
                </div>
              )}
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
                disabled
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
