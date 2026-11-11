import type { Correo } from "./Correo"
import type { Predicado } from "./Predicado"
import type { IFiltro } from "./IFiltro"
import type { ICombinable } from "./ICombinable"
export class Filtro implements IFiltro, ICombinable {
    private readonly nombre: string
    private readonly predicado: Predicado

    constructor(nombre: string, predicado: Predicado){
        this.nombre = nombre.trim()
        this.predicado = predicado
    }

    getNombre(): string{
        return this.nombre
    }

    private getPredicado(): Predicado {
        return this.predicado
    }

    evaluar(correo: Correo): boolean{
        return this.getPredicado()(correo)
    }

    aplicar(correos: ReadonlyArray<Correo>): ReadonlyArray<Correo> {
        return correos.filter((correo) => this.evaluar(correo))
    }

   and(otro: Filtro): Filtro {
    return new Filtro(
        `${this.getNombre()} y ${otro.getNombre()}`,
        (correo) => this.evaluar(correo) && otro.evaluar(correo)
    )
   }

    or(otro: Filtro): Filtro {
    return new Filtro(
        `${this.getNombre()} o ${otro.getNombre()}`,
        (correo) => this.evaluar(correo) || otro.evaluar(correo)
    )
   }

    not(): Filtro {
    return new Filtro(
        `no ${this.getNombre()}`,
        (correo) => !this.evaluar(correo)
    )
   }

}