import type { Contacto } from "./Contacto"
import type { Predicado } from "./Predicado"

export class Predicados {
    static deDominio(dominio: string): Predicado {
        const dominioBuscado = dominio.trim().toLowerCase()
        return (correo) => correo.getRemitente().getEmail().endsWith(dominioBuscado)
    }

    static asuntoContiene(texto: string): Predicado {
        const textoBuscado = texto.trim().toLowerCase()
        return (correo) => correo.getAsunto().toLowerCase().includes(textoBuscado)
    }

    static contenidoContiene(texto: string): Predicado {
        const textoBuscado = texto.trim().toLowerCase()
        return (correo) => correo.getCuerpo().toLowerCase().includes(textoBuscado)
    }

    static noLeido(): Predicado {
        return (correo) => !correo.estaLeido()
    }

    static esFavorito(): Predicado {
        return (correo) => correo.esFavorito()
    }

    static deRemitente(contacto: Contacto): Predicado {
        return (correo) => correo.getRemitente().getEmail() === contacto.getEmail()
    }
}