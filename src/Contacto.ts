import type { IContacto } from "./IContacto"
export class Contacto implements IContacto {
    private readonly nombre: string
    private readonly email: string

    constructor(nombre:string, email:string) {
        this.nombre = nombre.trim()
        this.email = email.trim().toLowerCase()
    }
    
    getNombre(): string {
        return this.nombre
    }

    getEmail(): string {
        return this.email
    }

    esValido(): boolean {
        const nombreValido = this.getNombre().length > 0
        const emailValido = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(this.getEmail()) // sirve exclusivamente para validar que el email tenga un formato correcto
        return nombreValido && emailValido
    }

}