import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Filtro } from "../src/Filtro"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { GestorDeFiltros } from "../src/GestorDeFiltros"
import { NombreBandeja } from "../src/NombreBandeja"
import { Predicados } from "../src/Predicados"

const profe = new Contacto("Profe", "profe@ucp.edu.ar")
const exequiel = new Contacto("Exequiel", "exequiel@edu.ar")
const martin = new Contacto("Martin", "martin@edu.ar")

const crearFiltro = (nombre: string) => new Filtro(nombre, () => true)

// RF-05: Creacion y aplicacion de filtros personalizados
test("Registrar un filtro valido lo guarda en el gestor", () => {
    const gestor = new GestorDeFiltros()
    const filtro = crearFiltro("Filtro 1")
    expect(gestor.registrar(filtro)).toBe(true)
    expect(gestor.getFiltros()).toEqual([filtro])
})

test("No se puede registrar un filtro con un nombre repetido", () => {
    const gestor = new GestorDeFiltros()
    gestor.registrar(crearFiltro("Filtro 1"))
    expect(gestor.registrar(crearFiltro("Filtro 1"))).toBe(false)
    expect(gestor.getFiltros()).toHaveLength(1)
})

test("no se puede registrar un filtro con nombre vacio", () => {
    const gestor = new GestorDeFiltros()
    expect(gestor.registrar(crearFiltro("   "))).toBe(false)
    expect(gestor.getFiltros()).toEqual([])
})

test("Se pueden registrar hasta cinco filtros y el sexto se rechaza", () => {
    const gestor = new GestorDeFiltros()
    expect(gestor.registrar(crearFiltro("Filtro 1"))).toBe(true)
    expect(gestor.registrar(crearFiltro("Filtro 2"))).toBe(true)
    expect(gestor.registrar(crearFiltro("Filtro 3"))).toBe(true)
    expect(gestor.registrar(crearFiltro("Filtro 4"))).toBe(true)
    expect(gestor.registrar(crearFiltro("Filtro 5"))).toBe(true)
    expect(gestor.registrar(crearFiltro("Filtro 6"))).toBe(false)
    expect(gestor.getFiltros()).toHaveLength(5)
})

test("Obtener devuelve el filtro registrado con ese nombre", () => {
    const gestor = new GestorDeFiltros()
    const filtro = crearFiltro("Filtro 1")
    gestor.registrar(filtro)
    expect(gestor.obtener("Filtro 1")).toBe(filtro)
})

test("Obtener devuelve undefined cuando el filtro no existe", () => {
    const gestor = new GestorDeFiltros()
    expect(gestor.obtener("Inexistente")).toBeUndefined()
})

test("Aplicar usa el filtro registrado sobre una coleccion de correos", () => {
    const gestor = new GestorDeFiltros()
    gestor.registrar(new Filtro("Examenes", Predicados.asuntoContiene("Examen")))
    const examen = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(gestor.aplicar("Examenes", [examen, saludo])).toEqual([examen])
})

test("Aplicar con un nombre inexistente devuelve una coleccion vacia", () => {
    const gestor = new GestorDeFiltros()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(gestor.aplicar("Inexistente", [correo])).toEqual([])
})

test("Un mismo filtro se puede aplicar sobre distintas bandejas", () => {
    const gestor = new GestorDeFiltros()
    gestor.registrar(new Filtro("Examenes", Predicados.asuntoContiene("Examen")))
    const bandejas = new GestorDeCorreos()
    const examenRecibido = new Correo("Examen final", "Cuerpo", profe, [martin])
    const examenEnviado = new Correo("Examen parcial", "Cuerpo", exequiel, [martin])
    bandejas.agregar(examenRecibido, NombreBandeja.ENTRADA)
    bandejas.agregar(examenEnviado, NombreBandeja.ENVIADOS)
    expect(gestor.aplicar("Examenes", bandejas.consultar(NombreBandeja.ENTRADA))).toEqual([examenRecibido])
    expect(gestor.aplicar("Examenes", bandejas.consultar(NombreBandeja.ENVIADOS))).toEqual([examenEnviado])
})

test("Modificar la coleccion devuelta no afecta los filtros registrados", () => {
    const gestor = new GestorDeFiltros()
    gestor.registrar(crearFiltro("Filtro 1"))
    const copia = gestor.getFiltros() as Filtro[]
    copia.push(crearFiltro("Intruso"))
    expect(gestor.getFiltros()).toHaveLength(1)
})