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

    test("no agrega dos veces el mismo correo", () => {
        const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
        const destinatario = new Contacto("Ignacio Cremona", "nacho@example.com")
        const correo = new Correo("Sprint 1", "Probamos la bandeja", remitente, [destinatario])
        const bandeja = new Bandeja()

        const primeraAlta = bandeja.agregar(correo)
        const segundaAlta = bandeja.agregar(correo)

        expect(bandeja.getCorreos()).toHaveLength(1)
        expect(bandeja.getCorreos()[0]).toBe(correo)
        expect(primeraAlta).toBe(true)
        expect(segundaAlta).toBe(false)
    })

    test("permite correos con el mismo contenido si tienen distinto id", () => {
        const remitente = new Contacto("Giovanni Vanni", "gio@example.com")
        const destinatario = new Contacto("Ignacio Cremona", "nacho@example.com")
        const primero = new Correo("Sprint 1", "Mismo contenido", remitente, [destinatario])
        const segundo = new Correo("Sprint 1", "Mismo contenido", remitente, [destinatario])
        const bandeja = new Bandeja()

        bandeja.agregar(primero)
        bandeja.agregar(segundo)

        expect(primero.getId()).not.toBe(segundo.getId())
        expect(bandeja.getCorreos()).toHaveLength(2)
        expect(bandeja.getCorreos()[0]).toBe(primero)
        expect(bandeja.getCorreos()[1]).toBe(segundo)
    })
})
