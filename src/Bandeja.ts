import { Correo } from "./Correo"

export class Bandeja {
    private correos: Correo[] = []

    agregar(correo: Correo): void {
        this.correos.push(correo)
    }

    getCorreos(): ReadonlyArray<Correo> {
        return [...this.correos]
    }
}
