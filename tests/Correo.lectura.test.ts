import { expect, test } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"

test("un correo puede marcarse como leido", () => {
    const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
    const destinatario = new Contacto("Ignacio Cremona", "nacho@example.com")
    const correo = new Correo("Sprint 1", "Probamos la lectura", remitente, [destinatario])

    expect(correo.estaLeido()).toBe(false)
    correo.marcarLeido()
    expect(correo.estaLeido()).toBe(true)
})

test("un correo leido puede marcarse como no leido", () => {
    const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
    const destinatario = new Contacto("Ignacio Cremona", "nacho@example.com")
    const correo = new Correo("Sprint 1", "Probamos la lectura", remitente, [destinatario])

    correo.marcarLeido()
    expect(correo.estaLeido()).toBe(true)

    correo.marcarNoLeido()
    expect(correo.estaLeido()).toBe(false)
})
