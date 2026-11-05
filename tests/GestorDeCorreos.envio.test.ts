import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

//RF-02: Envio de correos

test("Enviar un correo valido lo deja en Enviados", () => {
    const gestor = new GestorDeCorreos()
    const exequiel = new Contacto("Exequiel", "exequiel@edu.ar")
    const martin = new Contacto("Martin", "martin@edu.ar")
    const correo = new Correo("Hola", "Cuerpo",exequiel,[martin])
})


