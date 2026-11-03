import { describe, test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

const { ENTRADA, ENVIADOS, BORRADORES, ELIMINADOS } = NombreBandeja
const nombres = Object.values(NombreBandeja)
const crearCorreo = (asunto = "Sprint 1") => {
    const gio = new Contacto("Giovanni Vanni", "gio@example.com")
    const nacho = new Contacto("Ignacio Cremona", "nacho@example.com")
    return new Correo(asunto, "Trabajo integrador", gio, [nacho])
}

describe("GestorDeCorreos - RF-06", () => {
    test("crea cuatro bandejas vacias e independientes por gestor", () => {
        const gestor = new GestorDeCorreos()
        nombres.forEach((nombre) => expect(gestor.consultar(nombre)).toEqual([]))
        gestor.agregar(crearCorreo(), ENTRADA)
        nombres.forEach((nombre) => expect(new GestorDeCorreos().consultar(nombre)).toEqual([]))
    })

    test.each([ENTRADA, ENVIADOS, BORRADORES])("incorpora en %s sin duplicar en ninguna bandeja", (nombre) => {
        const gestor = new GestorDeCorreos()
        const correo = crearCorreo()
        expect(gestor.agregar(correo, nombre)).toBe(true)
        nombres.forEach((destino) => expect(gestor.agregar(correo, destino)).toBe(false))
        expect(gestor.consultar(nombre)[0]).toBe(correo)
        expect(nombres.flatMap((n) => gestor.consultar(n))).toEqual([correo])
    })

    test("no incorpora directamente en Eliminados y reserva los incompletos para Borradores", () => {
        const gestor = new GestorDeCorreos()
        expect(gestor.agregar(crearCorreo(), ELIMINADOS)).toBe(false)
        expect(gestor.agregar(crearCorreo(""), ENTRADA)).toBe(false)
        expect(gestor.agregar(crearCorreo(""), ENVIADOS)).toBe(false)
        expect(gestor.agregar(crearCorreo(""), BORRADORES)).toBe(true)
    })

    test("consultar protege la lista y conserva los objetos", () => {
        const gestor = new GestorDeCorreos()
        const correo = crearCorreo()
        gestor.agregar(correo, ENTRADA)
        const lista = gestor.consultar(ENTRADA) as Correo[]
        lista.pop()
        lista.push(crearCorreo())
        expect(gestor.consultar(ENTRADA)).toEqual([correo])
        expect(gestor.consultar(ENTRADA)[0]).toBe(correo)
    })
})
