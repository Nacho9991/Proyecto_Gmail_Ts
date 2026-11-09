import { expect, test } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

test("consulta solo los correos no leidos de una bandeja", () => {
    const contacto = new Contacto("Giovanni Vanni", "gio@example.com")
    const leido = new Correo("Leido", "Contenido", contacto, [contacto])
    const noLeido = new Correo("No leido", "Contenido", contacto, [contacto])
    const gestor = new GestorDeCorreos()

    leido.marcarLeido()
    gestor.agregar(leido, NombreBandeja.ENTRADA)
    gestor.agregar(noLeido, NombreBandeja.ENTRADA)

    expect(gestor.obtenerNoLeidos(NombreBandeja.ENTRADA)).toEqual([noLeido])
})
