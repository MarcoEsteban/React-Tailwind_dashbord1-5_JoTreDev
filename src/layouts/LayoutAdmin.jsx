import React from 'react'
// El componente <Outlet>. Este elemento es usado dentro del componente declarado en la ruta padre para renderizar sus elementos <Route> hijos.
import {Outlet} from "react-router-dom";
// COMPONENTES:
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const LayoutAdmin = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
            <Sidebar/>
            <div className="xl:col-span-5">
                <Header/>
                <div className="h-[90vh] overflow-y-scroll p-8">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
