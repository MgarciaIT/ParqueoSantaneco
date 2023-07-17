/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo CRUD de Usuarios                         *
****************************************************************/
import "./usuarios.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, TextField, Modal, Stack, Autocomplete, Box, } from "@mui/material"
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


const Usuarios = () => {
  /********************************************************************************************************
   ****************************************** HOOKS y constatentes ****************************************
  ****************************************************************************************************** */
  const styles = useStyles()
  const [data, setData] = React.useState([])
  const [modalInsertar, setModalInsertar] = React.useState(false)
  const [modalEditar, setModalEditar] = React.useState(false)
  const [modalEliminar, setModalEliminar] = React.useState(false)
  const [rol, setRol] = React.useState([])
  const [body, setBody] = React.useState({
    IdRol: 0,
    NombreUsuario: "",
    ContraUsuario: ""
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

  const SelectChange = (event, value, name) => {
    setBody((prevState) => ({
      ...prevState, [name]: value.IdRol
    }))
  }


  /***********************************************************************************************
   ********************************** Peticiones axios a la api **********************************
  ********************************************************************************************* */

  const getUser = async() => {
    await axios.get("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/usuarios")
    .then(response => {
      console.log(response.data)
      setData(response.data)
    }).catch (error => {
    })
  }

  
  const getRol = async() => {
    await axios.get("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/usuarios/roles")
    .then(response => {
      setRol(response.data)
    }).catch(error => {
    })
  }

  const Guardar = async () => {
    console.log(body);
    await axios.post("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/usuarios/crear", body)
    .then(response => {
      setData(data.concat(response.data))
      getUser()
      ToastExito("Usuario creado con exito")
      AbrirCerrarModalInsertar()
    }).catch(error => {
      ToastError("Hubo un error al guardar el usuario")
    })
  }

  const Editar = async () => {
    await axios.post("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/usuarios/editar", body)
    .then(response => {
      setData(data.concat(response.data))
      getUser()
      ToastExito("Usuario editado con exito")
      AbrirCerrarModalEditar()
    }).catch(error => {
      ToastError("Hubo un error al editar el usuario")
    })
  }

  const Eliminar = async (id) => {
    await axios.post("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/usuarios/eliminar", id)
    .then(response => {
      getUser()
      ToastExito("Usuario Eliminado")
      AbrirCerrarModalEliminar()
    }).catch(error => {
      ToastError("Hubo un error al eliminar el usuario")
    })
  }

/*****************************************************************************************************************
 * ******************************* Funciones para Abrir y cerrar los modales       *******************************
 ********************************* y funcion para seleccionar una fila en la tabla *******************************
*************************************************************************************************************** */

  //Abrir y Cerrar Modal Insertar
  const AbrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }

  //Abrir y Cerra Modal Editar
  const AbrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  //Abrir Cerrar modal Eliminar
  const AbrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }

  // Metodo para seleccionar datos de una fila
  const SeleccionarUsuario = (usuario, caso) => {
    setBody(usuario);
    (caso==="Editar")? AbrirCerrarModalEditar(): AbrirCerrarModalEliminar()
  }

  //Metodo para iniciar las funciones get
  React.useEffect(() => {
    getUser()
    getRol()
  }, [])


/**************************************************************************************************
 ************************************ Construccion de modales ************************************
************************************************************************************************ */
  const bodyInsertar = (
    <div className={styles.modal}>
      <Typography variant="h4">Nuevo Usuario</Typography>
      <br /><br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            autoFocus
            color="primary"
            margin="normal"
            variant="outlined"
            label="NombreUsuario"
            name="NombreUsuario"
            fullWidth
            onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            type="password"
            color="primary"
            margin="normal"
            variant="outlined"
            label="ContraUsuario"
            name="ContraUsuario"
            fullWidth
            onChange={handleChange} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack sx={{width:250, margin:"auto"}}>
            <Autocomplete 
              id="cmbRol"
              getOptionLabel={(rol) => `${rol.Rol}`}
              options={rol}
              sx={{width:250}}
              isOptionEqualToValue={(option, value) =>
                option.Rol === value.Rol
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, rol) => (
                <Box component="li" {...props} key={rol.IdRol}>
                  {rol.Rol}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChange(event, value, "IdRol")
              }
              renderInput={(params) => <TextField {...params} label="Rol" variant="outlined" />}
            />
          </Stack>
        </Grid>
      </Grid>
      <div align="right">
        <Btn variant="secondary" onClick={() => AbrirCerrarModalInsertar()}>Cancelar</Btn>
        <Btn variant="primary" style={{marginLeft:"5px"}} onClick={() => Guardar()}>Guardar</Btn>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <Typography variant="h4">Editar usuario</Typography>
      <br /><br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            autoFocus
            color="primary"
            margin="normal"
            variant="outlined"
            label="NombreUsuario"
            name="NombreUsuario"
            fullWidth
            onChange={handleChange}
            value={body&&body.NombreUsuario} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={styles.inputMaterial}
            color="primary"
            margin="normal"
            variant="outlined"
            label="ContraUsuario"
            name="ContraUsuario"
            fullWidth
            onChange={handleChange} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack sx={{width:250, margin:"auto"}}>
            <Autocomplete
              id="cmbRol"
              getOptionLabel={(rol) => `${rol.Rol}`}
              options={rol}
              sx={{width:250}}
              isOptionEqualToValue={(option, value) =>
                option.Rol === value.Rol
              }
              noOptionsText={"No se encontraron resultados"}
              renderOption={(props, rol) => (
                <Box component="li" {...props} key={rol.IdRol}>
                  {rol.Rol}
                </Box>
              )}
              onChange={(event, value) =>
                SelectChange(event, value, "IdRol")}
              renderInput={(params) => <TextField {...params} label="Rol" variant="outlined" />}
            />
          </Stack>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Btn variant="secondary" onClick={() => AbrirCerrarModalEditar()}>Cancelar</Btn>
        <Btn variant="primary" style={{marginLeft:"5px"}} onClick={() => Editar()}>Editar</Btn>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>¿Està seguro que de sea eliminar el usuario <b>{body&&body.NombreUsuario}</b>?</p>
      <div align="right">
        <Btn variant="secondary" onClick={() => AbrirCerrarModalEliminar()}>Cancelar</Btn>
        <Btn variant="danger" style={{marginLeft:"5px"}} onClick={() => Eliminar(body)}>Eliminar</Btn>
      </div>
    </div>
  )

  const columns = [
    {title: "ID", field: "IdUsuario"},
    {title: "USUARIO", field: "NombreUsuario"},
    {title: "ROL", field: "Rol"},
    {title: "CONTRASEÑA", field: "ContraUsuario", hidden: true}
  ]

  return (
    <div className="usuarios">
      <div>
        <Typography variant="h3">Usuarios</Typography>
      </div>
      <br /><br />
      <Btn variant="primary" onClick={() => AbrirCerrarModalInsertar()}>Nuevo +</Btn>
      <br /><br />
      <MaterialTable
        title=""
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Usuario',
            onClick: (event, rowData) => SeleccionarUsuario(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Usuario',
            onClick: (event, rowData) => SeleccionarUsuario(rowData, "Eliminar")
          }
        ]}
        options={
          {
            exportButton: true,
            actionsColumnIndex: -1
          }
        }
        localization={{
          header: {
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

export default Usuarios