/****************************************************************************
 * @author Manuel Garcia                                                    *
 * @date 20/05/2023                                                         *
 * @description Modulo Peticiones a la base para CRUD en la tabla clientes  *
****************************************************************************/

import { db } from '../conexion.js'
import bcrypt from 'bcryptjs'

export const getClientes = (req, res) => {
    const q = 
    "SELECT IdCliente, PrimerNombre, SegundoNombre, IF(TercerNombre IS NULL OR TercerNombre = '', '--', TercerNombre) AS TercerNombre, PrimerApellido, SegundoApellido, IF(TercerApellido IS NULL OR TercerApellido = '', '--', TercerApellido) AS TercerApellido, Edad, Telefono, Direccion, Correo, Dui, CONCAT(PrimerNombre, ' ', PrimerApellido) AS cliente FROM cliente ORDER BY IdCliente DESC"
    db.query(q,(err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const crear = (req,res) => {

    const q = "INSERT INTO cliente (PrimerNombre, SegundoNombre,TercerNombre,PrimerApellido,SegundoApellido,TercerApellido,Edad,Telefono,Direccion,Correo,Dui) VALUE (?)"

    const values = [
        req.body.PrimerNombre,
        req.body.SegundoNombre,
        req.body.TercerNombre,
        req.body.PrimerApellido,
        req.body.SegundoApellido,
        req.body.TercerApellido,
        req.body.Edad,
        req.body.Telefono,
        req.body.Direccion,
        req.body.Correo,
        req.body.Dui,
    ]
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const eliminarCliente = (req,res) => {
    const q = "DELETE FROM cliente WHERE IdCliente = ?";
  
      const values = [req.body.IdCliente];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).send({"status":"success", "message":"Se elimino el cliente"});
      });
}

export const editar = (req,res) => {
    const q = `UPDATE cliente SET PrimerNombre = ?, SegundoNombre = ?, TercerNombre = ?, PrimerApellido = ?, SegundoApellido = ?, TercerApellido = ?, Edad = ?, Telefono = ?, Direccion = ?, Correo = ?, Dui = ? WHERE IdCliente = ?;`

    db.query(
        q,
        [
            req.body.PrimerNombre,
            req.body.SegundoNombre,
            req.body.TercerNombre,
            req.body.PrimerApellido,
            req.body.SegundoApellido,
            req.body.TercerApellido,
            req.body.Edad,
            req.body.Telefono,
            req.body.Direccion,
            req.body.Correo,
            req.body.Dui,
            req.body.IdCliente
        ], (err, data) => {
            if(err) return res.status(500).json(err)
            return res.status(200).send({"status": "success", "message": "Se edito correctamente el cliente", "data": data})
        }
    )
}