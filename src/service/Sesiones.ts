import { BinaryTree } from "../structures/TreeNode";
import { Sesion } from "../model/Sesion";
import { Usuario } from "../model/Usuario";
import { verify } from "argon2";

// Servicio para manejar las sesiones de los usuarios
// Este servicio se encarga de gestionar las sesiones de los usuarios en el sistema de gestión de biblioteca.
export class Sesiones {
  private sesiones: BinaryTree<Sesion> = new BinaryTree<Sesion>();
  private usuarios: BinaryTree<Usuario> = new BinaryTree<Usuario>(); // Árbol binario para almacenar usuarios

  constructor() {
    // Inicializar el árbol de usuarios con algunos datos de ejemplo
    this.usuarios.insert(
      new Usuario(
        "123",
        "Jose",
        "$argon2id$v=19$m=65536,t=3,p=4$kMP1sDRlsi9pNslais3SOA$7OzEVt2Vqi72OQJQksXA5SzBnbqHaq7F6O7Pw0Xib9s"
      ),
      (a, b) => a.idUsuario.localeCompare(b.idUsuario)
    );
  }

  // Validar login de usuario
  login = async (idUsuario: string, contrasena: string) => {
    const usuario = this.usuarios.search({ idUsuario } as Usuario, (a, b) =>
      a.idUsuario.localeCompare(b.idUsuario)
    );
    if (!usuario) return false;
    return await verify(usuario.contrasena, contrasena);
  };

  buscarUsuarioNombre = (nombre: string): Usuario | null => {
    return this.usuarios.search({ nombre } as Usuario, (a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  };

  // Registrar una nueva sesión
  registrarSesion(idSesion: string): void {
    const nuevaSesion = new Sesion(idSesion, new Date());
    this.sesiones.insert(nuevaSesion, (a, b) =>
      a.idSesion.localeCompare(b.idSesion)
    );
  }

  // Finalizar una sesión
  finalizarSesion(idSesion: string): boolean {
    const sesion = this.sesiones.search({ idSesion } as Sesion, (a, b) =>
      a.idSesion.localeCompare(b.idSesion)
    );
    if (!sesion || sesion.fechaFin) return false;

    sesion.fechaFin = new Date();
    return true;
  }

  // Buscar una sesión por ID de usuario
  buscarSesion(idSesion: string): Sesion | null {
    return this.sesiones.search({ idSesion } as Sesion, (a, b) =>
      a.idSesion.localeCompare(b.idSesion)
    );
  }

  // Listar todas las sesiones activas
  listarSesionesActivas(): Sesion[] {
    return this.sesiones.list();
  }
}
