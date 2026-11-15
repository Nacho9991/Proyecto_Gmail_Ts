import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Estadisticas } from "../src/Estadisticas"

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
