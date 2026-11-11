import type { Contacto } from "./Contacto"

export interface IConsultaContactos {
    getContactos(): ReadonlyArray<Contacto>
    buscarPorEmail(email: string): Contacto | undefined
}