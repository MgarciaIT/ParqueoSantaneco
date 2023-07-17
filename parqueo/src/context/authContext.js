/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 15/05/2023                                             *
 * @description Modulo para el inicio de sesion y creacion de   *
 *              cookies y local storage                         *
****************************************************************/

import axios from 'axios'
import * as React from 'react'

export const AuthContext = React.createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    /**
     * Funcion con peticion Axios para iniciar sesion
     */
    const login = async (inputs) => {
        const res = await axios.post("https://parqueosantaneco-36063810dd2b.herokuapp.com/api/auth/login", inputs, {
            withCredentials:true
        })

        setCurrentUser(res.data)
        console.log(currentUser);
    }

    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}