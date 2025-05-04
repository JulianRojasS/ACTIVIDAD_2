// Contiene la clase Sesion que representa una sesión de usuario
// en el sistema de gestión de biblioteca. La clase tiene tres propiedades: idSesion, fechaInicio y fechaFin, que representan el ID del usuario, la fecha de inicio de la sesión y la fecha de fin de la sesión, respectivamente. La clase también tiene un constructor que inicializa estas propiedades.
// @param {string} idUsuario - El ID del usuario que ha iniciado sesión.
// @param {Date} fechaInicio - La fecha de inicio de la sesión.
// @param {Date | null} fechaFin - La fecha de fin de la sesión, puede ser null si la sesión está activa.

export class Sesion {
  idSesion: string;
  fechaInicio: Date;
  fechaFin: Date | null;

  constructor(idSesion: string, fechaInicio: Date, fechaFin: Date | null = null) {
    this.idSesion = idSesion;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}