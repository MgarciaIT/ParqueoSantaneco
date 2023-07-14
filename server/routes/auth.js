/****************************************************************************************
 * @author Manuel Garcia                                                                *
 * @date 20/05/2023                                                                     *
 * @description Modulo de ruteo para controladores de para inicio y cierre de sesion    *
****************************************************************************************/

import express from 'express'
import { login, logout } from '../controllers/auth.js'

const router = express.Router()

// Url para logueo de Usuario
router.post("/login", login)
router.post("/logout", logout)

export default router