import { Libro } from './Libro';

/* 
Clase Cliente que representa un cliente de la biblioteca.
* @param {string} idCliente - El ID del cliente.
* @param {string} nombre - El nombre del cliente.
* @param {Libro[]} librosPrestados - Lista de libros prestados por el cliente.
*   Por defecto es un array vacío.
*/
export class Cliente {
  public librosPrestados: Libro[] = [];

  constructor(
    public idCliente: string,
    public nombre: string
  ) {}

  /** Método para prestar un libro al cliente.
   * @param {Libro} libro - El libro que se va a prestar.
   */
  prestarLibro(libro: Libro): void {
    this.librosPrestados.push(libro);
  }

  /** Método para devolver un libro prestado por el cliente.
   * @param {string} codigoLibro - El código del libro que se va a devolver.
   */
  devolverLibro(codigoLibro: string): void {
    this.librosPrestados = this.librosPrestados.filter(libro => libro.codigo !== codigoLibro);
  }
}
