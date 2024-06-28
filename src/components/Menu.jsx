import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i class="fa fa-soccer-ball"></i>
          &nbsp;<i>FULBO</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/clubes">
                Clubes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ciudades">
                Ciudades
              </NavLink>
            </li>
            
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/entrenadores">
                Entrenadores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tiposEntrenadores">
                Tipos Entrenadores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jugadores">
                Jugadores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posiciones">
                Posiciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/torneos">
                Torneos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/temporadas">
                Temporadas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Menu };
