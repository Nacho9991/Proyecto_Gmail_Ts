import { describe, test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"

const exequiel = new Contacto("Exequiel Zeballos", "exequiel@edu.ar")
const martin = new Contacto("Martin Palermo", "martin@edu.ar")
const roberto = new Contacto("Roberto Abbondanzieri", "pato@edu.ar")
const invalido = new Contacto("Mal", "no-es-un-mail")


//RF-01: Creacion de correos electronicos
describe("Correo", () => {

    
    test("guarda el asunto, el cuerpo, el remitente y los destinatrios", () => {
        const c = new Correo ("Examen", "El examen es el viernes 13", exequiel,[martin,roberto])
            expect(c.getAsunto()).toBe("Examen")
            expect(c.getCuerpo()).toBe("El examen es el viernes 13")
            expect(c.getRemitente()).toBe(exequiel)
            expect(c.getDestinatarios()).toEqual([martin,roberto])
        
    })


    test("Un correo nuevo no esta leido y no esta en favoritos", () => {
        const c = new Correo ("Examen", "Hola", exequiel,[martin])
            expect(c.estaLeido()).toBe(false)
            expect(c.esFavorito()).toBe(false)
    })


    test("Cada correo tiene un id distinto", () => {
        const c1 = new Correo ("Uno", "Hola", exequiel,[martin])
        const c2 = new Correo ("Uno", "Hola", exequiel,[martin])
        expect(c1.getId()).not.toBe(c2.getId())
    })

    test("Se pueden crear correos con distintos remitentes y destinatarios", () => {
        const c1 = new Correo ("Uno", "Hola", exequiel,[martin])
        const c2 = new Correo ("Dos", "Chau", martin,[martin, exequiel])
        expect(c1.getRemitente()).toBe(exequiel)
        expect(c2.getRemitente()).toBe(martin)
        expect(c1.getDestinatarios()).toHaveLength(1) // verifica cuantos elementos tiene el array
        expect(c2.getDestinatarios()).toHaveLength(2)
    })

    test("Cada correo tiene un id distinto", () => {
        const c1 = new Correo ("Uno", "Hola", exequiel,[martin])
        const c2 = new Correo ("Uno", "Hola", exequiel,[martin])
        expect(c1.getId()).not.toBe(c2.getId())
    })

    test("Con datos correctos es valido", () => {
        expect(new Correo("Uno","Hola", exequiel,[martin]).esValido()).toBe(true)
    })

    test("sin asunto no es valido", () => {
        expect(new Correo("","Hola", exequiel,[martin]).esValido()).toBe(false)
    })

    test("Sin destinatarios no es valido", () => {
        expect(new Correo("Uno","Hola", exequiel,[]).esValido()).toBe(false)
    })

    test("Con un remitente invalido no es valido", () => {
        expect(new Correo("Uno","Hola", invalido,[martin]).esValido()).toBe(false)
    })

    test("Con un destinatario invalido no es valido", () => {
        expect(new Correo("Uno","Hola", exequiel,[martin,invalido]).esValido()).toBe(false)
    })

    test("Cambiar la lista original no modifica los destinatarios del correo", () => {
        const lista = [martin]
        const c = new Correo("Uno", "Hola", exequiel, lista)
        lista.push(roberto)
        expect(c.getDestinatarios()).toHaveLength(1)
    })

    test("Cambiar la lsita que devuelve los destinatarios no modifica el correo", () => {
        const c = new Correo("Uno","Hola", exequiel,[martin])
        const lista = c.getDestinatarios() as Contacto[] //Le avisa a TS que es un array mutable para poder usar .push()
        lista.push(roberto)
        expect(c.getDestinatarios()).toHaveLength(1)
    })

})