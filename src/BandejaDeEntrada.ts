import { Bandeja } from "./Bandeja"
import type { Correo } from "./Correo"

export class BandejaDeEntrada extends Bandeja {
    protected override aceptaCorreo(correo: Correo): boolean {
        return correo.esValido()
    }
}