import type { Correo } from "./Correo"

export interface IEstadisticas {
    asuntos(correos: ReadonlyArray<Correo>): ReadonlyArray<string>
}
