import React from 'react'
// LINK PARA LAS RUTAS:
import {Link} from "react-router-dom";

// ICONS:
import {RiNotification3Line, RiArrowDownSLine, RiLogoutCircleRLine, RiSettings3Line} from "react-icons/ri";
import {AiFillSetting} from "react-icons/ai";
// LIBRERIA::['https://szhsin.github.io/react-menu/'] | DROPDOWN
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const Header = () => {
    return (
        <header className="h-[7vh] md:h-[10vh] border-b-2 border-secundary-100 p-8 flex items-center justify-end">
            <nav className="flex items-center gap-x-4">
                {/******** BOTON DE NOTIFICACION *********/}
                <Menu 
                    menuButton={<MenuButton className="relative py-2 hover:text-primary transition-colors">
                    <RiNotification3Line className="text-xl font-bold"/>
                    <span className="absolute -top-0 -right-1.5 bg-primary text-black py-0.5 px-[5px] box-content rounded-full text-[8px]">2</span>
                    </MenuButton>} transition >
                    {/* Menu del Dropdown */}
                    <MenuItem>Cut</MenuItem>
                    <MenuItem>Copy</MenuItem>
                    <MenuItem>Paste</MenuItem>
                </Menu>

                {/*********** BOTON DE PERFIL ************/}
                <Menu 
                    menuButton={<MenuButton
                    className="flex items-center gap-x-2 py-2 px-4 hover:text-white">
                    <img
                    src="https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380"className="w-6 h-6 object-cover rounded-full"/>
                    <span>Marco Campos</span>
                    <RiArrowDownSLine/>
                    </MenuButton>}
                    transition
                    menuClassName="bg-secundary-100 p-4 text-gray-300"   
                >
                    {/* Menu del Dropdown */}
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/profile" className="flex items-center gap-x-4 flex-1 rounded-lg transition-colors text-gray-300 hover:bg-secundary-900 py-2 px-6">
                            <img
                            src="https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380"className="w-8 h-8 object-cover rounded-full"/>
                            <div className="flex flex-col text-sm">
                                <span className="text-sm">Marco Campos Subelza</span>
                                <span className="text-xs text-gray-500">marcoscampomc43@gmail.com</span>
                            </div>
                        </Link>
                    </MenuItem>
                    <hr className="my-4 border-gray-500"/>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/configuration" className="flex items-center gap-x-4 flex-1 rounded-lg transition-colors text-gray-300 hover:bg-secundary-900 py-2 px-6">
                            <RiSettings3Line/>
                            Configuración
                        </Link>
                    </MenuItem>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/auth" className="flex items-center gap-x-4 flex-1 rounded-lg transition-colors text-gray-300 hover:bg-secundary-900 py-2 px-6">
                            <RiLogoutCircleRLine/>
                            Cerrar sesión
                        </Link>
                    </MenuItem>
                </Menu>
            </nav>
        </header>
    )
}

export default Header
