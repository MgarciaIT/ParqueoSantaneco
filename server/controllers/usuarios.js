/****************************************************************************
 * @author Manuel Garcia                                                    *
 * @date 20/05/2023                                                         *
 * @description Modulo Peticiones a la base para CRUD en la tabla usuarios  *
****************************************************************************/

import { db } from '../conexion.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUsuarios = (req, res) => {
  const q = "SELECT u.IdUsuario, u.NombreUsuario, u.ContraUsuario, r.Rol FROM usuario u INNER JOIN rol r ON r.IdRol = u.IdRol ORDER BY u.IdUsuario DESC"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const crear = (req,res) => {
    // VERIFICA SI EL USUARIO EXISTE
  const q = "SELECT * FROM usuario WHERE NombreUsuario = ?";

  db.query(q, [req.body.NombreUsuario], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("El nombre de usuario ya existe");

    // CREA UN NUEVO USUARIO
      // ENCRYPTA LA CONTRASEÑA
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.ContraUsuario, salt);

    const q =
      "INSERT INTO usuario (`IdRol`,`NombreUsuario`,`ContraUsuario`) VALUE (?)";

    const values = [
      req.body.IdRol,
      req.body.NombreUsuario,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
}

export const editar = (req,res) => {
 const salt = bcrypt.genSaltSync(10)
 const hashedPassword = bcrypt.hashSync(req.body.ContraUsuario, salt)

  const q = "UPDATE usuario SET  IdRol = ?, NombreUsuario = ?, ContraUsuario = ? WHERE IdUsuario = ?;"
  
  db.query(
    q,
    [
      req.body.IdRol,
      req.body.NombreUsuario,
      hashedPassword,
      req.body.IdUsuario
    ], (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).send({"status":"success", "message":"Se edito el usuario"})
  })
}

export const eliminar = (req,res) => {
  const q = "DELETE FROM usuario WHERE IdUsuario = ?"
  
  db.query(q, [req.params.id, body.IdUsuario], (err, data) => {
      if(err) return res.status(500).json(err)
      if(data.affectedRows > 0) return res.status(200).json("Usuario eliminado")
  })
}

export const getRoles = (req, res) => {
  const q = "SELECT IdRol, Rol FROM  rol"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const eliminarUser = (req,res) => {
  const q = "DELETE FROM usuario WHERE IdUsuario = ?";

    const values = [req.body.IdUsuario];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send({"status":"success", "message":"Se elimino el usuario"});
    });
}

export const editarUsuario = (req,res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const q = "UPDATE usuario SET  IdRol = ?, NombreUsuario = ?, ContraUsuario = ? WHERE IdUsuario = ?;"

  const values = [
    req.body.IdRol,
    req.body.NombreUsuario,
    hashedPassword,
    req.body.IdUsuario,
  ]
  console.log(values)
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).send({"status":"success", "message":"Se edito el usuario"});
  });
}