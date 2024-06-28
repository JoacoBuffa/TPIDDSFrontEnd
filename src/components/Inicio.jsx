import { Link } from "react-router-dom";
import React from "react"; //necesaria en stackblitz
function Inicio() {
  return (
    <div
      className="text-center mt-4 shadow-lg mb-3 bg-dark text-white p-3 rounded"
      style={{ backgroundColor: "lightgray" }}
    >
      <h1 className="display-6 fw-bold text-center mt-4 shadow-lg mb-3 bg-dark text-white p-3 rounded">
        FULBO 2024
      </h1>
      <p>Este TP está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Jest, Sequelize, Sqlite
        múltiples capas en Javascript/Typescript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs,
        Javascript y React.
      </p>
      <h1> -----------------------</h1>
      <Link to="/clubes" className="btn btn-lg btn-danger shadow-lg">
        <i className="fa fa-search"> </i> VER CLUBES
      </Link>
      <Link to="/ciudades" className="btn btn-lg btn-danger shadow-lg">
        <i className="fa fa-search"> </i> VER CIUDADES
      </Link>
      <Link to="/torneos" className="btn btn-lg btn-danger shadow-lg">
        <i className="fa fa-search"> </i> VER TORNEOS
      </Link>
      <Link to="/temporadas" className="btn btn-lg btn-danger shadow-lg">
        <i className="fa fa-search"> </i> VER TEMPORADAS
      </Link>

      <Link to="/entrenadores" className="btn btn-lg btn-danger shadow-lg">
        <i className="fa fa-search"> </i> VER ENTRENADORES
      </Link>

      <h1> -----------------------</h1>
    </div>
  );
}
export { Inicio };
