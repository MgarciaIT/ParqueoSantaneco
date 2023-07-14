/****************************************************************************
 * @author Manuel Garcia                                                    *
 * @date 20/05/2023                                                         *
 * @description Modulo Peticiones a la base para CRUD en la tabla reportes  *
****************************************************************************/

import { db } from '../conexion.js'

/**
 * Funcion para realizar la consulta y el update a la tabla registro para corte X
 */
export const getCorteX = (req,res) => {

    const fecha = new Date().toISOString().slice(0, 10)
    console.log(fecha);
    const q = `SELECT 
	(SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivo,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebito,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCredito,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =4 AND FechaSalida IS NOT NULL), 0.0)) AS TotalCheque,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =5 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoin,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =6 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTransferencia,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =1 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivoCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =1 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivoFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =1 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivoTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =2 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebitoCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =2 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebitoFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =2 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebitoTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =3 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCreditoCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =3 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCreditoFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =3 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCreditoTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =4 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalChequeCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =4 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalChequeFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =4 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalChequeTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =5 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoinCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =5 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoinFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =5 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoinTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =6 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTraferenciaCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =6 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTranferenciaFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND IdFormaPago =6 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTranferenciaTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE IdDocumento = 1 AND CorteX = 0 AND FechaSalida IS NOT NULL), 0.0)) AS TotalCreditoFiscal,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE IdDocumento = 2 AND CorteX = 0 AND FechaSalida IS NOT NULL), 0.0)) AS TotalFactura,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE IdDocumento = 3 AND CorteX = 0 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTicket,
    (SELECT count(*) FROM registro WHERE CorteX = 0 AND FechaSalida IS NOT NULL) AS TotalRegistro,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteX = 0 AND FechaSalida IS NOT NULL), 0.0)) AS Total;`
    db.query(q,(err,data) => {
        if (err) return res.status(500).json(err);
        const qu = `UPDATE registro SET CorteX = 1 WHERE CorteX = 0 AND FechaSalida IS NOT NULL`
        db.query(qu,(err1,data1) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

/**
 * Funcion para realizar la consulta y el update a la tabla registro para corte Y
 */
export const getCorteZ = (req, res) => {
    const fecha = new Date().toISOString().slice(0, 10)
    const q = `SELECT 
	(SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivo,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebito,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCredito,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =4 AND FechaSalida IS NOT NULL), 0.0)) AS TotalCheque,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =5 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoin,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =6 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTransferencia,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =1 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivoCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =1 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivoFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =1 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalEfectivoTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =2 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebitoCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =2 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebitoFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =2 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaDebitoTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =3 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCreditoCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =3 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCreditoFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =3 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTarjetaCreditoTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =4 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalChequeCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =4 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalChequeFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =4 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalChequeTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =5 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoinCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =5 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoinFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =5 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalBitcoinTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =6 AND IdDocumento = 1 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTraferenciaCF,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =6 AND IdDocumento = 2 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTranferenciaFC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND IdFormaPago =6 AND IdDocumento = 3 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTranferenciaTC,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE IdDocumento = 1 AND CorteZ = 0 AND FechaSalida IS NOT NULL), 0.0)) AS TotalCreditoFiscal,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE IdDocumento = 2 AND CorteZ = 0 AND FechaSalida IS NOT NULL), 0.0)) AS TotalFactura,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE IdDocumento = 3 AND CorteZ = 0 AND FechaSalida IS NOT NULL), 0.0)) AS TotalTicket,
    (SELECT COUNT(*) FROM registro WHERE CorteZ = 0 AND FechaSalida IS NOT NULL) AS TotalRegistro,
    (SELECT COALESCE((SELECT SUM(Total) FROM registro WHERE CorteZ = 0 AND FechaSalida IS NOT NULL), 0.0)) AS Total;`

    db.query(q,(err,data) => {
        if(err) return res.status(500).json(err)
        const qu = `UPDATE registro SET CorteX = 1, CorteZ = 1 WHERE FechaSalida IS NOT NULL`
        db.query(qu,(err1, data1) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}