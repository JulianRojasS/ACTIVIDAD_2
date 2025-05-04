import { Libro } from './Libro';
import { Cliente } from './Cliente';

/* 
Clase Prestamo que representa un préstamo de un libro a un cliente.
*
* @param {Libro} libro - El libro que se está prestando.
* @param {Cliente} cliente - El cliente que está tomando el libro prestado.
* @param {string} fechaPrestamo - La fecha en la que se realiza el préstamo.
* @param {string} [fechaDevolucion] - La fecha en la que se devuelve el libro. Opcional.
* 
*/

export class Prestamo {
  constructor(
    public libro: Libro,
    public cliente: Cliente,
    public fechaPrestamo: string,
    public fechaDevolucion?: string
  ) {}
}
