// src/App.js

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";

import { Torneos} from "./components/torneos/Torneos";
import { Temporadas } from "./components/Temporadas";

import { Clubes } from "./components/clubes/Clubes";
import { Ciudades } from "./components/clubes/Ciudades";




function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />

            <Route path="/clubes" element={<Clubes />} />
            <Route path="/ciudades" element={<Ciudades />} />
            <Route path="/temporadas" element={<Temporadas />} />
            <Route path="/torneos" element={<Torneos />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/posiciones" element={<Posiciones />} />
            
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
