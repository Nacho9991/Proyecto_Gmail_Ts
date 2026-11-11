import type { Correo } from "./Correo"
import type { Filtro } from "./Filtro"

export interface IGestorDeFiltros {
    getFiltros(): ReadonlyArray<Filtro>
    obtener(nombre: string): Filtro | undefined
    registrar(filtro: Filtro): boolean
    aplicar(nombre: string, correos: ReadonlyArray<Correo>): ReadonlyArray<Correo>
}