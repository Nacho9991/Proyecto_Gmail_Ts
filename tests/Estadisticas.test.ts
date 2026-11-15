import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Estadisticas } from "../src/Estadisticas"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

// RF-10: Procesamiento funcional de correos
test("Obtiene los asuntos de una coleccion de correos", () => {
    const remitente = new Contacto("Giovanni", "gio@example.com")
    const destinatario = new Contacto("Ignacio", "ignacio@example.com")
    const examen = new Correo("Examen final", "Cuerpo", remitente, [destinatario])
    const entrega = new Correo("Entrega del trabajo", "Cuerpo", remitente, [destinatario])
    const estadisticas = new Estadisticas()

    expect(estadisticas.asuntos([examen, entrega])).toEqual([
        "Examen final",
        "Entrega del trabajo"
    ])
})

test("Devuelve una lista de asuntos vacia cuando no hay correos", () => {
    const estadisticas = new Estadisticas()

    expect(estadisticas.asuntos([])).toEqual([])
})

test("Obtiene solo los asuntos de la bandeja consultada", () => {
    const remitente = new Contacto("Giovanni", "gio@example.com")
    const destinatario = new Contacto("Ignacio", "ignacio@example.com")
    const recibido = new Correo("Consulta", "Cuerpo", remitente, [destinatario])
    const borrador = new Correo("Pendiente", "Cuerpo", remitente, [])
    const gestor = new GestorDeCorreos()
    const estadisticas = new Estadisticas()

    expect(gestor.agregar(recibido, NombreBandeja.ENTRADA)).toBe(true)
    expect(gestor.guardarBorrador(borrador)).toBe(true)

    const correos = gestor.consultar(NombreBandeja.ENTRADA)

    expect(estadisticas.asuntos(correos)).toEqual(["Consulta"])
})

test("Filtra los correos que cumplen una condicion", () => {
    const remitente = new Contacto("Giovanni", "gio@example.com")
    const destinatario = new Contacto("Ignacio", "ignacio@example.com")
    const leido = new Correo("Consulta", "Cuerpo", remitente, [destinatario])
    const noLeido = new Correo("Entrega", "Cuerpo", remitente, [destinatario])
    const estadisticas = new Estadisticas()

    leido.marcarLeido()

    const resultado = estadisticas.filtrar(
        [leido, noLeido],
        (correo) => !correo.estaLeido()
    )

    expect(resultado).toEqual([noLeido])
})
