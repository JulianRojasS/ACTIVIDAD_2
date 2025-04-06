import { Libro } from './Libro';

/* 
Clase Usuario que representa un usuario de la biblioteca.
* @param {string} idUsuario - El ID del usuario.
* @param {string} nombre - El nombre del usuario.
* @param {Libro[]} librosPrestados - Lista de libros prestados por el usuario.
*   Por defecto es un array vacío.
*/
export class Usuario {
  public librosPrestados: Libro[] = [];

  constructor(
    public idUsuario: string,
    public nombre: string
  ) {}

  /** Método para prestar un libro al usuario.
   * @param {Libro} libro - El libro que se va a prestar.
   */
  prestarLibro(libro: Libro): void {
    this.librosPrestados.push(libro);
  }

  /** Método para devolver un libro prestado por el usuario.
   * @param {string} codigoLibro - El código del libro que se va a devolver.
   */
  devolverLibro(codigoLibro: string): void {
    this.librosPrestados = this.librosPrestados.filter(libro => libro.codigo !== codigoLibro);
  }
}
