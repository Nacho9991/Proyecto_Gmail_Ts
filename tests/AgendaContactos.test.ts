import { describe, test, expect } from "vitest"
import { AgendaContactos } from "../src/AgendaContactos"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"

const exequiel = new Contacto("Exequiel Zeballos", "exequiel@edu.ar")
const martin = new Contacto("Martin Palermo", "martin@edu.ar")
const invalido = new Contacto("Mal", "no-es-un-mail")

// RF-03: Gestion de contactos
describe("AgendaContactos", () => {
    test("inicia sin contactos", () => {
        const agenda = new AgendaContactos()
        expect(agenda.getContactos()).toHaveLength(0)
    })

    test("agrega un contacto valido", () => {
        const agenda = new AgendaContactos()
        expect(agenda.agregar(exequiel)).toBe(true)
        expect(agenda.getContactos()).toHaveLength(1)
    })

    test("no agrega un contacto invalido", () => {
        const agenda = new AgendaContactos()
        expect(agenda.agregar(invalido)).toBe(false)
        expect(agenda.getContactos()).toHaveLength(0)
    })

    test("no agrega dos contactos con el mismo email", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        expect(agenda.agregar(new Contacto("Otro Nombre", "EXEQUIEL@edu.ar"))).toBe(false)
        expect(agenda.getContactos()).toHaveLength(1)
    })

    test("consulta un contacto por su email sin importar mayusculas", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        expect(agenda.buscarPorEmail("exequiel@edu.ar")).toBe(exequiel)
        expect(agenda.buscarPorEmail("  EXEQUIEL@edu.ar ")).toBe(exequiel)
    })

    test("devuelve undefined si el email no está en la agenda", () => {
        const agenda = new AgendaContactos()
        expect(agenda.buscarPorEmail("nadie@edu.ar")).toBeUndefined()
    })

    test("modifica un contacto existente cambiando su email", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        const nuevo = new Contacto("Exequiel Z.", "exe@edu.ar")
        expect(agenda.modificar("exequiel@edu.ar", nuevo)).toBe(true)
        expect(agenda.buscarPorEmail("exe@edu.ar")).toBe(nuevo)
        expect(agenda.buscarPorEmail("exequiel@edu.ar")).toBeUndefined()
        expect(agenda.getContactos()).toHaveLength(1)
    })

    test("modifica solo el nombre manteniendo el email", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        const nuevo = new Contacto("Exequiel Z.", "exequiel@edu.ar")
        expect(agenda.modificar("exequiel@edu.ar", nuevo)).toBe(true)
        expect(agenda.buscarPorEmail("exequiel@edu.ar")).toBe(nuevo)
    })

    test("no modifica un contacto que no existe", () => {
        const agenda = new AgendaContactos()
        const nuevo = new Contacto("Nuevo", "nuevo@edu.ar")
        expect(agenda.modificar("nadie@edu.ar", nuevo)).toBe(false)
    })

    test("no modifica si el nuevo email ya pertenece a otro contacto", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        agenda.agregar(martin)
        const nuevo = new Contacto("Exe", "martin@edu.ar")
        expect(agenda.modificar("exequiel@edu.ar", nuevo)).toBe(false)
        expect(agenda.buscarPorEmail("exequiel@edu.ar")).toBe(exequiel)
    })

    test("elimina un contacto existente", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        expect(agenda.eliminar("exequiel@edu.ar")).toBe(true)
        expect(agenda.getContactos()).toHaveLength(0)
    })

    test("eliminar un email que no existe devuelve false", () => {
        const agenda = new AgendaContactos()
        expect(agenda.eliminar("nadie@edu.ar")).toBe(false)
    })

    test("eliminar un contacto no afecta a los correos que lo usan", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        agenda.agregar(martin)
        const c = new Correo("Examen", "Hola", exequiel, [martin])
        agenda.eliminar("exequiel@edu.ar")
        expect(c.getRemitente()).toBe(exequiel)
        expect(c.esValido()).toBe(true)
    })

    test("cambiar la lista que devuelve getContactos no modifica la agenda", () => {
        const agenda = new AgendaContactos()
        agenda.agregar(exequiel)
        const lista = agenda.getContactos() as Contacto[]
        lista.push(martin)
        expect(agenda.getContactos()).toHaveLength(1)
    })
})