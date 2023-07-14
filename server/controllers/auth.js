/****************************************************************************
 * @author Manuel Garcia                                                    *
 * @date 20/05/2023                                                         *
 * @description Modulo Peticiones a la base para inicio y cierre de sesion  *
****************************************************************************/

import { db } from '../conexion.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

/**
 * Funcion para Loguearse al sistema
 */
export const login = (req,res) =>{
    const q = "SELECT * FROM usuario WHERE NombreUsuario = ?"
    
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("Usuario incorrecto")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].ContraUsuario)
        if(!checkPassword) return res.status(400).json("Usuario o contraseña incorrecta")

        const token = jwt.sign({id:data[0].IdUsuario}, "secretkey")

        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}

/**
 * Funcion para cerrar sesion
*/

export const logout = (req,res) =>{
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("El Usuario ha cerrado sesión")
}