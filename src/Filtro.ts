import type { Correo } from "./Correo"
import type { Predicado } from "./Predicado"

export class Filtro{
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

   y(otro: Filtro): Filtro {
    return new Filtro(
        `${this.getNombre()} y ${otro.getNombre()}`,
        (correo) => this.evaluar(correo) && otro.evaluar(correo)
    )
   }

    o(otro: Filtro): Filtro {
    return new Filtro(
        `${this.getNombre()} o ${otro.getNombre()}`,
        (correo) => this.evaluar(correo) || otro.evaluar(correo)
    )
   }

    no(): Filtro {
    return new Filtro(
        `no ${this.getNombre()}`,
        (correo) => !this.evaluar(correo)
    )
   }

}