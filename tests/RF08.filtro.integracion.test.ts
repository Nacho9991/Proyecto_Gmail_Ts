import { expect, test } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Filtro } from "../src/Filtro"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"
import { Predicados } from "../src/Predicados"

test("el filtro de no leidos refleja los cambios de lectura", () => {
    const contacto = new Contacto("Giovanni Vanni", "gio@example.com")
    const correo = new Correo("Sprint 1", "Probamos el filtro", contacto, [contacto])
    const gestor = new GestorDeCorreos()
    const filtro = new Filtro("No leidos", Predicados.noLeido())

    expect(gestor.agregar(correo, NombreBandeja.ENTRADA)).toBe(true)
    expect(filtro.aplicar(gestor.consultar(NombreBandeja.ENTRADA))).toEqual([correo])

    correo.marcarLeido()
    expect(gestor.consultar(NombreBandeja.ENTRADA)[0]).toBe(correo)
    expect(gestor.consultar(NombreBandeja.ENTRADA)[0].estaLeido()).toBe(true)
    expect(filtro.aplicar(gestor.consultar(NombreBandeja.ENTRADA))).toEqual([])

    correo.marcarNoLeido()
    expect(gestor.consultar(NombreBandeja.ENTRADA)[0].estaLeido()).toBe(false)
    expect(filtro.aplicar(gestor.consultar(NombreBandeja.ENTRADA))).toEqual([correo])
})
