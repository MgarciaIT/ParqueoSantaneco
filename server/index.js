/****************************************
 * @author Manuel Garcia                *
 * @date 20/05/2023                     *
 * @description Modulo Index de la Api  *
****************************************/

import express from "express";
const app = express()
import usuariosRoutes from "./routes/usuarios.js"
import clientesRoutes from "./routes/clientes.js"
import parqueoRoutes from "./routes/parqueo.js"
import reportesRoutes from "./routes/reportes.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
//app.use(cors({ origin: "http://localhost:3000"}))
app.use(cors({ origin: "https://parqueosantaneco-36063810dd2b.herokuapp.com"}))
app.use(cookieParser())

app.use("/api/usuarios", usuariosRoutes)
app.use("/api/clientes", clientesRoutes)
app.use("/api/parqueo", parqueoRoutes)
app.use("/api/reportes", reportesRoutes)
app.use("/api/auth", authRoutes)

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
})