import { hash } from "argon2";

// Clase Usuario
// Esta clase representa a un usuario en el sistema de gestión de biblioteca.
// Contiene propiedades como idUsuario, nombre y contrasena, así como un método para cifrar la contraseña.
// La contraseña se cifra utilizando el algoritmo Argon2 para mayor seguridad.
// La clase también incluye un constructor para inicializar las propiedades del usuario.
// El método hashPassword se utiliza para cifrar la contraseña del usuario utilizando el algoritmo Argon2.
// Este método se puede llamar al crear un nuevo usuario o al cambiar la contraseña de un usuario existente.
// La clase se puede extender para incluir más funcionalidades en el futuro, como la validación de la contraseña o la gestión de roles de usuario.

/// @param {string} idUsuario - ID del usuario
/// @param {string} nombre - Nombre del usuario
/// @param {string} contrasena - Contraseña del usuario
/// @returns {Usuario} - Instancia de la clase Usuario

/// @method {function} hashPassword - Método para cifrar la contraseña del usuario

export class Usuario {
  idUsuario: string;
  nombre: string;
  contrasena: string;

  constructor(idUsuario: string, nombre: string, contrasena: string) {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.contrasena = contrasena;
  }

  // Metodo para cifrar la contraseña
  hashPassword = async (password: string) => {
    const passwordHashed = await hash(password, { type: 2 });
    this.contrasena = passwordHashed;
  }
}