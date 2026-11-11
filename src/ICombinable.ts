import type { Filtro } from "./Filtro"

export interface ICombinable {
    and(otro: Filtro): Filtro
    or(otro: Filtro): Filtro
    not(): Filtro
}