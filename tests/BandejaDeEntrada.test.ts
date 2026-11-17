import { test, expect } from "vitest"
import { BandejaDeEntrada } from "../src/BandejaDeEntrada"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"

const remitente = new Contacto("Giovanni", "gio@example.com")
const destinatario = new Contacto("Ignacio", "ignacio@example.com")

// RF-06: la bandeja de entrada solo acepta correos validos
test("Entrada acepta un correo valido", () => {
    const bandeja = new BandejaDeEntrada()
    const correo = new Correo("Hola", "Cuerpo", remitente, [destinatario])

    expect(bandeja.agregar(correo)).toBe(true)
    expect(bandeja.getCorreos()).toEqual([correo])
})

test("Entrada rechaza un correo invalido", () => {
    const bandeja = new BandejaDeEntrada()
    const incompleto = new Correo("", "", remitente, [])

    expect(bandeja.agregar(incompleto)).toBe(false)
    expect(bandeja.getCorreos()).toEqual([])
})