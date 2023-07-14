/****************************************************************************************
 * @author Manuel Garcia                                                                *
 * @date 20/05/2023                                                                     *
 * @description Modulo de ruteo para controladores de para CRUD de Parqueo              *
****************************************************************************************/

import express from 'express'
import { getDescuento, getDocumento, getMarca, getPago, getParqueo, crear, getCliente, editar, eliminar, getUltimo, timezone } from '../controllers/parqueo.js'

const router = express.Router()

router.get("/", getParqueo)
router.get("/marca", getMarca)
router.get("/pago", getPago)
router.get("/documento", getDocumento)
router.get("/descuento", getDescuento)
router.get("/clientes", getCliente)
router.post("/crear", crear)
router.post("/editar", editar)
router.post("/eliminar", eliminar)
router.get("/ultimo", getUltimo)
router.get("/zona", timezone)
export default router