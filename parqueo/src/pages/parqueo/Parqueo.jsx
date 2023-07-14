/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo CRUD de Parqueo                          *
****************************************************************/

import './parqueo.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import * as  React from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core'
import { Typography, Modal, Grid, Stack, Autocomplete, Box, TextField } from '@mui/material'
import { Button as Btn, } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  modal:{
    position: 'absolute',
    width:650,
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
  }
}))

const Parqueo = () => {

  /********************************************************************************************************
   ****************************************** HOOKS y constatentes ****************************************
  ****************************************************************************************************** */
  const styles = useStyles ()
  const [data, setData] = React.useState([])
  const [cliente, setCliente] = React.useState([])
  const [marca, setMarca] = React.useState([])
  const [pago, setPago] = React.useState([])
  const [documento, setDocumento] = React.useState([])
  const [descuento, setDescuento] = React.useState([])
  const [modalInsertar, setModalInsertar] = React.useState(false)
  const [modalEditar, setModalEditar] = React.useState(false)
  const [modalEliminar, setModalEliminar] = React.useState(false)
  const [modalVer, setModalVer] = React.useState(false)
  const [body, setBody] = React.useState({
    IdUsuario:1,
    IdCliente:1,
    IdMarca:1,
    IdFormaPago:1,
    IdDocumento:1,
    IdDescuento:1,
    FechaIngreso:"",
    FechaSalida:"",
    Modelo:"",
    Placa:"",
    TotalTiempo:0.0,
    PrecioXhora:1.0,
    Total:0.0,
    cliente:"",
    nombres:"",
    apellidos:"",
    vehiculo:"",
    FechaCierre:"",
    Telefono:"",
    Dui:"",
    Marca:"",
    FormaPago:"",
    comprobante:"",
    NombreSocio:"",
    Descuento:""
  })

  const ToastExito = (msj) => {
    toast.success(msj, {
      position: toast.POSITION.TOP_CENTER
    })
  }

  const ToastError = (msj) => {
    toast.error(msj, {
      position: toast.POSITION.TOP_CENTER
    })
  }

  /********************************************************************************************************
   ********************************** Eventos Change para capturar datos ********************************** 
  ****************************************************************************************************** */

  const handleChange = e => {
    const {name, value} = e.target
    setBody(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const SelectChangeCliente = (event, value, name) => {
    setBody((prevState) => ({
      ...prevState, [name]: value.IdCliente
    }))
  }

  const SelectChangeMarca = (event, value, name) => {
    setBody((prevState) => ({
      ...prevState, [name]: value.IdMarca
    }))
  }

  const SelectChangePago = (event, value, name) => {
    setBody((prevState) => ({
      ...prevState, [name]: value.IdFormaPago
    }))
  }

  const SelectChangeDocumento = (event, value, name) => {
    setBody((prevState) => ({
      ...prevState, [name]: value.IdDocumento
    }))
  }

  const SelectChangeDescuento = (event, value, name) => {
    setBody((prevState) => ({
      ...prevState, [name]: value.IdDescuento
    }))
    console.log(body)
  }

  /***********************************************************************************************
   ********************************** Peticiones axios a la api **********************************
  ********************************************************************************************* */

  const getParqueo = async() => {
    await axios.get("http://localhost:4000/api/parqueo")
    .then(response => {
      setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getCliente = async() => {
    await axios.get("http://localhost:4000/api/parqueo/clientes")
    .then(response => {
      setCliente(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getMarca = async() => {
    await axios.get("http://localhost:4000/api/parqueo/marca")
    .then(response => {
      console.log(response.data)
      setMarca(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getPago = async() => {
    await axios.get("http://localhost:4000/api/parqueo/pago")
    .then(response => {
      console.log(response.data)
      setPago(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getDocumento = async() => {
    await axios.get("http://localhost:4000/api/parqueo/documento")
    .then(response => {
      console.log(response.data)
      setDocumento(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getDescuento = async() => {
    await axios.get("http://localhost:4000/api/parqueo/descuento")
    .then(response => {
      console.log(response.data)
      setDescuento(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const getUltimo = async (e) =>{
    await axios.get("http://localhost:4000/api/parqueo/ultimo")
    .then(response => {
      imprimirRegistro(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const Guardar = async() => {
    await axios.post("http://localhost:4000/api/parqueo/crear", body)
    .then(response => {
      const nuevoRegistro = response.data;
      setData(data.concat(nuevoRegistro))
      getParqueo()
      ToastExito("Registro Creado Exitosamente")
      AbrirCerarModalInsertar()
      getUltimo()
    }).catch(error => {
      ToastError("Hubo un error al crear el registro")
    })
  }

  /**********************************
   * Funciones para imprimir ticket * 
  **********************************/

  const imprimirRegistro = (nuevoRegistro) => {
    console.log(nuevoRegistro);
    nuevoRegistro.map((item) => {
      const id = item.IdRegistro
      const fecha = item.FechaIngreso
      const contenido = `
        <html>
          <head>
            <style>
              /* estilos css */
            </style>
          </head>
          <body>
            <h3>Parqueo Santaneco<h3>
            <p>${fecha}</p>
            <p>${id}</p>
            <p>¡Gracias por preferirnos!</p>
          </body>
        </html>
      `;
      const imprimirDirecto = () => {
        const impresora = new window.Printer();
        impresora.print(contenido, {
          silent: true,
          deviceName: 'EPSON_TM-M30'
        });
      };
      imprimirDirecto();
    })
  }

  const imprimirTicketPago = (registro) => {
    console.log(registro);
    registro.map((item) => {
      const id = item.IdRegistro
      const fecha = item.FechaIngreso
      const contenido = `
        <html>
          <head>
            <style>
              /* estilos css */
            </style>
          </head>
          <body>
            <h3>Parqueo Santaneco<h3>
            <h4>Direccion del local</h4>
            <Grid container spacing{2}>
              <Grid item xs={6}>
                <p>Ticket: ${id}<p>
              </Grid>
              <Grid item xs={6}>
                <p>Fecha: ${fecha}<p>
              </Grid>
            </Grid>
            
            <p>${id}</p>
            <p>¡Gracias por preferirnos!</p>
          </body>
        </html>
      `;
  
      const imprimirDirectoT = () => {
        const impresora = new window.Printer();
        impresora.print(contenido, {
          silent: true,
          deviceName: 'EPSON_TM-M30'
        });
      };
    
      imprimirDirectoT();
    })
  }

  const Editar = async() => {
    await axios.post("http://localhost:4000/api/parqueo/editar", body)
    .then(response => {
      setData(data.concat(response.data))
      getParqueo()
      ToastExito("Registro Completado")
      AbrirCerrarModalEditar()
    }).catch(error => {
      ToastError("Hubo un error al completar el Registro")
    })
  }

  const Eliminar = async(id) => {
    await axios.post("http://localhost:4000/api/parqueo/eliminar", id)
    .then(response => {
      getParqueo()
      ToastExito("Registro eliminado")
      AbrirCerrarModalEliminar()
    }).catch(error => {
      ToastError("Hubo un error al eliminar el Registro")
    })
  }

  /*****************************************************************************************************************
  * ******************************* Funciones para Abrir y cerrar los modales       *******************************
  ********************************* y funcion para seleccionar una fila en la tabla *******************************
  *************************************************************************************************************** */

  const AbrirCerarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }

  const AbrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  const AbrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }

  const AbrirCerarModalVer = () => {
    setModalVer(!modalVer)
  }

  const SeleccionarRegistro = (registro, caso) => {
    setBody(registro);
    switch(caso) {
      case "Editar":
        AbrirCerrarModalEditar()
        break;

      case "Eliminar":
        AbrirCerrarModalEliminar()
        break;

      case "Ver":
        AbrirCerarModalVer()
        break;

      default:
        break;
    }
  }

  React.useEffect(() => {
    getParqueo()
    getCliente()
    getMarca()
    getPago()
    getDocumento()
    getDescuento()

  }, [])

  const formatDate = (dateString) => {
    if (dateString == null){
      return '----'
    } else {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/El_Salvador'
      };
  
      return new Date(dateString).toLocaleString(undefined, options);
    }
  }

  /**************************************************************************************************
  ************************************ Construccion de modales ************************************
  ************************************************************************************************ */

  const bodyInsertar = (
    <div className={styles.modal}>
      <Typography variant='h4'>Nuevo Registro</Typography>
      <br /><br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack sx={{width: 400, margin:'auto'}}>
            <Autocomplete
              id='cmbCliente'
              getOptionLabel={(cliente) => `${cliente.cliente}`}
              options={cliente}
              sx={{width:280}}
              isOptionEqualToValue={(option, value) =>
                option.cliente === value.cliente
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, cliente) => (
                <Box component="li" {...props} key={cliente.IdCliente}>
                  {cliente.cliente}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChangeCliente(event, value, "IdCliente")
              }
              renderInput={(params) => <TextField {...params} label="Cliente" variant='outlined' />}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack sx={{width: 300, margin:'auto'}}>
            <Autocomplete
              id='cmbMarca'
              getOptionLabel={(marca) => `${marca.Marca}`}
              options={marca}
              sx={{width:280}}
              isOptionEqualToValue={(option, value) =>
                option.Marca === value.Marca
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, marca) => (
                <Box component="li" {...props} key={marca.IdMarca}>
                  {marca.Marca}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChangeMarca(event, value, "IdMarca")
              }
              renderInput={(params) => <TextField {...params} label="Marca" variant='outlined' />}
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            color='primary'
            margin='normal'
            variant='outlined'
            label='Modelo'
            name='Modelo'
            fullWidth
            onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            color='primary'
            margin='normal'
            variant='outlined'
            label='Placa'
            name='Placa'
            fullWidth
            onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Btn variant='secondary' onClick={() => AbrirCerarModalInsertar()}>Cancelar</Btn>
        <Btn variant='primary' style={{marginLeft:'5px'}} onClick={() => Guardar()}>Guardar</Btn>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <Typography variant='h4'>Cerrar Ventar</Typography>
      <br/><br/>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <label><b>Fecha/Hora Ingreso:</b></label>&nbsp;
          <label> {body&&body.FechaIngreso}</label>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label><b>Cliente:</b></label>&nbsp;
          <label>{body&&body.cliente}</label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Vehículo:</b></label>&nbsp;
          <label>{body&&body.vehiculo}</label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Placa:</b></label>&nbsp;
          <label>{body&&body.Placa}</label>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Stack sx={{width:150, margin:'auto'}}>
            <Autocomplete
              id='cmbPago'
              getOptionLabel={(pago) => `${pago.FormaPago}`}
              options={pago}
              sx={{width:150}}
              isOptionEqualToValue={(option, value) =>
                option.FormaPago === value.FormaPago
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, pago) => (
                <Box component="li" {...props} key={pago.IdFormaPago}>
                  {pago.FormaPago}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChangePago(event, value, "IdFormaPago")
              }
              renderInput={(params) => <TextField {...params} label="Forma Pago" variant='outlined' />} 
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack sx={{width:170, margin:'auto'}}>
            <Autocomplete
              id='cmbDocumento'
              getOptionLabel={(documento) => `${documento.NombreDocumento} / ${documento.Abreviacion}`}
              options={documento}
              sx={{width:170}}
              isOptionEqualToValue={(option, value) =>
                option.NombreDocumento === value.NombreDocumento
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, documento) => (
                <Box component='li' {...props} key={documento.IdDocumento}>
                  {documento.NombreDocumento} / {documento.Abreviacion}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChangeDocumento(event, value, "IdDocumento")
              }
              renderInput={(params) => <TextField {...params} label='Comprobante' variant='outlined' />}
            />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack sx={{width:170, margin:'auto'}}>
            <Autocomplete
              id='cmbDescuento'
              getOptionLabel={(descuento) => `${descuento.NombreSocio} / ${descuento.Descuento}`}
              options={descuento}
              sx={{width:170}}
              isOptionEqualToValue={(option, value) =>
                option.NombreSocio === value.NombreSocio
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, descuento) => (
                <Box component='li' {...props} key={descuento.IdDescuento}>
                  {descuento.NombreSocio} / {descuento.Descuento}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChangeDescuento(event, value, "IdDescuento")
              }
              renderInput={(params) => <TextField {...params} label='Descuento' variant='outlined' />}
            />
          </Stack>
        </Grid>
      </Grid>
      <br/><br/>
      <div align="right">
        <Btn variant='secondary' onClick={() => AbrirCerrarModalEditar()}>Cancelar</Btn>
        <Btn variant='primary' style={{marginLeft:'5px'}} onClick={() => Editar()}>Cerrar Venta</Btn>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <Typography variant='h4'>Eliminar Registro</Typography>
      <br/>
      <p>¿Está seguro que desea eliminar el registo <b>#{body&&body.IdRegistro}</b>?</p>
      <div align="right">
        <Btn variant='secondary' onClick={() => AbrirCerrarModalEliminar()}>Cancelar</Btn>
        <Btn variant='danger' style={{marginLeft:'5px'}} onClick={() => Eliminar(body)}>Eliminar</Btn>
      </div>
    </div>
  )

  const bodyVer = (
    <div className={styles.modal}>
      <Typography variant='h4'>Detalle de Registro #{body&&body.IdRegistro}</Typography>
      <br/><br/>
      <label><b>Datos cliente:</b></label>
      <br/><br/>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <label><b>Nombres:</b></label>
        </Grid>
        <Grid item xs={3}>
          <label><b>Apellidos:</b></label>
        </Grid>
        <Grid item xs={3}>
          <label><b>Telefono:</b></label>
        </Grid>
        <Grid item xs={3}>
          <label><b>DUI:</b></label>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <label>{body&&body.nombres}</label>
        </Grid>
        <Grid item xs={3}>
          <label>{body&&body.apellidos}</label>
        </Grid>
        <Grid item xs={3}>
          <label>{body&&body.Telefono}</label>
        </Grid>
        <Grid item xs={3}>
          <label>{body&&body.Dui}</label>
        </Grid>
      </Grid>
      <br/><br/>
      <label><b>Datos Vehiculo:</b></label>
      <br/><br/>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label><b>Marca:</b></label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Modelo:</b></label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Placa:</b></label>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label>{body&&body.Marca}</label>
        </Grid>
        <Grid item xs={4}>
          <label>{body&&body.Modelo}</label>
        </Grid>
        <Grid item xs={4}>
          <label>{body&&body.Placa}</label>
        </Grid>
      </Grid>
      <br/><br/>
      <label><b>Datos Registro:</b></label>
      <br/><br/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label><b>Fecha Ingreso:</b></label>
        </Grid>
        <Grid item xs={6}>
          <label><b>Fecha Salida:</b></label>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label>{formatDate(body&&body.FechaIngreso)}</label>
        </Grid>
        <Grid item xs={6}>
          <label>{formatDate(body&&body.FechaSalida)}</label>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label><b>Forma Pago:</b></label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Comprobante:</b></label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Descuento:</b></label>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label>{body&&body.FormaPago}</label>
        </Grid>
        <Grid item xs={4}>
          <label>{body&&body.comprobante}</label>
        </Grid>
        <Grid item xs={4}>
          <label>{body&&body.NombreSocio} - {body&&body.Descuento}</label>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label><b>Total Tiempo:</b></label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Precio por Hora:</b></label>
        </Grid>
        <Grid item xs={4}>
          <label><b>Total:</b></label>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <label>{body&&body.TotalTiempo}</label>
        </Grid>
        <Grid item xs={4}>
          <label>$1.00</label>
        </Grid>
        <Grid item xs={4}>
          <label>{body&&body.Total}</label>
        </Grid>
      </Grid>
      <br/><br/>
      <div align="right">
        <Btn variant='primary' onClick={() => AbrirCerarModalVer()}>Cerrar</Btn>
      </div>
    </div>
  )

  const columns = [
    {title: 'ID', field: 'IdRegistro'},
    {title: 'NOMBRES', field: 'nombres'},
    {title: 'APELLIDOS', field: 'apellidos'},
    {title: 'VEHICULO', field: 'vehiculo'},
    {title: 'PLACA', field: 'Placa'},
    {title: 'FECHA INGRESO', type: 'datetime', field: 'FechaIngreso'},
    {title: 'FECHA SALIDA', type: 'datetime', field: 'FechaSalida'},
    {title: 'IdUsuario', field: 'IdUsuario', hidden: true},
    {title: 'IdMarca', field: 'IdMarca', hidden: true},
  ]

  return (
    <div className='parqueo'>
      <Typography variant='h3'>Parqueo</Typography>
      <Btn variant='primary' onClick={() => AbrirCerarModalInsertar()} style={{marginBottom:'5px'}}>Nuevo +</Btn>
      <br />
      <MaterialTable
        columns={columns}
        data={data}
        title=""
        actions={[
          {
            icon: 'check',
            tooltip: 'Cerrar Registro',
            onClick: (event, rowData) => SeleccionarRegistro(rowData, "Editar")
          },
          {
            icon: 'visibility',
            tooltip: "Ver Registro",
            onClick: (event, rowData) => SeleccionarRegistro(rowData, "Ver")
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Registro',
            onClick: (event, rowData) => SeleccionarRegistro(rowData, "Eliminar")
          }
        ]}
        options={
          {
            exportButton: true,
            actionsColumnIndex: -1,
            dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
          }
        }
        localization={{
          header: {
            actions: 'ACCIONES'
          }
        }}/>
      <ToastContainer />
      <Modal
        open={modalInsertar}
        onClose={AbrirCerarModalInsertar}>
          {bodyInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={AbrirCerrarModalEditar}>
          {bodyEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={AbrirCerrarModalEliminar}>
          {bodyEliminar}
      </Modal>
      <Modal
        open={modalVer}
        onClose={AbrirCerarModalVer}>
          {bodyVer}
      </Modal>
    </div>
  )
}

export default Parqueo