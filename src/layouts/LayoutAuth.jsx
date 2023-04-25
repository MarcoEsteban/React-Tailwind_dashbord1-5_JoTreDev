import React from 'react'
// El componente <Outlet>. Este elemento es usado dentro del componente declarado en la ruta padre para renderizar sus elementos <Route> hijos.
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Outlet/>
        </div>
    )
}

export default LayoutAuth