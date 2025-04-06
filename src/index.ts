import express from 'express';
import path from 'path';
import AppRouter from './router/app';
import expressLayouts from 'express-ejs-layouts';

// Se inicializa la aplicacion express
const app = express();
// Se establece el puerto para el servidor
const port = 3000;

// Se establece la carpeta de vistas y el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
// Establece el layout por defecto para todas las vistas
app.set('layout', 'layouts/layout');
// Se establece el motor de plantillas EJS
app.set('view engine', 'ejs');

// Se establece la carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
// Se configura el middleware para manejar datos de formularios
app.use(express.urlencoded({ extended: true }));
// Se establece la carpeta de vistas para los layouts
app.use(express.static('public'));
// Se establece el middleware para manejar datos JSON
app.use(express.json());
// Se establece el middleware para manejar layouts con EJS
app.use(expressLayouts);

// Se configura el middleware para manejar las rutas de la aplicacion
app.use('/', AppRouter);


// Se inicia el servidor en el puerto especificado
app.listen(port, () => {
  // Se muestra un mensaje en la consola indicando que el servidor esta escuchando
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
