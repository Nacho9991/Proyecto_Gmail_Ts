import { expect, test } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

// RF-07: Gestion de borradores
test("guarda un borrador sin asunto ni destinatarios", () => {
    const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
    const borrador = new Correo("", "Mensaje en preparacion", remitente, [])
    const gestor = new GestorDeCorreos()

    expect(gestor.guardarBorrador(borrador)).toBe(true)
    expect(gestor.consultar(NombreBandeja.BORRADORES)).toEqual([borrador])
})

test("edita el asunto y el cuerpo de un borrador guardado", () => {
    const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
    const borrador = new Correo("", "Mensaje inicial", remitente, [])
    const gestor = new GestorDeCorreos()
    const idOriginal = borrador.getId()
    gestor.guardarBorrador(borrador)

    expect(gestor.editarBorrador(idOriginal, "Trabajo practico", "Mensaje editado", remitente, [])).toBe(true)

    const guardado = gestor.consultar(NombreBandeja.BORRADORES)[0]
    expect(guardado.getId()).toBe(idOriginal)
    expect(guardado.getAsunto()).toBe("Trabajo practico")
    expect(guardado.getCuerpo()).toBe("Mensaje editado")
})

test("edita remitente y destinatarios sin exponer la lista", () => {
    const anterior = new Contacto("Giovanni Vanni", "gio@example.com")
    const nuevo = new Contacto("Ignacio Cremona", "nacho@example.com")
    const destinatarios = [anterior]
    const borrador = new Correo("", "", anterior, [])
    const gestor = new GestorDeCorreos()
    gestor.guardarBorrador(borrador)

    expect(gestor.editarBorrador(borrador.getId(), "Asunto", "Cuerpo", nuevo, destinatarios)).toBe(true)
    destinatarios.push(nuevo)

    const guardado = gestor.consultar(NombreBandeja.BORRADORES)[0]
    expect(guardado.getRemitente()).toBe(nuevo)
    expect(guardado.getDestinatarios()).toEqual([anterior])
})

test("no edita un correo que esta en Entrada", () => {
    const contacto = new Contacto("Giovanni Vanni", "gio@example.com")
    const correo = new Correo("Original", "Contenido original", contacto, [contacto])
    const gestor = new GestorDeCorreos()
    gestor.agregar(correo, NombreBandeja.ENTRADA)

    expect(gestor.editarBorrador(correo.getId(), "Nuevo", "Contenido nuevo", contacto, [])).toBe(false)
    expect(gestor.consultar(NombreBandeja.ENTRADA)[0].getAsunto()).toBe("Original")
    expect(correo.getCuerpo()).toBe("Contenido original")
})

test("completa y envia un borrador inicialmente incompleto", () => {
    const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
    const destinatario = new Contacto("Ignacio Cremona", "nacho@example.com")
    const borrador = new Correo("", "Primer texto", remitente, [])
    const gestor = new GestorDeCorreos()
    const idOriginal = borrador.getId()

    expect(gestor.guardarBorrador(borrador)).toBe(true)
    expect(gestor.enviar(borrador)).toBe(false)
    expect(gestor.consultar(NombreBandeja.BORRADORES)).toEqual([borrador])
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])

    expect(gestor.editarBorrador(idOriginal, "Entrega", "Trabajo terminado", remitente, [destinatario])).toBe(true)
    expect(gestor.enviar(borrador)).toBe(true)
    expect(gestor.consultar(NombreBandeja.BORRADORES)).toEqual([])
    expect(gestor.consultar(NombreBandeja.ENVIADOS)[0]).toBe(borrador)
    expect(borrador.getId()).toBe(idOriginal)
    expect(borrador.getAsunto()).toBe("Entrega")
    expect(borrador.getCuerpo()).toBe("Trabajo terminado")
    expect(borrador.getDestinatarios()).toEqual([destinatario])
})

test("conserva la ultima version despues de varias ediciones", () => {
    const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
    const borrador = new Correo("", "Texto inicial", remitente, [])
    const gestor = new GestorDeCorreos()
    const idOriginal = borrador.getId()
    expect(gestor.guardarBorrador(borrador)).toBe(true)

    expect(gestor.editarBorrador(idOriginal, "Primera version", "Primer cambio", remitente, [])).toBe(true)
    expect(gestor.editarBorrador(idOriginal, "Version final", "Ultimo cambio", remitente, [])).toBe(true)

    const borradores = gestor.consultar(NombreBandeja.BORRADORES)
    expect(borradores).toHaveLength(1)
    expect(borradores[0]).toBe(borrador)
    expect(borradores[0].getId()).toBe(idOriginal)
    expect(borradores[0].getAsunto()).toBe("Version final")
    expect(borradores[0].getCuerpo()).toBe("Ultimo cambio")
})
