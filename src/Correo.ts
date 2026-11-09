import {Contacto} from "./Contacto"

export class Correo {
    private static siguienteId: number = 1
    private readonly id: number
    private readonly asunto: string
    private readonly cuerpo: string
    private readonly remitente: Contacto
    private readonly destinatarios: Contacto[]
    private leido: boolean = false
    private favorito: boolean = false

    constructor(asunto: string, cuerpo: string, remitente: Contacto, destinatarios: Contacto[]) {
       this.id = Correo.siguienteId++ // significa sumarle 1 al valor que tiene la variable 
       this.asunto = asunto.trim() // borra los espacios en blanco que esten en el string
       this.cuerpo = cuerpo
       this.remitente = remitente
       this.destinatarios = [...destinatarios] //sirve para crear una copia exacta del array original en un lugar nuevo de la memoria
    }

    getId(): number {
        return this.id
    }

    getAsunto(): string{
        return this.asunto
    }

    getCuerpo(): string{
        return this.cuerpo
    }

    getRemitente(): Contacto {
        return this.remitente
    }

    getDestinatarios(): ReadonlyArray<Contacto>{
        return [...this.destinatarios]
    }
    
    estaLeido(): boolean {
        return this.leido
    }

    marcarLeido(): void {
        this.setLeido(true)
    }

    private setLeido(leido: boolean): void {
        this.leido = leido
    }

    esFavorito(): boolean {
        return this.favorito
    }

    esValido(): boolean {
        const asuntoValido = this.getAsunto().length > 0
        const remitenteValido = this.getRemitente().esValido()
        const hayDestinatarios = this.getDestinatarios().length > 0
        const destinatariosValidos = this.getDestinatarios().every((d) => d.esValido())
        return asuntoValido && remitenteValido && hayDestinatarios && destinatariosValidos
    }

}
