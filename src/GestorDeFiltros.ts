import type { Correo } from "./Correo"
import type { IFiltro } from "./IFiltro"
import type { IGestorDeFiltros } from "./IGestorDeFiltros"
export class GestorDeFiltros implements IGestorDeFiltros {
    private readonly maximo: number = 5
    private filtros: IFiltro[] = []

    getFiltros(): ReadonlyArray<IFiltro> {
        return [...this.filtros]
    }

    private setFiltros(nuevosFiltros: IFiltro[]): void {
        this.filtros = [...nuevosFiltros]
    }

    private getMaximo(): number {
        return this.maximo
    }

    obtener(nombre: string): IFiltro | undefined {
        return this.getFiltros().find((filtro) => filtro.getNombre() === nombre.trim())
    }

    registrar(filtro: IFiltro): boolean {
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