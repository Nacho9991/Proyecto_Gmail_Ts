import { Bandeja } from "./Bandeja"
import { Correo } from "./Correo"
import { NombreBandeja } from "./NombreBandeja"

export class GestorDeCorreos {
    private readonly bandejas: Record<NombreBandeja, Bandeja> = {
        [NombreBandeja.ENTRADA]: new Bandeja(),
        [NombreBandeja.ENVIADOS]: new Bandeja(),
        [NombreBandeja.BORRADORES]: new Bandeja(),
        [NombreBandeja.ELIMINADOS]: new Bandeja()
    }

    private getBandeja(nombre: NombreBandeja): Bandeja {
        return this.bandejas[nombre]
    }

    consultar(nombre: NombreBandeja): ReadonlyArray<Correo> {
        return this.getBandeja(nombre).getCorreos()
    }

    private buscarUbicacion(id: number): NombreBandeja | undefined {
        return Object.values(NombreBandeja).find((nombre) =>
            this.consultar(nombre).some((correo) => correo.getId() === id)
        )
    }

    agregar(correo: Correo, destino: NombreBandeja): boolean {
        const sinUbicacion = this.buscarUbicacion(correo.getId()) === undefined
        const destinoPermitido = destino !== NombreBandeja.ELIMINADOS
        const datosPermitidos = destino === NombreBandeja.BORRADORES || correo.esValido()
        return sinUbicacion && destinoPermitido && datosPermitidos && this.getBandeja(destino).agregar(correo)
    }
}
