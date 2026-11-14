import type { Correo } from "./Correo"
import type { NombreBandeja } from "./NombreBandeja"

export interface IConsultaCorreos {
    consultar(nombre: NombreBandeja): ReadonlyArray<Correo>
    obtenerNoLeidos(bandeja: NombreBandeja): ReadonlyArray<Correo>
    consultarFavoritos(): ReadonlyArray<Correo>
}