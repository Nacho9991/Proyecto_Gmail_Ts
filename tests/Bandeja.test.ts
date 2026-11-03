import { describe, test, expect } from "vitest"
import { Bandeja } from "../src/Bandeja"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"

// RF-06: Bandejas y clasificacion
describe("Bandeja", () => {
    test("permite agregar un correo y consultar su contenido", () => {
        const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
        const destinatario = new Contacto("Ignacio Cremona", "nacho@example.com")
        const correo = new Correo("Sprint 1", "Probamos la bandeja", remitente, [destinatario])
        const bandeja = new Bandeja()

        bandeja.agregar(correo)

        const correos = bandeja.getCorreos()
        expect(correos).toHaveLength(1)
        expect(correos[0]).toBe(correo)
    })
})
