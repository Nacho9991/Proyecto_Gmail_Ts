import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"


const gestor = new GestorDeCorreos()
const exequiel = new Contacto("Exequiel", "exequiel@edu.ar")
const martin = new Contacto("Martin", "martin@edu.ar")
const roberto = new Contacto("Roberto", "pato@edu.ar")
const invalido = new Contacto("", "no-es-un-email")

//RF-02: Envio de correos

test("Enviar un correo valido lo deja en Enviados", () => {
   const gestor = new GestorDeCorreos()
   const correo = new Correo("Hola", "Cuerpo",exequiel,[martin, roberto])

   expect(gestor.enviar(correo)).toBe(true)
   expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([correo])
})

test("Enviar un correo a varios destinatarios lo deja en Enviados", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin, roberto])

    expect(gestor.enviar(correo)).toBe(true)
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([correo])
})

test("Enviar un correo sin destinatarios devuelve false y no lo guarda", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [])

    expect(gestor.enviar(correo)).toBe(false)
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])
})

test("Enviar un correo sin asunto devuelve false", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("   ", "Cuerpo", exequiel, [martin])

    expect(gestor.enviar(correo)).toBe(false)
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])
})

test("Enviar un correo con remitente invalido devuelve false", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", invalido, [martin])

    expect(gestor.enviar(correo)).toBe(false)
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])
})

test("Enviar un borrador valido lo pasa de Borradores a Enviados", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(gestor.agregar(correo, NombreBandeja.BORRADORES)).toBe(true)

    expect(gestor.enviar(correo)).toBe(true)
    expect(gestor.consultar(NombreBandeja.BORRADORES)).toEqual([])
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([correo])
})

test("Enviar un borrador invalido devuelve false y sigue en Borradores", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [])
    expect(gestor.agregar(correo, NombreBandeja.BORRADORES)).toBe(true)

    expect(gestor.enviar(correo)).toBe(false)
    expect(gestor.consultar(NombreBandeja.BORRADORES)).toEqual([correo])
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])
})

test("Enviar dos veces el mismo correo no genera duplicados", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(gestor.enviar(correo)).toBe(true)
    expect(gestor.enviar(correo)).toBe(false)
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toHaveLength(1)
})

test("Un correo recibido en Entrada no se puede enviar", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(gestor.agregar(correo, NombreBandeja.ENTRADA)).toBe(true)

    expect(gestor.enviar(correo)).toBe(false)
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])
})

