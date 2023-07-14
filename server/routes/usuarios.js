/****************************************************************************************
 * @author Manuel Garcia                                                                *
 * @date 20/05/2023                                                                     *
 * @description Modulo de ruteo para controladores de para CRUD de usuarios             *
****************************************************************************************/

import express from 'express'
import { crear, editar, eliminar, getUsuarios, getRoles, eliminarUser } from '../controllers/usuarios.js'

const router = express.Router()

router.post("/crear", crear)
router.get("/", getUsuarios)
router.delete("/:id", eliminar)
router.get("/roles", getRoles)
router.post("/eliminar", eliminarUser)
router.post("/editar", editar)

export default router