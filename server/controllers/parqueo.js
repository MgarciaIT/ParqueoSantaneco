/****************************************************************************
 * @author Manuel Garcia                                                    *
 * @date 20/05/2023                                                         *
 * @description Modulo Peticiones a la base para CRUD en la tabla parqueo   *
****************************************************************************/

import { db } from '../conexion.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from "moment";

export const getParqueo = (req,res) => {
  const q = 
    "SELECT r.*, CONCAT(c.PrimerNombre, ' ', c.PrimerApellido) AS cliente, CONCAT(c.PrimerNombre, ' ', c.SegundoNombre) as nombres, CONCAT(c.PrimerApellido, ' ', c.SegundoApellido) as apellidos, CONCAT(m.Marca, ' / ', r.Modelo) as vehiculo, IF(r.FechaSalida IS NULL, '--', r.FechaSalida) AS FechaCierre, c.Telefono, c.Dui, m.Marca, fp.FormaPago, d.NombreDocumento as comprobante, s.NombreSocio, des.Descuento FROM registro r INNER JOIN cliente c ON c.IdCliente = r.IdCliente INNER JOIN marca m ON m.IdMarca = r.IdMarca LEFT JOIN forma_pago fp ON fp.IdFormaPago = r.IdFormaPago LEFT JOIN documento d ON d.IdDocumento = r.IdDocumento LEFT JOIN descuento des ON des.IdDescuento = r.IdDescuento LEFT JOIN socio s ON s.IdSocio = des.IdSocio ORDER BY r.IdRegistro DESC;"
    db.query(q,(err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getMarca = (req,res) => {
  const q = "SELECT IdMarca, Marca FROM  marca"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const getPago = (req,res) => {
  const q = "SELECT IdFormaPago, FormaPago FROM  forma_pago"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const getDocumento = (req,res) => {
  const q = "SELECT * FROM  documento"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const getCliente = (req,res) => {
  const q = "SELECT IdCliente, CONCAT(PrimerNombre, ' ', PrimerApellido) AS cliente FROM cliente;"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const getDescuento = (req,res) => {
  const q = "SELECT d.IdDescuento, s.NombreSocio, d.Descuento FROM descuento d INNER JOIN socio s ON s.IdSocio = d.IdSocio;"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}

export const crear = (req,res) => {
  const q = "INSERT INTO registro (IdUsuario, IdCliente, IdMarca, FechaIngreso, Modelo, Placa) VALUES (?);"
    const values = [
      req.body.IdUsuario,
      req.body.IdCliente,
      req.body.IdMarca,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.Modelo,
      req.body.Placa,
    ]
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).send({"status": "success", "message": "Se creo correctamente el registro"})
    })
}

export const eliminar = (req,res) => {
  const q = "DELETE FROM registro WHERE IdRegistro = ?";

    const values = [req.body.IdRegistro];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send({"status":"success", "message":"Se elimino el registro"});
    });
}

export const editar = (req,res) => {
  if (req.body.IdDocumento == null || req.body.IdDescuento == null || req.body.IdFormaPago == null){
    return res.status(500).send({"status": "error", "message": "Uno de los campos está vacío"})
  } else {
    const q = `UPDATE registro SET IdFormaPago = ?, IdDocumento = ?, IdDescuento = ?, FechaSalida = (SELECT NOW()) WHERE IdRegistro = ?;`
    db.query(
      q,
      [
          req.body.IdFormaPago,
          req.body.IdDocumento,
          req.body.IdDescuento,
          req.body.IdRegistro
      ], (err, data) => {
        if(err) return res.status(500).json(err)
        const qu = "UPDATE registro SET  TotalTiempo = (SELECT TIMESTAMPDIFF(SECOND, FechaIngreso, (SELECT NOW())) / 3600.0) WHERE IdRegistro = ?;"
        db.query(qu, [req.body.IdRegistro], (err1, data1) => {
          if(err1) return res.status(500).json(err1)
          const total = "UPDATE registro SET Total = (TotalTiempo * PrecioXhora) WHERE IdRegistro = ?;"
          db.query(total, [req.body.IdRegistro], (err2, data2) => {
            if(err2) return res.status(500).json(err2)
            return res.status(200).send({"status": "success", "message": "Se edito correctamente el registro"})
          })
        })
      }
    )
  }
}

export const getUltimo = (req,res) => {
  const q = "SELECT IdRegistro, FechaIngreso FROM registro ORDER BY IdRegistro DESC LIMIT 1"
  db.query(q,(err,data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  })
}


export const timezone = (req, res) => {
  const zona = new Date().toLocaleDateString('en-us', { timeZoneName: 'long'});
  res.json({zona})
}

