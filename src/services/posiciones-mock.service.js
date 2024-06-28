import arrayPosicion from '../datos-mock/posiciones-mock';
async function Buscar() {
     return arrayPosicion;
}
async function BuscarPorId(IdPosicion) {
      return arrayPosicion.find((posicion) => posicion.IdPosicion === IdPosicion);
}
async function Agregar(posicion) {
    posicion.IdPosicion = arrayPosicion.length + 1;  // simula autoincremental
    arrayPosicion.push(posicion);
}
async function Modificar(posicion) {
    let posicionEncontrado = arrayPosicion.find((posicionfind) => posicionfind.IdPosicion === posicion.IdPosicion);
    if (posicionEncontrado) {
        posicionEncontrado.NombreApellido = posicion.NombreApellido;
    }
}
async function Eliminar(IdPosicion){
    let posicionEncontrado = arrayPosicion.find((posicionfind) => posicionfind.IdPosicion === IdPosicion);
    if (posicionEncontrado) {
        arrayPosicion.splice(arrayPosicion.indexOf(posicionEncontrado), 1);
    }
}
export const posicionesMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};