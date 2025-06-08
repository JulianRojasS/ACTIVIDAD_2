import { BinaryTree } from '../structures/TreeNode';
import { Libro } from '../model/Libro';
import { Cliente } from '../model/Cliente';
import { Prestamo } from '../model/Prestamo';
import { FormatDates } from '../utils/FormatDates';
import { Graph } from '../structures/Graph'; // <-- Importa el grafo

type PrestamoEdgeInfo = {
  fechaPrestamo: string;
  fechaDevolucion?: string | null;
  libro: Libro; // Aquí guardas el objeto completo del libro
  cliente: Cliente; // Aquí guardas el objeto completo del cliente
};

/* 
 @class Libreria
* @Param {BinaryTree<Libro>} libros - Árbol binario de libros registrados en la biblioteca.
* @Param {Cliente[]} clientes - Arreglo de clientes registrados en la biblioteca.
* @Param {Prestamo[]} prestamos - Arreglo de prestamos registrados en la biblioteca.
* @Method registrarLibro(libro: Libro): void - Registra un nuevo libro en la biblioteca.
* @Method buscarLibro(codigoLibro: string): Libro | null - Busca un libro por su código en la biblioteca.
* @Method registrarCliente(cliente: Cliente): void - Registra un nuevo cliente en la biblioteca.
* @Method prestarLibro(codigoLibro: string, idCliente: string): boolean - Presta un libro a un cliente.
* @Method devolverLibro(codigoLibro: string, idCliente: string): boolean - Devuelve un libro prestado.
* @Method listarClientes(): Cliente[] - Lista todos los clientes registrados en la biblioteca.
* @Method listarPrestamos(): Prestamo[] - Lista todos los prestamos registrados en la biblioteca.
 */
export class Libreria {
  // Estructuras para almacenar libros, clientes y prestamos
  private libros: BinaryTree<Libro> = new BinaryTree<Libro>();
  private clientes: Cliente[] = [];
  private prestamos: Prestamo[] = [];
  private prestamosGraph: Graph<string, PrestamoEdgeInfo> = new Graph<string, PrestamoEdgeInfo>(); // <-- Grafo para préstamos

  /// @params {Libro} libro - Objeto de tipo Libro que representa el libro a registrar.
  registrarLibro(libro: Libro): void {
    // Verifica si el libro ya existe en la biblioteca
    this.libros.insert(libro, (a, b) => a.codigo.localeCompare(b.codigo));
  }

  /// @params {string} codigoLibro - Código del libro as buscar.
  /// @returns {Libro | null} - Retorna el libro encontrado o null si no existe.
  buscarLibro(codigoLibro: string): Libro | null {
    return this.libros.search({ codigo: codigoLibro } as Libro, (a, b) => a.codigo.localeCompare(b.codigo));
  }

  /// Buscar cliente por ID
  /// @params {string} idCliente - ID del cliente a buscar.
  /// @returns {Cliente | null} - Retorna el cliente encontrado o null si no existe.
  buscarCliente(idCliente: string): Cliente | null {
    return this.clientes.find(cliente => cliente.idCliente === idCliente) || null;
  }

  /// @params {Cliente} cliente - Objeto de tipo Cliente que representa el cliente a registrar.
  registrarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  /// Metodo para eliminar un cliente de la biblioteca.
  /// @params {string} idCliente - ID del cliente a buscar.
  eliminarCliente(idCliente: string): void {
    const index = this.clientes.findIndex(cliente => cliente.idCliente === idCliente);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      this.prestamosGraph.removeVertex(idCliente); // Elimina también del grafo
    }
  }

  /// @params {string} codigoLibro - Código del libro a prestar.
  /// @params {string} idCliente - ID del cliente que solicita el préstamo.
  /// @returns {boolean} - Retorna true si el préstamo fue exitoso, false en caso contrario.
  prestarLibro(codigoLibro: string, idCliente: string): boolean {
    const libro = this.buscarLibro(codigoLibro);
    const cliente = this.clientes.find(u => u.idCliente === idCliente);

    if (!libro || !cliente || !libro.disponible) return false;

    libro.disponible = false;
    cliente.prestarLibro(libro);
    const fechaPrestamo = new FormatDates(new Date()).getTimeStamp();
    this.prestamos.push(new Prestamo(libro, cliente, fechaPrestamo));

    // Agrega el préstamo al grafo
    this.prestamosGraph.addEdge(idCliente, codigoLibro, {
      fechaPrestamo,
      fechaDevolucion: null,
      libro,
      cliente,
    });

    return true;
  }

  /// @params {string} codigoLibro - Código del libro a devolver.
  /// @params {string} idCliente - ID del cliente que solicita la devolución.
  /// @returns {boolean} - Retorna true si la devolución fue exitosa, false en caso contrario.
  devolverLibro(codigoLibro: string, idCliente: string): boolean {
    const libro = this.buscarLibro(codigoLibro);
    const cliente = this.clientes.find(u => u.idCliente === idCliente);

    if (!libro || !cliente) return false;

    libro.disponible = true;
    cliente.devolverLibro(codigoLibro);

    const prestamo = this.prestamos.find(p =>
      p.libro.codigo === codigoLibro && p.cliente.idCliente === idCliente && !p.fechaDevolucion
    );
    const fechaDevolucion = new FormatDates(new Date()).getTimeStamp();
    if (prestamo) prestamo.fechaDevolucion = fechaDevolucion;

    // Actualiza la arista en el grafo con la fecha de devolución
    const edgeInfo = this.prestamosGraph.getEdgeInfo(idCliente, codigoLibro);
    if (edgeInfo) {
      edgeInfo.fechaDevolucion = fechaDevolucion;
      this.prestamosGraph.addEdge(idCliente, codigoLibro, edgeInfo); // Actualiza la arista
    }

    // Si solo quieres préstamos activos, puedes eliminar la arista:
    // this.prestamosGraph.removeEdge(idCliente, codigoLibro);

    return true;
  }

  // Consulta: Libros prestados por un cliente
  /// @params {string} idCliente - ID del cliente a consultar.
  /// @returns {string[]} - Retorna un arreglo con los códigos de los libros prestados por el cliente.
  librosPrestadosPorCliente(idCliente: string): PrestamoEdgeInfo[] {
    const codigosLibros = this.prestamosGraph.getNeighbors(idCliente);
    return codigosLibros
      .map(codigoLibro => this.prestamosGraph.getEdgeInfo(idCliente, codigoLibro))
      .filter((info): info is PrestamoEdgeInfo => !!info); // Filtra posibles undefined
  }

  // Consulta: Quién tiene un libro prestado (retorna info completa del préstamo)
  clienteQueTieneLibro(codigoLibro: string): { idCliente: string, info: PrestamoEdgeInfo }[] {
    return this.prestamosGraph.getVertices()
      .filter(idCliente => this.prestamosGraph.getNeighbors(idCliente).includes(codigoLibro))
      .map(idCliente => ({
        idCliente,
        info: this.prestamosGraph.getEdgeInfo(idCliente, codigoLibro)!
      }));
  }

  /// @returns {Cliente[]} - Retorna un arreglo con todos los clientes registrados en la biblioteca.
  listarClientes(): Cliente[] {
    return this.clientes;
  }

  /// @returns {Prestamo[]} - Retorna un arreglo con todos los préstamos registrados en la biblioteca.
  listarPrestamos(): Prestamo[] {
    return this.prestamos;
  }

  /// @returns {Libro[]} - Retorna un arreglo con todos los libros registrados en la biblioteca.
  listarLibros(): Libro[] {
    return this.libros.list()
  }
}
