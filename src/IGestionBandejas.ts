import type { Correo } from "./Correo"
import type { NombreBandeja } from "./NombreBandeja"

export interface IGestionBandejas {
    agregar(correo: Correo, destino: NombreBandeja): boolean
    mover(id: number, destino: NombreBandeja): boolean
    eliminar(id: number): boolean
    restaurar(id: number): boolean
}