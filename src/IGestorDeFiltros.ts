import type { Correo } from "./Correo"
import type { IFiltro } from "./IFiltro"

export interface IGestorDeFiltros {
    getFiltros(): ReadonlyArray<IFiltro>
    obtener(nombre: string): IFiltro | undefined
    registrar(filtro: IFiltro): boolean
    aplicar(nombre: string, correos: ReadonlyArray<Correo>): ReadonlyArray<Correo>
}