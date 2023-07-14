/****************************************************************************************
 * @author Manuel Garcia                                                                *
 * @date 20/05/2023                                                                     *
 * @description Modulo de ruteo para controladores de para CRUD de Clientes             *
****************************************************************************************/

import express from 'express'
import { crear, eliminarCliente, getClientes, editar } from '../controllers/clientes.js'


const router = express.Router()

router.post("/crear", crear)
router.get("/", getClientes)
router.post("/eliminar", eliminarCliente)
router.post("/editar", editar)

export default router