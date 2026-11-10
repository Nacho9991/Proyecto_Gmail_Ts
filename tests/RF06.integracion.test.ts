import { test, expect } from "vitest"
import { AgendaContactos } from "../src/AgendaContactos"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"

test("RF-06: agenda, correo, eliminacion y restauracion conserve el mensaje historico", () => {
    const agenda = new AgendaContactos()
    const gio = new Contacto("Giovanni Vanni", "gio@example.com")
    const nacho = new Contacto("Ignacio Cremona", "nacho@example.com")
    expect(agenda.agregar(gio)).toBe(true)
    expect(agenda.agregar(nacho)).toBe(true)

    const correo = new Correo("Integracion", "Prueba RF-06", gio, [nacho])
    const gestor = new GestorDeCorreos()
    expect(gestor.agregar(correo, NombreBandeja.ENTRADA)).toBe(true)
    expect(gestor.eliminar(correo.getId())).toBe(true)
    expect(agenda.eliminar(gio.getEmail())).toBe(true)
    expect(gestor.restaurar(correo.getId())).toBe(true)

    const restaurado = gestor.consultar(NombreBandeja.ENTRADA)[0]
    expect(restaurado).toBe(correo)
    expect(restaurado.getRemitente()).toBe(gio)
    expect(restaurado.getDestinatarios()).toEqual([nacho])
    expect(restaurado.getAsunto()).toBe("Integracion")
    expect(restaurado.getCuerpo()).toBe("Prueba RF-06")
    expect(restaurado.estaLeido()).toBe(false)
    expect(restaurado.esFavorito()).toBe(false)
    expect(gestor.consultar(NombreBandeja.ELIMINADOS)).toEqual([])
})
