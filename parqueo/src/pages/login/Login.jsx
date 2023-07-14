/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo de Login                                 *
****************************************************************/

import "./login.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { TextField } from "@mui/material"
import { Button as Btn, } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const [inputs, setInputs] = React.useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    const { login } = React.useContext(AuthContext)
    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            await login(inputs)
            navigate("/home")
        } catch (err) {
            ToastError("Hubo un error al iniciar sesion, compruebe los campos solicitados")
        }
    }
    const ToastError = (msj) => {
        toast.error(msj, {
          position: toast.POSITION.TOP_CENTER
        })
      }

    return (
        <div className='login'>
            <div className='card'>
                <div className='left'>
                    
                </div>
                <div className='right'>
                    <h1>LOGIN</h1>
                    <form>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Usuario'
                            name='username'
                            onChange={handleChange} />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Contraseña'
                            name='password'
                            onChange={handleChange} />
                        <ToastContainer />
                        <Btn
                            fullWidth
                            variant='secondary'
                            onClick={handleLogin}>Iniciar Sesiòn
                        </Btn>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login