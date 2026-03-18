import { Link, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from 'react'
import { RiNotification3Line, RiArrowDownSLine, RiLogoutCircleRLine, RiSettings3Line, RiMenu3Line, RiSearchLine } from "react-icons/ri"
import { useAuthStore, useUIStore } from '../store'

const Header = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuthStore()
    const { notifications, unreadCount, markAsRead, toggleSidebarCollapse } = useUIStore()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const userMenuRef = useRef<HTMLDivElement>(null)
    const notifMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false)
            }
            if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/auth')
    }

    return (
        <header className="h-16 lg:h-[72px] bg-secundary-100 border-b border-white/5 sticky top-0 z-30 px-4 lg:px-6">
            <div className="h-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSidebarCollapse}
                        className="xl:hidden p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
                        aria-label="Toggle sidebar"
                    >
                        <RiMenu3Line className="text-xl" />
                    </button>
                    
                    {/* Search */}
                    <div className="hidden sm:flex items-center gap-2 bg-secundary-200/50 rounded-xl px-4 py-2.5 border border-white/5 focus-within:border-primary/50 transition-colors">
                        <RiSearchLine className="text-gray-500 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="bg-transparent outline-none text-white placeholder-gray-500 w-40 lg:w-56 text-sm"
                        />
                        <kbd className="hidden md:inline-flex items-center px-2 py-0.5 text-xs text-gray-500 bg-white/5 rounded">⌘K</kbd>
                    </div>
                </div>

                <nav className="flex items-center gap-1 md:gap-2">
                    {/* Notifications */}
                    <div className="relative" ref={notifMenuRef}>
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications)
                                setShowUserMenu(false)
                            }}
                            className="relative p-2 md:p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-200 active:scale-95"
                        >
                            <RiNotification3Line className="text-xl md:text-2xl" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-rose-500/50">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-secundary-200 rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden animate-scale-in origin-top-right">
                                <div className="p-4 border-b border-white/5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white font-bold">Notificaciones</h3>
                                        {unreadCount > 0 && (
                                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                                                {unreadCount} nuevas
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                                    {notifications.length > 0 ? (
                                        notifications.slice(0, 5).map((notification) => (
                                            <button
                                                key={notification.id}
                                                onClick={() => {
                                                    markAsRead(notification.id)
                                                    setShowNotifications(false)
                                                }}
                                                className={`w-full text-left p-4 hover:bg-white/5 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${notification.read ? 'bg-gray-600' : 'bg-primary shadow-lg shadow-primary/50'}`} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-medium truncate">{notification.message || 'Nueva notificación'}</p>
                                                        <p className="text-gray-500 text-xs mt-1">
                                                            {new Date(notification.timestamp).toLocaleString('es-ES', { 
                                                                day: 'numeric', 
                                                                month: 'short', 
                                                                hour: '2-digit', 
                                                                minute: '2-digit' 
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                                                <RiNotification3Line className="text-3xl text-gray-600" />
                                            </div>
                                            <p className="text-gray-400 text-sm">No hay notificaciones</p>
                                        </div>
                                    )}
                                </div>
                                {notifications.length > 0 && (
                                    <div className="p-3 border-t border-white/5 bg-secundary-100/50">
                                        <button className="w-full py-2 text-sm text-primary hover:text-primary-400 font-medium transition-colors">
                                            Ver todas
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => {
                                setShowUserMenu(!showUserMenu)
                                setShowNotifications(false)
                            }}
                            className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-95"
                        >
                            <div className="relative">
                                <img
                                    src={user?.avatar || "https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380"}
                                    className="w-9 h-9 md:w-11 md:h-11 object-cover rounded-xl ring-2 ring-white/10 group-hover:ring-primary/50 transition-all"
                                    alt="Profile"
                                />
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-secundary-100"></span>
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-white text-sm font-semibold leading-tight">{user?.name || 'Usuario'}</p>
                                <p className="text-gray-500 text-xs truncate max-w-36">{user?.email || 'email@ejemplo.com'}</p>
                            </div>
                            <RiArrowDownSLine className="hidden md:block text-gray-400 transition-transform duration-200" />
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-72 bg-secundary-200 rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden animate-scale-in origin-top-right">
                                <div className="p-4 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.avatar || "https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380"}
                                            className="w-12 h-12 object-cover rounded-xl"
                                            alt="Profile"
                                        />
                                        <div>
                                            <p className="text-white font-bold">{user?.name || 'Usuario'}</p>
                                            <p className="text-gray-400 text-sm">{user?.email || 'email@ejemplo.com'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        Mi Perfil
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                            <RiSettings3Line className="text-lg text-purple-400" />
                                        </div>
                                        Configuración
                                    </Link>
                                </div>
                                <div className="p-2 border-t border-white/5">
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setShowUserMenu(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-rose-500/20 flex items-center justify-center">
                                            <RiLogoutCircleRLine className="text-lg" />
                                        </div>
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
