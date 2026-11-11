import { test, expect } from "vitest"
import { Buscador } from "../src/Buscador"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

const profe = new Contacto("Profe Lopez", "profe@ucp.edu.ar")
const exequiel = new Contacto("Exequiel", "exequiel@ucp.edu.ar")
const martin = new Contacto("Martin", "martin@ucp.edu.ar")
const buscador = new Buscador()

//RF-04: Busqueda de correos
test("Busca por coincidencia en el asunto", () => {
    const examen = new Correo("Examen final", "Cuerpo", profe, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    
    expect(buscador.buscar("Examen", [examen, saludo])).toEqual([examen])
})

test("Busca por coincidencia en el contenido", () => {
    const aviso = new Correo("Aviso", "Entrega del trabajo", exequiel, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    
    expect(buscador.buscar("entrega", [aviso, saludo])).toEqual([aviso])
})

test("Busca por el nombre del remitente", () => {
    const delProfe = new Correo("Hola", "Cuerpo", profe, [martin])
    const deExequiel = new Correo("Hola", "Cuerpo", exequiel, [martin])
    
    expect(buscador.buscar("lopez", [delProfe, deExequiel])).toEqual([delProfe])
})

test("Busca por el email del remitente", () => {
    const delProfe = new Correo("Hola", "Cuerpo", profe, [martin])
    const deExequiel = new Correo("Hola", "Cuerpo", exequiel, [martin])
    
    expect(buscador.buscar("profe@ucp.edu.ar", [delProfe, deExequiel])).toEqual([delProfe])
})

test("Busca por el nombre de un destinatario", () => {
    const paraProfe = new Correo("Hola", "Cuerpo", exequiel, [profe])
    const paraMartin = new Correo("Hola", "Cuerpo", exequiel, [martin])
    
    expect(buscador.buscar("lopez", [paraProfe, paraMartin])).toEqual([paraProfe])
})

test("La busqueda no distingue mayusculas de minusculas", () => {
    const examen = new Correo("Examen Final", "Cuerpo", profe, [martin])
    
    expect(buscador.buscar("EXAMEN", [examen])).toEqual([examen])
})

test("La busqueda admite coincidencias parciales", () => {
    const examen = new Correo("Examen Final", "Cuerpo", profe, [martin])
    
    expect(buscador.buscar("xam", [examen])).toEqual([examen])
})

test("Un correo que coincide en varios campos aparece una sola vez", () => {
    const correo = new Correo("Mensaje de profe", "Hola profe", profe, [profe])
    
    expect(buscador.buscar("profe", [correo])).toHaveLength(1)
})

test("Sin coincidencias devuelve una coleccion vacia", () => {
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(buscador.buscar("zzz", [saludo])).toEqual([])
})

test("Buscar en una bandeja vacia devuelve una coleccion vacia", () => {
    expect(buscador.buscar("hola", [])).toEqual([])
})

test("Un texto vacio no devuelve resultados", () => {
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    expect(buscador.buscar("   ", [saludo])).toEqual([])
})

test("La busqueda no modifica los correos originales", () => {
    const examen = new Correo("Examen final", "Cuerpo", profe, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    const correos = [examen, saludo]
    buscador.buscar("examen", correos)

    expect(correos).toEqual([examen, saludo])
    expect(examen.getAsunto()).toBe("Examen final")
})

test("Busca solo dentro de la Bandeja de Entrada", () => {
    const gestor = new GestorDeCorreos()
    const recibido = new Correo("Examen final", "Cuerpo", profe, [martin])
    const enviado = new Correo("Examen parcial", "Cuerpo", exequiel, [martin])
    gestor.agregar(recibido, NombreBandeja.ENTRADA)
    gestor.agregar(enviado, NombreBandeja.ENVIADOS)

    expect(buscador.buscar("examen", gestor.consultar(NombreBandeja.ENTRADA))).toEqual([recibido])
})