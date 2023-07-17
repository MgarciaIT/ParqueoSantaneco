import './navbar.scss'
import * as React from 'react'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'
import { MenuContext } from '../../context/menuContext'
import { Button } from '@mui/material'

const Navbar = () => {

    const {toogle, darkmode} = React.useContext(DarkModeContext)
    const {currentUser} = React.useContext(AuthContext)
    const {toogleM, menu} = React.useContext(MenuContext)
    const [err, setErr] = React.useState(null)
    const navigate = useNavigate()
    
    console.log(currentUser + menu + err);

    /**
     * Funcion que hace una peticion axios para cerrar cesion
     */
    const logout = async (e) => {
        e.preventDefault()
        try{
            await axios.post("https://parqueosantaneco-36063810dd2b.herokuapp.com/auth/logout")
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.clear();
            navigate("/login")
        } catch(err){
            setErr(err.response.data)
        }
    }

    return (
        <div className='navbar'>
            <div className='left'>
                <MenuIcon onClick={toogleM} />
                <Link to="/" style={{textDecoration: 'none'}}>
                    <span>Parqueo System</span>
                </Link>
                {darkmode ? <WbSunnyOutlinedIcon onClick={toogle} /> : <DarkModeOutlinedIcon onClick={toogle} />}
            </div>
            <div className='right'>
                <Button onClick={logout}>Cerrar Sesion</Button>
            </div>
        </div>
    )
}

export default Navbar