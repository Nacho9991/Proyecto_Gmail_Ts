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

    mover(id: number, destino: NombreBandeja): boolean {
        const origen = this.buscarUbicacion(id)
        return origen !== undefined && (origen === destino || this.moverBorradorValido(id, origen, destino))
    }

    private moverBorradorValido(id: number, origen: NombreBandeja, destino: NombreBandeja): boolean {
        return origen === NombreBandeja.BORRADORES && destino === NombreBandeja.ENVIADOS &&
            this.consultar(origen).some((correo) => correo.getId() === id && correo.esValido()) &&
            this.trasladar(id, origen, destino)
    }

    private trasladar(id: number, origen: NombreBandeja, destino: NombreBandeja): boolean {
        const correo = this.consultar(origen).find((actual) => actual.getId() === id)
        return correo !== undefined && this.getBandeja(destino).agregar(correo) && this.getBandeja(origen).quitar(id)
    }
}
