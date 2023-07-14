/************************************************************
 * @author Manuel Garcia                                    *
 * @date 20/05/2023                                         *
 * @description Archivo de conexion con la base de datos    *
************************************************************/

import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    port:"3307",
    user:"root",
    password:"root",
    database:"parqueo_bd"
})