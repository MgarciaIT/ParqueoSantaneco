/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 15/05/2023                                             *
 * @description Modulo para configuracion de modo oscuro        *
****************************************************************/

import * as React from 'react'

export const DarkModeContext = React.createContext()

export const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = React.useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    )
    const toogle = () => {
        setDarkMode(!darkMode)
    }

    React.useEffect(() => {
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode])

    return (
        <DarkModeContext.Provider value={{ darkMode, toogle }}>
            {children}
        </DarkModeContext.Provider>
    )
}