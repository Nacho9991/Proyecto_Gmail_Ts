import type { Contacto } from "./Contacto"

export interface IAdministracionContactos {
    agregar(contacto: Contacto): boolean
    modificar(emailActual: string, nuevo: Contacto): boolean
    eliminar(email: string): boolean
}