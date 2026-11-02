import {Contacto} from "./Contacto"

export class AgendaContactos {
    private contactos: Contacto[] = []

    getContactos(): ReadonlyArray<Contacto>{
        return [...this.contactos]
    }

    private setContactos(nuevosContactos: Contacto[]): void {
        this.contactos = nuevosContactos
    }

    private normalizar(email: string): string{
        return email.trim().toLowerCase() //sin espacios y en minusculas para comparar emails
    }

    buscarPorEmail(email: string): Contacto | undefined {
        return this.getContactos().find((c) => c.getEmail() === this.normalizar(email))
    }

    agregar(contacto: Contacto): boolean {
        const emailLibre = this.buscarPorEmail(contacto.getEmail()) === undefined
        const puedeAgregar = contacto.esValido() && emailLibre
        puedeAgregar && this.setContactos([...this.getContactos(), contacto])
        return puedeAgregar
    }
    
    modificar(emailActual: string, nuevo: Contacto): boolean {
        const existe = this.buscarPorEmail(emailActual) !== undefined //true si el contacto esta en la agenda
        const mismoEmail = nuevo.getEmail() === this.normalizar(emailActual)
        const emailLibre = mismoEmail  || this.buscarPorEmail(nuevo.getEmail())=== undefined
        const puedeModificar = existe && nuevo.esValido() && emailLibre
        puedeModificar && this.setContactos(
                        this.getContactos().map((c) => c.getEmail() === this.normalizar(emailActual) ? nuevo : c)
        )
        return puedeModificar
    }

    eliminar(email: string): boolean {
        const existe = this.buscarPorEmail(email) !== undefined
        existe && this.setContactos(
            this.getContactos().filter((c) => c.getEmail() !== this.normalizar(email))
        )
        return existe
    }
}