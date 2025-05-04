import express from "express";
import { Libro } from "../model/Libro";
import { Cliente } from "../model/Cliente";
import { LibreriaControlador } from "../controler/LibreriaControlador";
import { SesionControlador } from "../controler/SesionControlador";

// Importar las clases necesarias
// Libreria, Libro y Cliente
// Libreria: contiene la logica de negocio para gestionar libros y prestamos
// Libro: representa un libro con su codigo, titulo y autor
// Cliente: representa un cliente con su id y nombre

/* Manejador de rutas */
const router = express.Router();
// Controlador de la libreria
const {
  login,
  home,
  crearLibro,
  libros,
  clientes,
  crearCliente,
  crearPrestamo,
  devolverLibro,
  eliminarCliente,
} = new LibreriaControlador();

// Controlador de sesiones
const {
  verificarSesion,
  verificarToken,
  login: sesionLogin,
  logout: sesionLogout,
  listarSesionesActivas,
  buscarSesion,
  buscarUsuario,
} = new SesionControlador();

/* Rutas de la aplicacion */

// Ruta para iniciar sesion
router.post("/login",sesionLogin)
// Ruta para cerrar sesion
.post("/logout", sesionLogout)
// Ruta para ver las sesiones activas
.get("/sesiones", listarSesionesActivas)
// Ruta para buscar una sesion por id de usuario
.get("/buscarSesion/:idUsuario", buscarSesion)
// Ruta para buscar un usuario por nombre
.get("/buscarUsuario/:nombre", buscarUsuario)
// Renderiza la vista de inicio de sesion
.get("/", login)
// Ruta para la pagina principal
// Renderiza la vista de la pagina principal y pasa los prestamos actuales
.get("/home", verificarSesion, verificarToken, home)
// Ruta para la pagina de libros
// Renderiza la vista de libros y pasa la lista de libros y prestamos actuales
.get("/libros", verificarSesion, verificarSesion, libros)
// Permite registrar nuevos libros mediante un formulario
// Recibe el codigo, titulo y autor del libro desde el cuerpo de la solicitud
.post("/libros", crearLibro)
///  Ruta para la pagina de clientes
// Renderiza la vista de clientes y pasa la lista de clientes y prestamos actuales
.get("/clientes", verificarSesion, verificarToken, clientes)
// Permite registrar nuevos clientes mediante un formulario
// Recibe el id y nombre del cliente desde el cuerpo de la solicitud
.post("/clientes", crearCliente)
/// Ruta para registrar prestamos
// Renderiza la vista de prestamos y pasa la lista de libros, clientes y prestamos actuales
.post("/prestamo", crearPrestamo)
// Ruta para devolver libros
.post("/devolucion", devolverLibro)
/// Ruta para eliminar clientes
// Recibe el id del cliente a eliminar desde el cuerpo de la solicitud
.delete("/clientes/:idCliente",  eliminarCliente)

// Se exporta el router para ser utilizado en la aplicacion principal
export default router;
