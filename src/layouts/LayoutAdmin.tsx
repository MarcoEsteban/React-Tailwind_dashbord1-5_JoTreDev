import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useUIStore } from '../store';

const LayoutAdmin = () => {
    const { sidebarCollapsed } = useUIStore()
    
    return (
        <div className="min-h-screen bg-secundary-900">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content - Adjusts left padding based on sidebar */}
            <div 
                className={`
                    flex flex-col min-h-screen
                    transition-all duration-300 ease-out
                    ${sidebarCollapsed ? 'lg:pl-[88px]' : 'lg:pl-[280px]'}
                `}
            >
                <Header/>
                <main className="flex-1 w-full">
                    <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 max-w-[1920px] mx-auto">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default LayoutAdmin
