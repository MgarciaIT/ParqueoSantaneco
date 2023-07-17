/************************************************************
 * @author Manuel Garcia                                    *
 * @date 20/05/2023                                         *
 * @description Archivo de conexion con la base de datos    *
************************************************************/

import mysql from "mysql"

export const db = mysql.createConnection({
    host:"us-cdbr-east-06.cleardb.net",
    user:"bd11fa2807975b",
    password:"e51ea5a4",
    database:"heroku_cc591d012db3d9d"
})

//mysql://bd11fa2807975b:e51ea5a4@us-cdbr-east-06.cleardb.net/heroku_cc591d012db3d9d?reconnect=true