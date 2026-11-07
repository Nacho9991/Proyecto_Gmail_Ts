import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Filtro } from "../src/Filtro"

const exequiel = new Contacto("Exequiel", "exequiel@edu.ar")
const martin = new Contacto("Martin", "martin@edu.ar")

//RF-05: Creacion y aplicacion de filtros personalizados
test("Un filtro evalua true cuando el correo cumple su predicado", () => {
    const filtro = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
    const correo = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    expect(filtro.evaluar(correo)).toBe(true)
})

test("Un filtro evalua false cuando el correo no cumple su predicado", () => {
    const filtro = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(filtro.evaluar(correo)).toBe(false)
})

test("Aplicar devuelve solo los correos que cumplen el filtro", () => {
    const filtro = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
    const examen = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(filtro.aplicar([examen, saludo])).toEqual([examen])
})

test("Aplicar devuelve una coleccion vacia cuando ningun correo cumple", () => {
    const filtro = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(filtro.aplicar([saludo])).toEqual([])
})

test("Aplicar sobre una coleccion vacia devuelve una coleccion vacia", () => {
    const filtro = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
    expect(filtro.aplicar([])).toEqual([])
})

test("Aplicar no modifica la coleccion original", () => {
    const filtro = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
    const examen = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    const correos = [examen, saludo]
    filtro.aplicar(correos)
    expect(correos).toEqual([examen, saludo])
})

const asuntoExamen = new Filtro("Examenes", (correo) => correo.getAsunto().includes("Examen"))
const cuerpoEntrega = new Filtro("Entrega", (correo) => correo.getCuerpo().includes("Entrega"))

test("AND evalua true solo cuando el correo cumple los dos filtros", () => {
    const ambos = new Correo("Examen final", "Entrega pendiente", exequiel, [martin])
    const soloAsunto = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const soloCuerpo = new Correo("Hola", "Entrega pendiente", exequiel, [martin])
    const filtro = asuntoExamen.and(cuerpoEntrega)
    
    expect(filtro.evaluar(ambos)).toBe(true)
    expect(filtro.evaluar(soloAsunto)).toBe(false)
    expect(filtro.evaluar(soloCuerpo)).toBe(false)
})

test("OR evalua true solo cuando el correo cumple al menos uno de los dos filtros", () => {
    const soloAsunto = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const soloCuerpo = new Correo("Hola", "Entrega pendiente", exequiel, [martin])
    const ninguno = new Correo("Hola", "Cuerpo", exequiel, [martin])
    const filtro = asuntoExamen.or(cuerpoEntrega)
    
    expect(filtro.evaluar(ninguno)).toBe(false)
    expect(filtro.evaluar(soloAsunto)).toBe(true)
    expect(filtro.evaluar(soloCuerpo)).toBe(true)
})

test("NOT invierte el resultado del filtro", () => {
    const examen = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    const filtro = asuntoExamen.not()
    
    expect(filtro.evaluar(examen)).toBe(false)
    expect(filtro.evaluar(saludo)).toBe(true)
})

test("Combinar filtros no modifica los filtros originales", () => {
    const examen = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    
    asuntoExamen.and(cuerpoEntrega)
    asuntoExamen.not()

    expect(asuntoExamen.evaluar(examen)).toBe(true)
    expect(asuntoExamen.getNombre()).toBe("Examenes")
})

test("Un filtro combinado se puede volver a combinar", () => {
    const examenSinEntrega = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const examenConEntrega = new Correo("Examen final", "Entrega pendiente", exequiel, [martin])
    const filtro = asuntoExamen.and(cuerpoEntrega.not())
    
    expect(filtro.evaluar(examenSinEntrega)).toBe(true)
    expect(filtro.evaluar(examenConEntrega)).toBe(false)
})