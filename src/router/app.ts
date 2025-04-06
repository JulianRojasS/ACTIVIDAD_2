import express from 'express';
import { Libreria } from '../service/Libreria';
import { Libro } from '../model/Libro';
import { Usuario } from '../model/Usuario';

// Importar las clases necesarias
// Libreria, Libro y Usuario
// Libreria: contiene la logica de negocio para gestionar libros y prestamos
// Libro: representa un libro con su codigo, titulo y autor
// Usuario: representa un usuario con su id y nombre

/* Manejador de rutas */
const router = express.Router();
/* Instancia de la libreria a gestionar */
const libreria = new Libreria();

/* Rutas de la aplicacion */

// Ruta para la pagina principal
// Renderiza la vista de la pagina principal y pasa los prestamos actuales
router.get('/', (req, res) => {
  res.render('pages/index', {
    prestamos: libreria.listarPrestamos()
  });
});

// Ruta para la pagina de libros
// Renderiza la vista de libros y pasa la lista de libros y prestamos actuales
router.get('/libros', (req, res) => {
  res.render('pages/libros', {
    libros: libreria.listarLibros(),
    prestamos: libreria.listarPrestamos()
  });
});

// Permite registrar nuevos libros mediante un formulario
// Recibe el codigo, titulo y autor del libro desde el cuerpo de la solicitud
router.post('/libros', (req, res) => {
  const { codigo, titulo, autor } = req.body;
  // Crea una nueva instancia de Libro y la registra en la libreria
  const libro = new Libro(codigo, titulo, autor);
  libreria.registrarLibro(libro);
  // Luego redirige a la pagina de libros
  res.redirect('/libros');
});

///  Ruta para la pagina de usuarios
// Renderiza la vista de usuarios y pasa la lista de usuarios y prestamos actuales
router.get('/usuarios', (req, res) => {
  res.render('pages/usuarios', {
    usuarios: libreria.listarUsuarios(),
    prestamos: libreria.listarPrestamos()
  });
});

// Permite registrar nuevos usuarios mediante un formulario
// Recibe el id y nombre del usuario desde el cuerpo de la solicitud
router.post('/usuarios', (req, res) => {
  const { idUsuario, nombre } = req.body;
  // Crea una nueva instancia de Usuario y la registra en la libreria
  const usuario = new Usuario(idUsuario, nombre);
  libreria.registrarUsuario(usuario);
  // Luego redirige a la pagina de usuarios
  res.redirect('/usuarios');
});

/// Ruta para registrar prestamos
// Renderiza la vista de prestamos y pasa la lista de libros, usuarios y prestamos actuales
router.post('/prestamo', (req, res) => {
  const { codigoLibro, idUsuario } = req.body;
  /// Agrega un nuevo prestamo a la libreria
  libreria.prestarLibro(codigoLibro, idUsuario);
  // Luego redirige a la pagina principal
  res.redirect('/');
});

// Ruta para devolver libros
router.post('/devolucion', (req, res) => {
  const { codigoLibro, idUsuario } = req.body;
  // Agrega una devolucion a la libreria
  libreria.devolverLibro(codigoLibro, idUsuario);
  // Luego redirige a la pagina principal
  res.redirect('/');
});

// Se exporta el router para ser utilizado en la aplicacion principal
export default router;
