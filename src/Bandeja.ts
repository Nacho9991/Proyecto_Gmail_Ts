import { Correo } from "./Correo"

export class Bandeja {
    private correos: Correo[] = []

    agregar(correo: Correo): boolean {
        const correosActuales = this.getCorreos()
        const existe = correosActuales.some((actual) => actual.getId() === correo.getId())
        const puedeAgregar = !existe
        puedeAgregar && this.setCorreos([...correosActuales, correo])
        return puedeAgregar
    }

    getCorreos(): ReadonlyArray<Correo> {
        return [...this.correos]
    }

    private setCorreos(nuevosCorreos: Correo[]): void {
        this.correos = [...nuevosCorreos]
    }
}
