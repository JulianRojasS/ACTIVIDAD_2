import { Libro } from './Libro';
import { Usuario } from './Usuario';

/* 
Clase Prestamo que representa un préstamo de un libro a un usuario.
*
* @param {Libro} libro - El libro que se está prestando.
* @param {Usuario} usuario - El usuario que está tomando el libro prestado.
* @param {string} fechaPrestamo - La fecha en la que se realiza el préstamo.
* @param {string} [fechaDevolucion] - La fecha en la que se devuelve el libro. Opcional.
* 
*/

export class Prestamo {
  constructor(
    public libro: Libro,
    public usuario: Usuario,
    public fechaPrestamo: string,
    public fechaDevolucion?: string
  ) {}
}
