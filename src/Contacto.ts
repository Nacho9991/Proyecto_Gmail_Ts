export class Contacto {
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
        const emailValido = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(this.getEmail())
        return nombreValido && emailValido
    }

}