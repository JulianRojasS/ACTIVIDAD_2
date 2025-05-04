import { NextFunction, Request, Response } from "express";
import { Sesiones } from "../service/Sesiones";
import jwt from "jsonwebtoken";

export class SesionControlador {
  sesiones: Sesiones = new Sesiones();

  login = (req: Request, res: Response) => {
    const {nombre, contrasenia} = req.body;
    const usuario = this.sesiones.buscarUsuarioNombre(nombre);
    if (usuario) {
      this.sesiones.login(usuario.idUsuario, contrasenia).then((valid) => {
        if (valid) {
          const actk = jwt.sign({ nombre: usuario.nombre }, "prueba", {
            expiresIn: "15 m",
          })
          this.sesiones.registrarSesion(actk);
          res.cookie("actk", actk, { httpOnly: true, secure: false });
          res.redirect("/home")
        } else {
          res.redirect("/")
        }
      }).catch((error: unknown) => {
        res.status(500).json({ message: "Error en el servidor", error: (error as Error).message });
      });
    } else {
      res.redirect("/")
    }
  }

  logout = (req: Request, res: Response) => {
    const actk = req.cookies.actk;
    if (!actk) {
      res.redirect("/")
      return
    }
    const sesion = this.sesiones.buscarSesion(actk);
    if (!sesion) {
      res.redirect("/")
      return
    }
    this.sesiones.finalizarSesion(actk);
    res.clearCookie("actk", { httpOnly: true, secure: true });
    res.redirect("/")
  }

  listarSesionesActivas = (req: Request, res: Response) => {
    const sesionesActivas = this.sesiones.listarSesionesActivas();
    res.status(200).json(sesionesActivas);
  }

  buscarSesion = (req: Request, res: Response) => {
    const { idSesion } = req.params;
    const sesion = this.sesiones.buscarSesion(idSesion);
    if (!sesion) {
      res.redirect("/")
      return
    }
    res.status(200).json(sesion);
  }

  buscarUsuario = (req: Request, res: Response) => {
    const { nombre } = req.params;
    const usuario = this.sesiones.buscarUsuarioNombre(nombre);
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return
    }
    res.status(200).json(usuario);
  }

  verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.actk;
    if (!token) {
      res.redirect("/")
      return
    }
    jwt.verify(token, "prueba", (err: unknown) => {
      if (err) {
        res.redirect("/")
        return
      }
      next();
    });
  }

  verificarSesion = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.actk;
    if (!token) {
      res.redirect("/")
      return
    }
    const sesion = this.sesiones.buscarSesion(token);
    if (!sesion) {
      res.redirect("/")
      return
    }
    next();
  }

}