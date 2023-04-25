import React, {useState} from 'react'
// LINK PARA LAS RUTAS:
import {Link} from "react-router-dom";

// ICONS:
import {BsPersonCircle} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import {RiArrowRightSLine} from "react-icons/ri";
import {AiFillSetting, AiOutlineCloseSquare} from "react-icons/ai";
import {HiUserGroup, HiMenu} from "react-icons/hi";
import {ImUserPlus, ImTruck} from "react-icons/im";
import {TbReportAnalytics} from "react-icons/tb";
import {MdInventory} from "react-icons/md";
import {FaShoppingCart, FaAngleRight} from "react-icons/fa";

const Sidebar = () => {
    //
    /*
        ESTADO PARA CAMBIAR LOS ICONS DE LOS OJOS:
        showSubMenu ==> Constante que contiene el valor del Estado.
        setShowSubMenu ==> Funcion que se ocupa de actualizar el 
                            Estado (True | False) del useState(false).
    */
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    // highlight = resaltar;
    // const [highlightSubMenu, setHighlightSubMenu] = useState(false);

    return (
        <div>
            <div className={`bg-secundary-100 xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 flex flex-col xl:items-center justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all`}>
                <div> {/* <span></span> */}
                    {/************************* LOGO *************************/}
                    <h1 className="flex gap-2 text-center text-2xl font-bold  xl:p-6 py-6 px-[17px]">
                        Farmacia
                        <span className="text-primary font-mono uppercase">Bótica</span>
                    </h1>
                    {/************************* MENU *************************/}
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <BsPersonCircle className="text-primary"/>
                                    Gestionar Perfil
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <HiUserGroup className="text-primary"/>
                                    Gestionar Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <ImUserPlus className="text-primary"/>
                                    Gestionar Roles
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <ImTruck className="text-primary"/>
                                    Gestionar Proveedor
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <TbReportAnalytics className="text-primary"/>
                                    Gestionar Reportes
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <FaShoppingCart className="text-primary"/>
                                    Gestionar Venta
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="flex items-center gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                                    <MdInventory className="text-primary"/>
                                    Gestionar Inventario
                                </Link>
                            </li>
                            <li>
                                <button onClick={
                                        () => setShowSubMenu(!showSubMenu)
                                    }
                                    className="w-full flex items-center justify-between gap-5 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors w-ful">
                                    <span className="flex items-center gap-4">
                                        <BiCategory className="text-primary"/>
                                        Gestionar Categoria
                                    </span>
                                    <RiArrowRightSLine className={
                                        `mt-1 ${
                                            showSubMenu && "rotate-90"
                                        } transition-all`
                                    }/>
                                </button>
                                {/* Si !showSubMenu es falso entonces indico que agrege 'hidden' */}
                                <ul className={
                                    `my-2 ${                                     showSubMenu ? "h-[200px]" : "h-0"
                                    } overflow-y-hidden transition-all`
                                }>
                                    <li>
                                        <Link to="/"
                                            onClick={
                                                () => setHighlightSubMenu(highlightSubMenu)
                                            }
                                            className={`py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secundary-100 hover:text-white transition-colors`}>
                                            Laboratorio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secundary-100 hover:text-white transition-colors">
                                            Concentración
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secundary-100 hover:text-white transition-colors">
                                            Presentación
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/***************************** SETING ***************************/}
                <nav className="flex justify-center mb-4">
                    <Link to="/" className="flex justify-center items-center gap-4 px-4 py-2 rounded-lg hover:bg-secundary-900 transition-colors">
                        <AiFillSetting className="text-primary"/>
                        Configuración Sistema
                    </Link>
                </nav>
            </div>
            <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden fixed bottom-4 right-4 text-primary text-4xl z-50">
                {!showMenu ? <HiMenu /> : <AiOutlineCloseSquare/>}
            </button>
        </div>
    )
}

export default Sidebar
