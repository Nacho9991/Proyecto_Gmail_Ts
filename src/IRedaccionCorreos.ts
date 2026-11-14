import type { Contacto } from "./Contacto"
import type { Correo } from "./Correo"

export interface IRedaccionCorreos {
    guardarBorrador(correo: Correo): boolean
    editarBorrador(id: number, asunto: string, cuerpo: string, remitente: Contacto, destinatarios: Contacto[]): boolean
    enviar(correo: Correo): boolean
}