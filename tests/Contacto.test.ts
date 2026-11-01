import { describe, test, expect } from "vitest"
import {Contacto} from "../src/Contacto"

describe("Contacto", () => {
    test("guarda el nombre y el email", () => {
     const c = new Contacto ("Exequiel Zeballos","exequiel@edu.ar")
     expect(c.getNombre()).toBe("Exequiel Zeballos")
     expect(c.getEmail()).toBe("exequiel@edu.ar")
    })

    test("guarda el email en minusculas y sin espacios", () => {
     const c = new Contacto ("Exequiel","EXEQUIEL@edu.ar")
     expect(c.getEmail()).toBe("exequiel@edu.ar")
    })

    test("con datos correctos es valido", () => {
     expect(new Contacto("Exequiel","exequiel@edu.ar").esValido()).toBe(true)
    })

    test("con un email sin formato valido no es valido", () => {
     expect(new Contacto("Exequiel","no-es-un-mail").esValido()).toBe(false)
    })

    test("con nombre vacio no es valido", () => {
     expect(new Contacto(" ","exequiel@edu.ar").esValido()).toBe(false)
    })

    test("con un dominio que empieza con un punto no es valido", () => {
     expect(new Contacto("Exequiel","exequiel@.edu.ar").esValido()).toBe(false)
    })


})