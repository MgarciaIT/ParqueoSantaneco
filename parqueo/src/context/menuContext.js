/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 15/05/2023                                             *
 * @description Modulo para ocultar el menu lateral             *
****************************************************************/

import * as React from 'react'

export const MenuContext = React.createContext()

export const MenuContextProvider = ({children}) => {
    const [menu, setMenu] = React.useState(
        JSON.parse(localStorage.getItem("menu")) || true
    )
    const toogleM = () => {
        setMenu(!menu)
    }

    React.useEffect(() => {
        localStorage.setItem("menu", menu)
    }, [menu])

    return (
        <MenuContext.Provider value={{ menu, toogleM }}>
            {children}
        </MenuContext.Provider>
    )
}
