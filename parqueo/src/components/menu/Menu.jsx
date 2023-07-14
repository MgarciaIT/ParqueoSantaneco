import './menu.scss'
import * as React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function Menu() {

    const {currentUser} = React.useContext(AuthContext)
    
  return (
    <div className='menu'>
        <div className='container'>
            <div className='menuList'>
                <div className='item'>
                    <HomeOutlinedIcon />
                    <Link to='/' className='link'>Inicio</Link>
                </div>
                <div className='item'>
                    <PersonOutlinedIcon />
                    <Link to='/usuarios' className='link'>Usuarios</Link>
                </div>
                <div className='item'>
                    <GroupsOutlinedIcon />
                    <Link to='/clientes' className='link'>Clientes</Link>
                </div>
                <div className='item'>
                    <DirectionsCarOutlinedIcon />
                    <Link to='/parqueo' className='link'>Parqueo</Link>
                </div>
                {currentUser.IdRol === 1 ? (
                    <div className='item'>
                        <InsertDriveFileOutlinedIcon />
                        <Link to='/reportes' className='link'>Reportes</Link>
                    </div>
                ): null}
            </div>
        </div>
    </div>
  )
}

export default Menu