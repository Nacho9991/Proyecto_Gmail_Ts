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
    test.each([
        [ENTRADA, ENTRADA, true], [ENTRADA, ENVIADOS, false], [ENTRADA, BORRADORES, false],
        [ENVIADOS, ENTRADA, false], [ENVIADOS, ENVIADOS, true], [ENVIADOS, BORRADORES, false],
        [BORRADORES, ENTRADA, false], [BORRADORES, ENVIADOS, true], [BORRADORES, BORRADORES, true]
    ] as const)("mover de %s a %s devuelve %s sin duplicar", (origen, destino, permitido) => {
        const gestor = new GestorDeCorreos()
        const correo = crearCorreo()
        gestor.agregar(correo, origen)
        expect(gestor.mover(correo.getId(), destino)).toBe(permitido)
        const ubicacion = permitido ? destino : origen
        expect(gestor.consultar(ubicacion)[0]).toBe(correo)
        expect(nombres.flatMap((n) => gestor.consultar(n))).toEqual([correo])
    })

    test("rechaza el traslado de un borrador invalido sin perderlo", () => {
        const gestor = new GestorDeCorreos()
        const correo = crearCorreo("")
        gestor.agregar(correo, BORRADORES)
        expect(gestor.mover(correo.getId(), ENVIADOS)).toBe(false)
        expect(gestor.consultar(BORRADORES)).toEqual([correo])
        expect(gestor.consultar(ENVIADOS)).toEqual([])
    })

    test("mover un id inexistente no altera las bandejas", () => {
        const gestor = new GestorDeCorreos()
        const correo = crearCorreo()
        gestor.agregar(correo, ENTRADA)
        nombres.forEach((n) => expect(gestor.mover(-1, n)).toBe(false))
        expect(nombres.flatMap((n) => gestor.consultar(n))).toEqual([correo])
    })

    test("repetir un movimiento conserva una sola entrada y los demas correos", () => {
        const gestor = new GestorDeCorreos()
        const correo = crearCorreo()
        const otro = crearCorreo()
        gestor.agregar(correo, BORRADORES)
        gestor.agregar(otro, BORRADORES)
        expect(gestor.mover(correo.getId(), ENVIADOS)).toBe(true)
        expect(gestor.mover(correo.getId(), ENVIADOS)).toBe(true)
        expect(gestor.consultar(BORRADORES)).toEqual([otro])
        expect(gestor.consultar(ENVIADOS)).toEqual([correo])
    })

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
