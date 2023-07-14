/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo para CRUD de Clientes                    *
****************************************************************/

import './clientes.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, TextField, Modal, } from "@mui/material"
import { Button as Btn, } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
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
  inputMaterial: {
    width: '100%'
  },
  error: {
    color: 'blue',
    fontSize: 'bold'
  }
}))

const Clientes = () => {
  /********************************************************************************************************
   ****************************************** HOOKS y constatentes ****************************************
  ****************************************************************************************************** */
  const styles = useStyles()
  const [data, setData] = React.useState([])
  const [modalInsertar, setModalInsertar] = React.useState(false)
  const [modalEditar, setModalEditar] = React.useState(false)
  const [modalEliminar, setModalEliminar] = React.useState(false)
  const [body, setBody] = React.useState({
    PrimerNombre:"",
    SegundoNombre:"",
    TercerNombre:"",
    PrimerApellido: "",
    SegundoApellido:"",
    TercerApellido:"",
    Edad:"",
    Telefono:"",
    Direccion:"",
    Correo:"",
    Dui:""
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
    console.log(body)
  }

  /***********************************************************************************************
   ********************************** Peticiones axios a la api **********************************
  ********************************************************************************************* */
  const getClientes = async () => {
    await axios.get("http://localhost:4000/api/clientes")
    .then(response => {
      console.log(response.data)
      setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const Guardar = async () => {
    await axios.post("http://localhost:4000/api/clientes/crear", body)
    .then(response => {
      setData(data.concat(response.data))
      getClientes()
      ToastExito("Cliente creado exitosamente")
      AbrirCerrarModalInsertar()
    }).catch(error => {
      ToastError("Hubo un error al crear el cliente")
    })
  }

  const Editar = async () => {
    await axios.post("http://localhost:4000/api/clientes/editar", body)
    .then(response => {
      setData(data.concat(response.data))
      getClientes()
      ToastExito("Cliente editado exitosamente")
      AbrirCerrarModalEditar()
    }).catch(error => {
      ToastError("Hubo un error al editar el cliente")
    })
  }

  const Eliminar = async (id) => {
    await axios.post("http://localhost:4000/api/clientes/eliminar", id)
    .then(response => {
      getClientes()
      ToastExito("Cliente Eliminado")
      AbrirCerrarModalEliminar()
    }).catch(error => {
      ToastError("Hubo un error al eliminar el cliente")
    })
  }

  /*****************************************************************************************************************
    * ******************************* Funciones para Abrir y cerrar los modales       *******************************
    ********************************* y funcion para seleccionar una fila en la tabla *******************************
  *************************************************************************************************************** */
  //Modal Insertar
  const AbrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }

  //Modal Editar
  const AbrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  //Modal Eliminar
  const AbrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }

 // metodo para seleccionar un cliente
  const SeleccionarCliente = (cliente, caso) => {
    setBody(cliente);
    (caso === "Editar")?AbrirCerrarModalEditar() : AbrirCerrarModalEliminar() 
  }

  //Metodo para iniciar las funciones get
  React.useEffect(() => {
    getClientes()
  }, [])

  /**************************************************************************************************
    ************************************ Construccion de modales ************************************
  ************************************************************************************************ */

  //Modal Insertar
  const bodyInsertar = (
    <div className={styles.modal}>
      <Typography variant='h4'>Nuevo Cliente</Typography>
      <br /><br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            autoFocus
            color='primary'
            margin='normal'
            variant='outlined'
            label='Primer Nombre'
            name='PrimerNombre'
            fullWidth
            onChange={handleChange}
            />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Segundo Nombre'
            name='SegundoNombre'
            fullWidth
            onChange={handleChange}
            />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Tercer Nombre'
            name='TercerNombre'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Primer Apellido'
            name='PrimerApellido'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Segundo Apellido'
            name='SegundoApellido'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Tercer Apellido'
            name='TercerApellido'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Edad'
            name='Edad'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
        <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Dui'
            name='Dui'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Telefono'
            name='Telefono'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Direccion'
            name='Direccion'
            fullWidth
            onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Correo'
            name='Correo'
            type='email'
            fullWidth
            onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Btn variant='secondary' onClick={() => AbrirCerrarModalInsertar()}>Cancelar</Btn>
        <Btn variant='primary' style={{marginLeft:'5px'}} onClick={() => Guardar()}>Guardar</Btn>
      </div>
    </div>
  )

  //Modal Editar
  const bodyEditar = (
    <div className={styles.modal}>
      <Typography variant='h4'>Editar Cliente</Typography>
      <br /><br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            autoFocus
            color='primary'
            margin='normal'
            variant='outlined'
            label='Primer Nombre'
            name='PrimerNombre'
            fullWidth
            onChange={handleChange}
            value={body&&body.PrimerNombre}/>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Segundo Nombre'
            name='SegundoNombre'
            fullWidth
            onChange={handleChange}
            value={body&&body.SegundoNombre}/>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Tercer Nombre'
            name='TercerNombre'
            fullWidth
            onChange={handleChange}
            value={body&&body.TercerNombre}/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Primer Apellido'
            name='PrimerApellido'
            fullWidth
            onChange={handleChange}
            value={body&&body.PrimerApellido}/>
        </Grid>
        <Grid item xs={4}>
        <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Segundo Apellido'
            name='SegundoApellido'
            fullWidth
            onChange={handleChange}
            value={body&&body.SegundoApellido}/>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Tercer Apellido'
            name='TercerApellido'
            fullWidth
            onChange={handleChange}
            value={body&&body.TercerApellido}/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Edad'
            name='Edad'
            fullWidth
            onChange={handleChange}
            value={body&&body.Edad}/>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Dui'
            name='Dui'
            fullWidth
            onChange={handleChange}
            value={body&&body.Dui}/>
        </Grid>
        <Grid item xs={4}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Telefono'
            name='Telefono'
            fullWidth
            onChange={handleChange}
            value={body&&body.Telefono}/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Direccion'
            name='Direccion'
            fullWidth
            onChange={handleChange}
            value={body&&body.Direccion}/>
        </Grid>
        <Grid item xs={6}>
          <TextField 
            className={styles.inputMaterial}
            color='primary'
            margin='normal'
            variant='outlined'
            label='Correo'
            name='Correo'
            fullWidth
            onChange={handleChange}
            value={body&&body.Correo}/>
        </Grid>
      </Grid>
      <br /><br />
      <div align='right'>
        <Btn variant='secondary' onClick={() => AbrirCerrarModalEditar()}>Cancelar</Btn>
        <Btn variant='primary' style={{marginLeft:'5px'}} onClick={() => Editar()}>Guardar</Btn>
      </div>
    </div>
  )
  
  //Modal Eliminar
  const bodyEliminar = (
      <div className={styles.modal}>
        <p>¿Está seguro que de sea eliminar el Cliente <b>{body&&body.PrimerNombre}</b>?</p>
      <div align="right">
        <Btn variant='secondary' onClick={() => AbrirCerrarModalEliminar()}>Cancelar</Btn>
        <Btn variant='danger' style={{marginLeft:'5px'}} onClick={() => Eliminar(body)}>Guardar</Btn>
      </div>
    </div>
  )

  const columns = [
    {title: 'ID', field: 'IdCliente'},
    {title: 'CLIENTE', field: 'cliente'},
    {title: 'EDAD', field: 'Edad'},
    {title: 'TELEFONO', field: 'Telefono'},
    {title: 'DIRECCION', field: 'Direccion'},
    {title: 'CORREO', field: 'Correo'},
    {title: 'DUI', field: 'Dui'}
  ]


  return (
    <div className='clientes'>
      <Typography variant='h3'>Clientes</Typography>
      <br /><br />
      <Btn variant='primary' onClick={() => AbrirCerrarModalInsertar()}>Nuevo +</Btn>
      <br /><br />
      <MaterialTable
        columns={columns}
        data={data}
        title=""
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Cliente',
            onClick: (event, rowData) => SeleccionarCliente(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Cliente',
            onClick: (event, rowData) => SeleccionarCliente(rowData, "Eliminar")
          }
        ]}
        options={
          {
            exportButton: true,
            actionsColumnIndex: -1
          }
        }
        localization={{
          header:{
            actions: 'ACCIONES'
          }
        }}
      />
      <ToastContainer />
      <Modal
        open={modalInsertar}
        onClose={AbrirCerrarModalInsertar}>
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
    </div>
  )
}

export default Clientes