import type { Correo } from "./Correo"

export interface IFiltro {
    getNombre(): string
    evaluar(correo: Correo): boolean
    aplicar(correos: ReadonlyArray<Correo>): ReadonlyArray<Correo>
}