//const urlServidor = "http://localhost:3000"
//const urlServidor = ""  // vacio para cuando se despliega el frontend, en el mismo servidor que el backend
const urlServidor = "http://localhost:4000"
//const urlServidor = "https://webapi.pymes.net.ar"
//const urlServidor = "https://labsys.frc.utn.edu.ar/dds-express"



const urlResourceClubes = urlServidor + "/api/clubes";
const urlResourceCiudades = urlServidor + "/api/ciudades";

const urlResourceTorneos = urlServidor + "/api/torneos";
const urlResourceTemporadas = urlServidor + "/api/temporadas";

const urlResourceJugadores = urlServidor + "/api/jugadores";
const urlResourcePosiciones = urlServidor + "/api/posiciones";


export const config = {
    urlServidor,

    urlResourceClubes,
    urlResourceCiudades,

    urlResourceTorneos,
    urlResourceTemporadas,

    urlResourcePosiciones,
    urlResourceJugadores,
}