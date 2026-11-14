import type { Filtro } from "./Filtro"
import type { IFiltro } from "./IFiltro"
export interface ICombinable {
    and(otro: IFiltro): Filtro
    or(otro: IFiltro): Filtro
    not(): Filtro
}