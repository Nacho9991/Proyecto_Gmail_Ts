import type { Correo } from "./Correo"

export class Buscador {
    buscar(texto: string, correos: ReadonlyArray<Correo>): ReadonlyArray<Correo> {
        const textoBuscado = texto.trim().toLowerCase()
        return correos.filter((correo) => this.coincide(correo, textoBuscado))  //mirar aca
    }

    private coincide(correo: Correo, texto: string): boolean {
        const campos = [
            correo.getAsunto(),   //mirar aca
            correo.getCuerpo(),
            correo.getRemitente().getNombre(),
            correo.getRemitente().getEmail(),
            ...correo.getDestinatarios().flatMap((d) => [d.getNombre(), d.getEmail()])
        ]
        return texto.length > 0 && campos.some((campo) => campo.toLowerCase().includes(texto)) //mirar aca
    }
}