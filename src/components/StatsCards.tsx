import { memo } from 'react'
import { IconType } from 'react-icons'
import { RiShoppingBag3Line, RiMoneyDollarCircleLine, RiUser3Line, RiProductHuntLine, RiArrowUpLine, RiArrowDownLine } from "react-icons/ri"

interface StatCardProps {
    icon: IconType
    title: string
    value: string
    trend?: number
    trendType?: 'up' | 'down'
    index: number
}

const StatCard = memo<StatCardProps>(({ icon: Icon, title, value, trend, trendType, index }) => {
    const TrendIcon = trendType === 'up' ? RiArrowUpLine : RiArrowDownLine
    const trendColor = trendType === 'up' ? 'text-emerald-400' : 'text-rose-400'
    const trendBg = trendType === 'up' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'

    return (
        <div 
            className="group relative bg-gradient-to-br from-secundary-100 to-secundary-100/50 p-5 md:p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Background Gradient Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
            
            {/* Border Gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                    <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:scale-110">
                        <Icon className="text-xl md:text-2xl text-primary filter drop-shadow-lg" />
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${trendBg} ${trendColor}`}>
                            <TrendIcon className="text-sm" />
                            <span>{trend}%</span>
                        </div>
                    )}
                </div>
                
                <div className="mt-5 md:mt-6">
                    <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide uppercase">{title}</p>
                    <p className="text-white text-2xl md:text-3xl font-bold mt-2 font-display tracking-tight">{value}</p>
                </div>
                
                {/* Progress Bar */}
                {trend !== undefined && (
                    <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                trendType === 'up' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-rose-500 to-rose-400'
                            }`}
                            style={{ width: `${Math.min(trend * 5, 100)}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
})

StatCard.displayName = 'StatCard'

const StatsCards = memo(() => {
    const stats: Omit<StatCardProps, 'index'>[] = [
        { icon: RiShoppingBag3Line, title: "Ventas del día", value: "$1,234", trend: 12, trendType: "up" },
        { icon: RiMoneyDollarCircleLine, title: "Ingresos mensuales", value: "$45,678", trend: 8, trendType: "up" },
        { icon: RiUser3Line, title: "Clientes nuevos", value: "89", trend: 3, trendType: "down" },
        { icon: RiProductHuntLine, title: "Productos", value: "456", trend: 5, trendType: "up" },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} index={index} />
            ))}
        </div>
    )
})

StatsCards.displayName = 'StatsCards'

export default StatsCards
