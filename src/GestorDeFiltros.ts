import type { Correo } from "./Correo"
import type { Filtro } from "./Filtro"

export class GestorDeFiltros {
    private readonly maximo: number = 5
    private filtros: Filtro[] = []

    getFiltros(): ReadonlyArray<Filtro> {
        return [...this.filtros]
    }

    private setFiltros(nuevosFiltros: Filtro[]): void {
        this.filtros = [...nuevosFiltros]
    }

    private getMaximo(): number {
        return this.maximo
    }

    obtener(nombre: string): Filtro | undefined {
        return this.getFiltros().find((filtro) => filtro.getNombre() === nombre.trim())
    }

    registrar(filtro: Filtro): boolean {
        const nombreValido = filtro.getNombre().length > 0
        const nombreLibre = this.obtener(filtro.getNombre()) === undefined
        const hayLugar = this.getFiltros().length < this.getMaximo()
        const puedeRegistrar = nombreValido && nombreLibre && hayLugar
        puedeRegistrar && this.setFiltros([...this.getFiltros(), filtro])
        return puedeRegistrar
    }

    aplicar(nombre: string, correos: ReadonlyArray<Correo>): ReadonlyArray<Correo> {
        const filtro = this.obtener(nombre)
        return filtro === undefined ? [] : filtro.aplicar(correos)
    }
}