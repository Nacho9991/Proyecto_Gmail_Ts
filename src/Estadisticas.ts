import type { Correo } from "./Correo"
import type { IEstadisticas } from "./IEstadisticas"

export class Estadisticas implements IEstadisticas {
    asuntos(correos: ReadonlyArray<Correo>): ReadonlyArray<string> {
        return correos.map((correo) => correo.getAsunto())
    }
}
