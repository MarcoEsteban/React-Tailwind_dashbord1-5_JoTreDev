import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { RiArrowLeftSLine, RiArrowRightSLine, RiMenu3Line } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { ImUserPlus, ImTruck } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { MdInventory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useUIStore } from '../store';

interface MenuItem {
    id: string
    label: string
    icon: React.ElementType
    path: string
    submenu?: { label: string; path: string }[]
}

const menuItems: MenuItem[] = [
    { id: 'profile', label: 'Gestionar Perfil', icon: FaShoppingCart, path: '/profile' },
    { id: 'users', label: 'Gestionar Usuarios', icon: HiUserGroup, path: '/users' },
    { id: 'roles', label: 'Gestionar Roles', icon: ImUserPlus, path: '/roles' },
    { id: 'suppliers', label: 'Gestionar Proveedor', icon: ImTruck, path: '/suppliers' },
    { id: 'reports', label: 'Gestionar Reportes', icon: TbReportAnalytics, path: '/reports' },
    { id: 'sales', label: 'Gestionar Venta', icon: FaShoppingCart, path: '/sales' },
    { id: 'inventory', label: 'Gestionar Inventario', icon: MdInventory, path: '/inventory' },
    { id: 'categories', label: 'Gestionar Categoria', icon: BiCategory, path: '/categories', 
        submenu: [
            { label: 'Laboratorio', path: '/categories/lab' },
            { label: 'Concentración', path: '/categories/concentration' },
            { label: 'Presentación', path: '/categories/presentation' },
        ] 
    },
]

