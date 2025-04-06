import { Libro } from '../model/Libro';
import { Usuario } from '../model/Usuario';
import { Prestamo } from '../model/Prestamo';
import { FormatDates } from '../utils/FormatDates';

/* 
 @class Libreria
* @Param {Libro[]} libros - Arreglo de libros registrados en la biblioteca.
* @Param {Usuario[]} usuarios - Arreglo de usuarios registrados en la biblioteca.
* @Param {Prestamo[]} prestamos - Arreglo de prestamos registrados en la biblioteca.
* @Method registrarLibro(libro: Libro): void - Registra un nuevo libro en la biblioteca.
* @Method registrarUsuario(usuario: Usuario): void - Registra un nuevo usuario en la biblioteca.
* @Method prestarLibro(codigoLibro: string, idUsuario: string): boolean - Presta un libro a un usuario.
* @Method devolverLibro(codigoLibro: string, idUsuario: string): boolean - Devuelve un libro prestado.
* @Method listarLibros(): Libro[] - Lista todos los libros registrados en la biblioteca.
* @Method listarUsuarios(): Usuario[] - Lista todos los usuarios registrados en la biblioteca.
* @Method listarPrestamos(): Prestamo[] - Lista todos los prestamos registrados en la biblioteca.
 */
export class Libreria {
  // Arreglos para almacenar libros, usuarios y prestamos
  private libros: Libro[] = [];
  private usuarios: Usuario[] = [];
  private prestamos: Prestamo[] = [];

  /// @params {Libro} libro - Objeto de tipo Libro que representa el libro a registrar.
  registrarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

  /// @params {Usuario} usuario - Objeto de tipo Usuario que representa el usuario a registrar.
  registrarUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  /// @params {string} codigoLibro - Codigo del libro a prestar.
  /// @params {string} idUsuario - ID del usuario que solicita el prestamo.
  /// @returns {boolean} - Retorna true si el prestamo fue exitoso, false en caso contrario.
  prestarLibro(codigoLibro: string, idUsuario: string): boolean {
    // Busca el libro y el usuario por su codigo e id respectivamente
    const libro = this.libros.find(l => l.codigo === codigoLibro && l.disponible);
    // Busca el usuario por su id
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);

    if (!libro || !usuario) return false;

    // Verifica si el libro está disponible para prestamo
    libro.disponible = false;
    // Agrega el libro a la lista de libros prestados del usuario
    usuario.prestarLibro(libro);
    // Crea un nuevo prestamo y lo agrega a la lista de prestamos
    // Se utiliza la clase FormatDates para obtener la fecha actual en formato timestamp
    this.prestamos.push(new Prestamo(libro, usuario, new FormatDates(new Date()).getTimeStamp()));

    return true;
  }

  /// @params {string} codigoLibro - Codigo del libro a devolver.
  /// @params {string} idUsuario - ID del usuario que solicita la devolucion.
  /// @returns {boolean} - Retorna true si la devolucion fue exitosa, false en caso contrario.
  devolverLibro(codigoLibro: string, idUsuario: string): boolean {
    // Busca el libro y el usuario por su codigo e id respectivamente
    const libro = this.libros.find(l => l.codigo === codigoLibro);
    // Busca el usuario por su id
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);

    // Verifica si el libro y el usuario existen
    if (!libro || !usuario) return false;

    // Marca el libro como disponible
    libro.disponible = true;
    usuario.devolverLibro(codigoLibro);

    // Busca el prestamo correspondiente al libro y usuario
    const prestamo = this.prestamos.find(p =>
      p.libro.codigo === codigoLibro && p.usuario.idUsuario === idUsuario && !p.fechaDevolucion
    );
    // Si se encuentra el prestamo, se actualiza la fecha de devolucion
    if (prestamo) prestamo.fechaDevolucion = new FormatDates(new Date()).getTimeStamp();  

    return true;
  }

  /// @returns {Libro[]} - Retorna un arreglo con todos los libros registrados en la biblioteca.
  listarLibros(): Libro[] {
    return this.libros;
  }

  /// @returns {Usuario[]} - Retorna un arreglo con todos los usuarios registrados en la biblioteca.
  listarUsuarios(): Usuario[] {
    return this.usuarios;
  }

  /// @returns {Prestamo[]} - Retorna un arreglo con todos los prestamos registrados en la biblioteca.
  listarPrestamos(): Prestamo[] {
    return this.prestamos;
  }
}
