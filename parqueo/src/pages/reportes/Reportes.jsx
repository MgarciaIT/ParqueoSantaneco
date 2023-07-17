/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo Reportes                                 *
****************************************************************/

import "./reportes.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react'
import axios from "axios"
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core'
import { Box, Grid, Modal, Tab, Typography } from "@mui/material"
import { Button as Btn, } from 'react-bootstrap'



const useStyles = makeStyles((theme) => ({
  modal:{
    position: 'absolute',
    width:700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)' 
  },
  iconos: {
    cursor:'pointer'
  },
  inputMaterial:{
    width: '100%'
  },
  error:{
    color:'blue',
    fontSize:'bold'
  },
  btn:{
    marginLeft:'10px',
    paddingLeft:'10px',
    padding:'50px'
    
  }
}))

const Reportes = () => {

  const styles = useStyles()
  const [modalCorteX, setModalCorteX] = React.useState(false)
  const [modalCorteZ, setModalCorteZ] = React.useState(false)
  const [dataX, setDataX] = React.useState([])
  const [dataZ, setDataZ] = React.useState([])
  const [valueX, setValueX] = React.useState('1')
  const [valueZ, setValueZ] = React.useState('1')
  const getCorteX = async (e) => {
    try {
      await axios.get("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/reportes/cortex")
      .then(response => {
        console.log(response.data)
        setDataX(response.data)
        console.log(dataX);
      })
    } catch (error) {
      console.log(error)
    }
    AbrirCerrarModalCorteX()
  }

  const getCorteZ = async(e) => {
    try {
      await axios.get("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/reportes/cortez")
      .then(response => {
        console.log(response.data)
        setDataZ(response.data)
        console.log(dataZ);
      })
    } catch (error) {
      console.log(error)
    }
    AbrirCerrarModalCorteZ()
  }

  const AbrirCerrarModalCorteX = () => {
    setModalCorteX(!modalCorteX)
  }

  const AbrirCerrarModalCorteZ = () => {
    setModalCorteZ(!modalCorteZ)
  }

  const handleChangeX = (event, newValueX) => {
    setValueX(newValueX)
  }

  const handleChangeZ = (event, newValueZ) => {
    setValueZ(newValueZ)
  }

  const ColumnasFormaPago = [
    {title: 'TOTAL EFECTIVO', field: 'TotalEfectivo'},
    {title: 'TOTAL TARJETA DEBITO', field: 'TotalTarjetaDebito'},
    {title: 'TOTAL TARJETA CREDITO', field: 'TotalTarjetaCredito'},
    {title: 'TOTAL CHEQUE', field: 'TotalCheque'},
    {title: 'TOTAL BITCOIN', field: 'TotalBitcoin'},
    {title: 'TOTAL TRANSFERENCIA', field: 'TotalTransferencia'},
    {title: 'EFECTIVO FACTURA', field: 'TotalEfectivoFC', hidden: true},
    {title: 'EFECTIVO CREDITO FISCAL', field: 'TotalEfectivoCF', hidden: true},
    {title: 'EFECTIVO TICKET', field: 'TotalEfectivoTC', hidden: true},
    {title: 'DEBITO FACTURA', field: 'TotalTarjetaDebitoFC', hidden: true},
    {title: 'DEBITO CREDITO FISCAL', field: 'TotalTarjetaDebitoCF', hidden: true},
    {title: 'DEBITO TICKET', field: 'TotalTarjetaDebitoTC', hidden: true},
    {title: 'CREDITO FACTURA', field: 'TotalTarjetaCreditoFC', hidden: true},
    {title: 'CREDITO CREDITO FISCAL', field: 'TotalTarjetaCreditoCF', hidden: true},
    {title: 'CREDITO TICKET', field: 'TotalTarjetaCreditoTC', hidden: true},
    {title: 'CHEQUE FACTURA', field: 'TotalChequeFC', hidden: true},
    {title: 'CHEQUE CREDITO FISCAL', field: 'TotalChequeCF', hidden: true},
    {title: 'CHEQUE TICKET', field: 'TotalChequeTC', hidden: true},
    {title: 'BITCOIN FACTURA', field: 'TotalBitcoinFC', hidden: true},
    {title: 'BITCOIN CREDITO FISCAL', field: 'TotalBitcoinCF', hidden: true},
    {title: 'BITCOIN TICKET', field: 'TotalBitcoinTC', hidden: true},
    {title: 'TRANSFERENCIA FACTURA', field: 'TotalTransferenciaFC', hidden: true},
    {title: 'TRANSFERENCIA CREDITO FISCAL', field: 'TotalTransferenciaCF', hidden: true},
    {title: 'TRANSFERENCIA TICKET', field: 'TotalTransferenciaTC', hidden: true},
    {title: 'TOTAL REGISTRO', field: 'TotalRegistro'},
    {title: 'TOTAL', field: 'Total'},
  ]

  const ColumnasComprobante = [
    {title: 'TOTAL FACTURA', field: 'TotalFactura'},
    {title: 'TOTAL CREDITO FISCAL', field: 'TotalCreditoFiscal'},
    {title: 'TOTAL TICKET', field: 'TotalTicket'},
    {title: 'TOTAL REGISTRO', field: 'TotalRegistro'},
    {title: 'TOTAL ', field: 'Total'},
  ]

  const HoraFecha = new Date()

  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: 'America/El_Salvador'
  };

  const formattedDateTime = new Intl.DateTimeFormat("es-ES", options).format(HoraFecha).replace(/^\w/, (c) => c.toLocaleUpperCase());

  const bodyCorteX = (
    <div className={styles.modal}>
      <Typography variant="h4">Reporte Corte X</Typography>
      <br/><br/>
      <TabContext value={valueX}>
        <Box sx={{borderBottom:1, borderColor:'divider'}}>
          <TabList onChange={handleChangeX} aria-label="CorteX">
            <Tab label="Comprobante" value='1' />
            <Tab label="Forma Pago" value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <MaterialTable
            columns={ColumnasComprobante}
            data={dataX}
            title={`Corte X -- ${formattedDateTime}`}
            options={
              {
                exportButton: true,
              }
            }
          />
        </TabPanel>
        <TabPanel value='2'>
          <MaterialTable 
            columns={ColumnasFormaPago}
            data={dataX}
            title={`Corte X -- ${formattedDateTime}`}
            options={
              {
                exportButton: true,
              }
            }
          />
        </TabPanel>
      </TabContext>
      <br/><br/>
      <div align="right">
        <Btn variant="primary" onClick={() => AbrirCerrarModalCorteX()}>Cerrar</Btn>
      </div>
    </div>
  )

  const bodyCorteZ = (
    <div className={styles.modal}>
      <Typography variant="h4">Reporte Corte Z</Typography>
      <br/><br/>
        <TabContext value={valueZ}>
        <Box sx={{borderBottom:1, borderColor:'divider'}}>
          <TabList onChange={handleChangeZ} aria-label="CorteZ">
            <Tab label="Comprobante" value='1' />
            <Tab label="Forma Pago" value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <MaterialTable
            columns={ColumnasComprobante}
            data={dataZ}
            title={`Corte Z -- ${formattedDateTime}`}
            options={
              {
                exportButton: true,
              }
            }  
          />
        </TabPanel>
        <TabPanel value='2'>
          <MaterialTable 
            columns={ColumnasFormaPago}
            data={dataZ}
            title={`Corte Z -- ${formattedDateTime}`}
            options={
              {
                exportButton: true
              }
            }
          />
        </TabPanel>
      </TabContext>
      <br/><br/>
      <div align="right">
        <Btn variant="primary" onClick={() => AbrirCerrarModalCorteZ()}>Cerrar</Btn>
      </div>
    </div>
  )

  return (
    <div className="reportes">
      <Typography variant="h3">Reportes</Typography>
      <br/><br/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Btn variant="primary" onClick={() => getCorteX()}>Corte X</Btn>
          <Btn variant="primary" style={{marginLeft:'15px'}} onClick={() => getCorteZ()}>Corte Z</Btn>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Modal
        open={modalCorteX}
        onClose={AbrirCerrarModalCorteX}>
        {bodyCorteX}
      </Modal>
      <Modal
        open={modalCorteZ}
        onClose={AbrirCerrarModalCorteZ}>
        {bodyCorteZ}
      </Modal>
    </div>
  )
}

export default Reportes