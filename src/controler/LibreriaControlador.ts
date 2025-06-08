import { Request, Response } from "express";
import { Libreria } from "../service/Libreria";
import { Libro } from "../model/Libro";
import { Cliente } from "../model/Cliente";

export class LibreriaControlador {
  libreria: Libreria;

  constructor() {
    this.libreria = new Libreria();
  }

  // Renderiza la vista de inicio de sesion
  login = (req: Request, res: Response) => {
      res.render("pages/index", { error: null, layout: false });
  }

  // Renderiza la vista de la pagina principal y pasa los prestamos actuales
  home = (req: Request, res: Response) => {
    res.render("pages/home", {
      prestamos: this.libreria.listarPrestamos(),
    });
  };

  // Renderiza la vista de libros y pasa la lista de libros y prestamos actuales
  libros = (req: Request, res: Response) => {
    res.render("pages/libros", {
      libros: this.libreria.listarLibros(),
      prestamos: this.libreria.listarPrestamos(),
    });
  };

  libro = (req: Request, res: Response) => {
    const { codigoLibro } = req.params;
    // Renderiza la vista de un libro especifico y pasa sus datos
    const libro = this.libreria.buscarLibro(codigoLibro);
    const prestamos = this.libreria.clienteQueTieneLibro(codigoLibro);
    res.render("pages/libro", {
      libro,
      prestamos,
    });
  }

  // Permite registrar nuevos libros mediante un formulario
  crearLibro = (req: Request, res: Response) => {
    const { codigo, titulo, autor } = req.body;
    // Crea una nueva instancia de Libro y la registra en la libreria
    const libro = new Libro(codigo, titulo, autor);
    this.libreria.registrarLibro(libro);
    // Luego redirige a la pagina de libros
    res.redirect("/libros");
  };

  clientes = (req: Request, res: Response) => {
    // Renderiza la vista de clientes y pasa la lista de clientes y prestamos actuales
    // Listar los clientes y prestamos actuales
    res.render("pages/clientes", {
      clientes: this.libreria.listarClientes(),
      prestamos: this.libreria.listarPrestamos(),
    });
  };

  cliente = (req: Request, res: Response) => {
    const { idCliente } = req.params;
    // Renderiza la vista de un cliente especifico y pasa sus datos
    const cliente = this.libreria.buscarCliente(idCliente);
    const prestamos = this.libreria.librosPrestadosPorCliente(idCliente);
    res.render("pages/cliente", {
      cliente,
      prestamos,
    });
  }

  crearCliente = (req: Request, res: Response) => {
    const { idCliente, nombre } = req.body;
    // Crea una nueva instancia de Cliente y la registra en la libreria
    const cliente = new Cliente(idCliente, nombre);
    this.libreria.registrarCliente(cliente);
    // Luego redirige a la pagina de clientes
    res.redirect("/clientes");
  };

  crearPrestamo = (req: Request, res: Response) => {
    const { codigoLibro, idCliente } = req.body;
    /// Agrega un nuevo prestamo a la libreria
    this.libreria.prestarLibro(codigoLibro, idCliente);
    // Luego redirige a la pagina principal
    res.redirect("/home");
  };

  devolverLibro = (req: Request, res: Response) => {
    const { codigoLibro, idCliente } = req.body;
    // Devuelve un libro prestado
    this.libreria.devolverLibro(codigoLibro, idCliente);
    // Luego redirige a la pagina principal
    res.redirect("/home");
  };

  eliminarCliente = (req: Request, res: Response) => {
    const { idCliente } = req.params;
    // Elimina un cliente de la libreria
    this.libreria.eliminarCliente(idCliente);
    // Luego redirige a la pagina de clientes
    res.redirect("/clientes");
  };

  // Consulta: Libros prestados por un cliente (usando el grafo)
  librosPrestadosPorCliente = (req: Request, res: Response) => {
    const { idCliente } = req.params;
    const libros = this.libreria.librosPrestadosPorCliente(idCliente);
    res.json(libros);
  };

  // Consulta: Quién tiene un libro prestado (usando el grafo)
  clienteQueTieneLibro = (req: Request, res: Response) => {
    const { codigoLibro } = req.params;
    const clientes = this.libreria.clienteQueTieneLibro(codigoLibro);
    res.json(clientes);
  };
}