const Sidebar = () => {
    const location = useLocation()
    const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore()
    const [showSubMenu, setShowSubMenu] = useState<string | null>(null)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    useEffect(() => {
        const activeItem = menuItems.find(item => 
            location.pathname === item.path || item.submenu?.some(sub => sub.path === location.pathname)
        )
        if (activeItem?.submenu) {
            setShowSubMenu(activeItem.id)
        }
    }, [location.pathname])

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileOpen])

    const toggleSubMenu = (id: string) => {
        setShowSubMenu(showSubMenu === id ? null : id)
    }

    const closeMobileMenu = () => {
        setIsMobileOpen(false)
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed top-0 left-0 h-screen flex flex-col bg-secundary-100 z-50
                    transition-all duration-300 ease-out
                    ${sidebarCollapsed ? 'w-[88px]' : 'w-[280px]'}
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Header */}
                <div className="h-16 lg:h-[72px] px-4 lg:px-5 border-b border-white/5 flex items-center">
                    <div className="flex items-center justify-between w-full">
                        {!sidebarCollapsed ? (
                            <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                                    <span className="text-black font-bold text-lg">FB</span>
                                </div>
                                <div>
                                    <h1 className="text-white font-bold text-lg tracking-tight leading-tight">Farmacia</h1>
                                    <p className="text-primary font-mono text-xs uppercase tracking-widest">Bótica</p>
                                </div>
                            </Link>
                        ) : (
                            <Link to="/" className="mx-auto" onClick={closeMobileMenu}>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                                    <span className="text-black font-bold text-lg">FB</span>
                                </div>
                            </Link>
                        )}
                        
                        <button 
                            onClick={() => {
                                if (window.innerWidth < 1024) {
                                    closeMobileMenu()
                                } else {
                                    toggleSidebarCollapse()
                                }
                            }}
                            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-primary hover:text-black text-white transition-all duration-200"
                            title={sidebarCollapsed ? 'Expandir' : 'Colapsar'}
                        >
                            {sidebarCollapsed ? (
                                <RiArrowRightSLine className="text-xl" />
                            ) : (
                                <RiArrowLeftSLine className="text-xl" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 scrollbar-thin">
                    <ul className="space-y-0.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = location.pathname === item.path || (item.submenu && showSubMenu === item.id)
                            const isHovered = hoveredItem === item.id
                            
                            return (
                                <li key={item.id}>
                                    {item.submenu ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleSubMenu(item.id)}
                                                onMouseEnter={() => setHoveredItem(item.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                onClickCapture={closeMobileMenu}
                                                className={`
                                                    w-full flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group relative
                                                    ${isActive 
                                                        ? 'bg-primary/15 text-primary' 
                                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                    }
                                                    ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'}
                                                `}
                                            >
                                                <Icon className={`text-xl flex-shrink-0 transition-transform duration-200 ${isActive || isHovered ? 'scale-110' : ''}`} />
                                                
                                                {!sidebarCollapsed && (
                                                    <>
                                                        <span className="flex-1 text-left font-medium text-sm truncate">{item.label}</span>
                                                        <RiArrowRightSLine className={`text-sm transition-transform duration-200 flex-shrink-0 ${showSubMenu === item.id ? 'rotate-90' : ''}`} />
                                                    </>
                                                )}
                                                
                                                {sidebarCollapsed && (
                                                    <div className="absolute left-full ml-2 px-3 py-2 bg-secundary-900 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 pointer-events-none border border-white/10">
                                                        {item.label}
                                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-secundary-900" />
                                                    </div>
                                                )}
                                            </button>
                                            
                                            {!sidebarCollapsed && showSubMenu === item.id && (
                                                <ul className="ml-4 mt-1 space-y-0.5 overflow-hidden">
                                                    {item.submenu.map((subItem, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                to={subItem.path}
                                                                onClick={closeMobileMenu}
                                                                className={`
                                                                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                                                                    ${location.pathname === subItem.path
                                                                        ? 'bg-primary/10 text-primary'
                                                                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                                                                    }
                                                                `}
                                                            >
                                                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${location.pathname === subItem.path ? 'bg-primary' : 'bg-gray-600'}`}></span>
                                                                <span className="truncate">{subItem.label}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <Link
                                                to={item.path}
                                                onMouseEnter={() => setHoveredItem(item.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                                onClick={closeMobileMenu}
                                                className={`
                                                    flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group relative
                                                    ${isActive 
                                                        ? 'bg-primary/15 text-primary' 
                                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                    }
                                                    ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'}
                                                `}
                                            >
                                                <Icon className={`text-xl flex-shrink-0 transition-transform duration-200 ${isActive || isHovered ? 'scale-110' : ''}`} />
                                                
                                                {!sidebarCollapsed && (
                                                    <span className="font-medium text-sm truncate">{item.label}</span>
                                                )}
                                                
                                                {isActive && !sidebarCollapsed && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-lg shadow-primary/50" />
                                                )}
                                                
                                                {sidebarCollapsed && (
                                                    <div className="absolute left-full ml-2 px-3 py-2 bg-secundary-900 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 pointer-events-none border border-white/10">
                                                        {item.label}
                                                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-secundary-900" />
                                                    </div>
                                                )}
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="h-16 lg:h-[72px] px-2 border-t border-white/5 flex items-center">
                    <div className="relative w-full">
                        <Link
                            to="/settings"
                            onClick={closeMobileMenu}
                            className={`
                                flex items-center gap-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 group
                                ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'}
                            `}
                        >
                            <AiFillSetting className="text-xl flex-shrink-0" />
                            {!sidebarCollapsed && <span className="font-medium text-sm">Configuración</span>}
                            
                            {sidebarCollapsed && (
                                <div className="absolute left-full ml-2 px-3 py-2 bg-secundary-900 rounded-xl text-white text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 pointer-events-none border border-white/10">
                                    Configuración
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-secundary-900" />
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Hamburger Button */}
            <button 
                onClick={() => setIsMobileOpen(!isMobileOpen)} 
                className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-black shadow-lg shadow-primary/30 flex items-center justify-center z-40 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                {isMobileOpen ? (
                    <RiArrowLeftSLine className="text-2xl" />
                ) : (
                    <RiMenu3Line className="text-2xl" />
                )}
            </button>
        </>
    )
}

export default Sidebar
