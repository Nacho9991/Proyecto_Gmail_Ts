import { test, expect } from "vitest"
import { Contacto } from "../src/Contacto"
import { Correo } from "../src/Correo"
import { Filtro } from "../src/Filtro"
import { GestorDeCorreos } from "../src/GestorDeCorreos"
import { NombreBandeja } from "../src/NombreBandeja"
import { Predicados } from "../src/Predicados"

const exequiel = new Contacto("Exequiel", "exequiel@edu.ar")
const martin = new Contacto("Martin", "martin@edu.ar")

// RF-09: Gestion de correos favoritos
test("Un correo se puede marcar como favorito", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    expect(correo.esFavorito()).toBe(false)
    correo.marcarFavorito()

    expect(correo.esFavorito()).toBe(true)
})

test("Un correo favorito se puede desmarcar", () => {
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    correo.marcarFavorito()
    correo.desmarcarFavorito()

    expect(correo.esFavorito()).toBe(false)
})

test("Los favoritos se consultan sin importar la bandeja de origen", () => {
    const gestor = new GestorDeCorreos()
    const favoritoEntrada = new Correo("Uno", "Cuerpo", exequiel, [martin])
    const favoritoEnviado = new Correo("Dos", "Cuerpo", exequiel, [martin])
    const comun = new Correo("Tres", "Cuerpo", exequiel, [martin])

    gestor.agregar(favoritoEntrada, NombreBandeja.ENTRADA)
    gestor.agregar(comun, NombreBandeja.ENTRADA)
    gestor.agregar(favoritoEnviado, NombreBandeja.ENVIADOS)
    favoritoEntrada.marcarFavorito()
    favoritoEnviado.marcarFavorito()

    expect(gestor.consultarFavoritos()).toEqual([favoritoEntrada, favoritoEnviado])
})

test("Marcar un correo como favorito no lo mueve de su bandeja", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    gestor.agregar(correo, NombreBandeja.ENTRADA)
    correo.marcarFavorito()

    expect(gestor.consultar(NombreBandeja.ENTRADA)).toEqual([correo])
    expect(gestor.consultar(NombreBandeja.ENVIADOS)).toEqual([])
})

test("Un correo desmarcado deja de aparecer en favoritos", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    gestor.agregar(correo, NombreBandeja.ENTRADA)
    correo.marcarFavorito()
    correo.desmarcarFavorito()

    expect(gestor.consultarFavoritos()).toEqual([])
})

test("Un favorito aparece una sola vez aunque se intente agregar de nuevo", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])
    correo.marcarFavorito()

    expect(gestor.agregar(correo, NombreBandeja.ENTRADA)).toBe(true)
    expect(gestor.agregar(correo, NombreBandeja.ENVIADOS)).toBe(false)
    expect(gestor.consultarFavoritos()).toHaveLength(1)
})

test("Un favorito eliminado no aparece hasta restaurarlo y conserva su indicador", () => {
    const gestor = new GestorDeCorreos()
    const correo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    gestor.agregar(correo, NombreBandeja.ENTRADA)
    correo.marcarFavorito()

    expect(gestor.eliminar(correo.getId())).toBe(true)
    expect(gestor.consultarFavoritos()).toEqual([])
    expect(correo.esFavorito()).toBe(true)

    expect(gestor.restaurar(correo.getId())).toBe(true)
    expect(gestor.consultarFavoritos()).toEqual([correo])
})

test("Se pueden combinar filtros para buscar dentro de los favoritos", () => {
    const gestor = new GestorDeCorreos()
    const examen = new Correo("Examen final", "Cuerpo", exequiel, [martin])
    const saludo = new Correo("Hola", "Cuerpo", exequiel, [martin])

    gestor.agregar(examen, NombreBandeja.ENTRADA)
    gestor.agregar(saludo, NombreBandeja.ENTRADA)
    examen.marcarFavorito()
    saludo.marcarFavorito()
    
    const filtro = new Filtro("Asunto Examen", Predicados.asuntoContiene("Examen"))

    expect(filtro.aplicar(gestor.consultarFavoritos())).toEqual([examen])
})

test("Sin favoritos la consulta devuelve una coleccion vacia", () => {
    const gestor = new GestorDeCorreos()
    gestor.agregar(new Correo("Hola", "Cuerpo", exequiel, [martin]), NombreBandeja.ENTRADA)

    expect(gestor.consultarFavoritos()).toEqual([])
})