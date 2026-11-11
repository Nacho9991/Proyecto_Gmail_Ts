import type { Correo } from "./Correo"

export interface IBuscador {
    buscar(texto: string, correos: ReadonlyArray<Correo>): ReadonlyArray<Correo>
}