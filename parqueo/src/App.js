import "./style.scss"
import Footer from './components/footer/Footer'
import Menu from './components/menu/Menu'
import Navbar from './components/navbar/Navbar'
import Clientes from './pages/clientes/Clientes'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Parqueo from './pages/parqueo/Parqueo'
import Reportes from './pages/reportes/Reportes'
import Usuarios from './pages/usuarios/Usuarios'
import * as React from 'react'
import { AuthContext } from './context/authContext'
import { DarkModeContext } from './context/darkModeContext'
import { MenuContext } from './context/menuContext'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const {currentUser} = React.useContext(AuthContext)
  const {darkMode} = React.useContext(DarkModeContext)
  const {menu} = React.useContext(MenuContext)

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{display: 'flex'}}>
            <div style={{display: `${menu ? "block" : "none" }`}}>
              <Menu />
            </div>
            <div style={{flex:6}}>
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return (
        <Navigate to="/login" />
      )
    }
    return (
      children
    )
  }

  const router = createBrowserRouter([
    {
      path:'/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/home',
          element:<Home />
        },
        {
          path:'/usuarios',
          element:<Usuarios />
        },
        {
          path:'/clientes',
          element:<Clientes />
        },
        {
          path:'/parqueo',
          element:<Parqueo />
        },
        {
          path:'/reportes',
          element:<Reportes />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
