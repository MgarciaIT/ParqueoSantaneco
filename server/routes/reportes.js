/****************************************************************************************
 * @author Manuel Garcia                                                                *
 * @date 20/05/2023                                                                     *
 * @description Modulo de ruteo para controladores de para creacion de Reporte          *
****************************************************************************************/

import express from 'express'
import { getCorteX, getCorteZ } from '../controllers/reportes.js'

const router = express.Router()

router.get("/cortex", getCorteX)
router.get("/cortez", getCorteZ)

export default router