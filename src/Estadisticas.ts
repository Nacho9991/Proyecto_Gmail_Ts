import type { Correo } from "./Correo"
import type { IEstadisticas } from "./IEstadisticas"
import type { Predicado } from "./Predicado"

export class Estadisticas implements IEstadisticas {
    asuntos(correos: ReadonlyArray<Correo>): ReadonlyArray<string> {
        return correos.map((correo) => correo.getAsunto())
    }

    filtrar(correos: ReadonlyArray<Correo>, predicado: Predicado): ReadonlyArray<Correo> {
        return correos.filter(predicado)
    }
}
