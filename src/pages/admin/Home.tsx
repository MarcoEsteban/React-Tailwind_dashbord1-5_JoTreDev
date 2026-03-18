import { memo } from 'react'
import StatsCards from '../../components/StatsCards'
import SalesChart from '../../components/SalesChart'
import ProductsTable from '../../components/ProductsTable'

interface PopularProduct {
    name: string
    sales: number
    change: number
}

const PopularProducts = memo(() => {
    const popularProducts: PopularProduct[] = [
        { name: "Paracetamol", sales: 234, change: 12 },
        { name: "Ibuprofeno", sales: 189, change: 8 },
        { name: "Vitamina C", sales: 156, change: -3 },
        { name: "Aspirina", sales: 123, change: 5 },
        { name: "Alcohol", sales: 98, change: -2 },
    ]

    const maxSales = Math.max(...popularProducts.map(p => p.sales))

    return (
        <div className="bg-gradient-to-br from-secundary-100 to-secundary-100/50 p-5 md:p-6 rounded-2xl border border-white/5 h-full animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-bold text-base md:text-lg font-display">Productos populares</h3>
                    <p className="text-gray-500 text-xs md:text-sm">Top 5 más vendidos</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                </div>
            </div>
            
            <div className="space-y-4">
                {popularProducts.map((item, index) => (
                    <div key={index} className="group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-secundary-200/50 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-primary transition-colors">
                                    {index + 1}
                                </span>
                                <span className="text-gray-300 text-sm md:text-base font-medium group-hover:text-white transition-colors">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-primary font-bold">{item.sales}</span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                    item.change > 0 
                                        ? 'bg-emerald-500/10 text-emerald-400' 
                                        : 'bg-rose-500/10 text-rose-400'
                                }`}>
                                    {item.change > 0 ? '+' : ''}{item.change}%
                                </span>
                            </div>
                        </div>
                        <div className="ml-9 h-1.5 bg-secundary-200/50 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(item.sales / maxSales) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Mini Chart Placeholder */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Tendencia semanal</p>
                <div className="flex items-end justify-between h-12 gap-1">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-sm transition-all duration-300 hover:from-primary/50 hover:to-primary/20"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
})

PopularProducts.displayName = 'PopularProducts'

const Home = () => {
    return (
        <div className="space-y-5 md:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-gray-500 text-sm">Sistema activo</span>
                        <span className="text-gray-600 mx-2">•</span>
                        <span className="text-gray-500 text-sm">
                            {new Date().toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long' 
                            })}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-secundary-100 text-gray-400 text-sm font-medium rounded-xl border border-white/5 hover:bg-secundary-200 hover:text-white transition-all flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtros
                    </button>
                    <button className="px-5 py-2.5 bg-primary text-black text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Nuevo reporte
                    </button>
                </div>
            </div>

            <StatsCards />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                <div className="xl:col-span-2">
                    <SalesChart />
                </div>
                <div>
                    <PopularProducts />
                </div>
            </div>
            
            <ProductsTable />
        </div>
    )
}

export default Home
