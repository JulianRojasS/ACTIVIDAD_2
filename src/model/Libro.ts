/* 
Clase Libro que representa un libro en la biblioteca.
*
* @param {string} codigo - El código del libro.
* @param {string} titulo - El título del libro.
* @param {string} autor - El autor del libro.
* @param {boolean} disponible - Indica si el libro está disponible o no.
* Por defecto es true.
* 
*/

export class Libro {
  constructor(
    public codigo: string,
    public titulo: string,
    public autor: string,
    public disponible: boolean = true
  ) {}
}
