import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Filtro } from "../src/Filtro"
import { Predicados } from "../src/Predicados"

const profe = new Contacto("Profe", "profe@ucp.edu.ar")
const exequiel = new Contacto("Exequiel", "exequiel@edu.ar")
const martin = new Contacto("Martin", "martin@edu.ar")

// RF-05: Creacion y aplicacion de filtros personalizados
test("deDominio acepta correos de remitentes del dominio", () => {
    const correo = new Correo("Hola", "Cuerpo", profe, [martin])

    expect(Predicados.deDominio("@ucp.edu.ar")(correo)).toBe(true)
})

test("deDominio rechaza correos de remitentes de otros dominios", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(Predicados.deDominio("@ucp.edu.ar")(correo)).toBe(false)
})

test("asuntoContiene encuentra el texto sin distinguir mayusculas", () => {
    const correo = new Correo("Examen final", "Cuerpo", exequiel, [martin])

    expect(Predicados.asuntoContiene("examen")(correo)).toBe(true)
})

test("asuntoContiene rechaza cuando el texto no esta en el asunto", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(Predicados.asuntoContiene("Examen")(correo)).toBe(false)
})

test("contenidoContiene busca en el cuerpo del correo", () => {
    const correo = new Correo("Hola", "Entrega pendiente", exequiel, [martin])

    expect(Predicados.contenidoContiene("entrega")(correo)).toBe(true)
    expect(Predicados.contenidoContiene("examen")(correo)).toBe(false)

})

test("noLeido acepta un correo recien creado", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(Predicados.noLeido()(correo)).toBe(true)
})

test("esFavorito rechaza un correo recien creado", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(Predicados.esFavorito()(correo)).toBe(false)
})

test("deRemitente identifica al remitente por su email", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(Predicados.deRemitente(exequiel)(correo)).toBe(true)
    expect(Predicados.deRemitente(martin)(correo)).toBe(false)
})

test("Un predicado se puede usar para crear un filtro", () => {
    const filtro = new Filtro("Correo de la UCP", Predicados.deDominio("@ucp.edu.ar"))
    const delProfe = new Correo("Hola", "Cuerpo", profe, [martin])
    const deExequiel = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(filtro.aplicar([delProfe, deExequiel])).toEqual([delProfe])
})



