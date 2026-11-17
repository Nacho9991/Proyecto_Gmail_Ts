import { Bandeja } from "./Bandeja"
import type { Correo } from "./Correo"

export class BandejaDeEnviados extends Bandeja {
    protected override aceptaCorreo(correo: Correo): boolean {
        return correo.esValido()
    }
}