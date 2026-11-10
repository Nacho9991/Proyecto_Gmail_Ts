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
