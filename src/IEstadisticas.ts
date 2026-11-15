import type { Correo } from "./Correo"
import type { Predicado } from "./Predicado"

export interface IEstadisticas {
    asuntos(correos: ReadonlyArray<Correo>): ReadonlyArray<string>
    filtrar(correos: ReadonlyArray<Correo>, predicado: Predicado): ReadonlyArray<Correo>
}
