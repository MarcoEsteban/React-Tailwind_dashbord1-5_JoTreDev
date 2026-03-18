import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const SalesChart = () => {
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Ventas 2025',
                data: [1200, 1900, 3000, 2500, 4200, 3800],
                fill: true,
                borderColor: '#BDEB00',
                backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea: { top: number; bottom: number } | null } }) => {
                    const ctx = context.chart.ctx
                    const gradient = ctx.createLinearGradient(0, context.chart.chartArea?.top || 0, 0, context.chart.chartArea?.bottom || 300)
                    gradient.addColorStop(0, 'rgba(189, 235, 0, 0.25)')
                    gradient.addColorStop(1, 'rgba(189, 235, 0, 0)')
                    return gradient
                },
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#BDEB00',
                pointBorderColor: '#1E1F25',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#BDEB00',
            },
            {
                label: 'Ventas 2024',
                data: [1000, 1500, 2200, 2100, 3200, 3000],
                fill: true,
                borderColor: '#6366f1',
                backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; chartArea: { top: number; bottom: number } | null } }) => {
                    const ctx = context.chart.ctx
                    const gradient = ctx.createLinearGradient(0, context.chart.chartArea?.top || 0, 0, context.chart.chartArea?.bottom || 300)
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)')
                    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')
                    return gradient
                },
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#1E1F25',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6366f1',
            }
        ]
    }

    const options: Record<string, unknown> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1E1F25',
                titleColor: '#fff',
                bodyColor: '#9ca3af',
                borderColor: 'rgba(189, 235, 0, 0.3)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 16,
                displayColors: true,
                usePointStyle: true,
                pointStyle: 'circle',
                titleFont: {
                    size: 14,
                    weight: 'bold',
                    family: 'Plus Jakarta Sans'
                },
                bodyFont: {
                    size: 13,
                    family: 'Plus Jakarta Sans'
                },
                callbacks: {
                    label: function(context: { dataset: { label?: string }; parsed: { y: number }; dataIndex: number }) {
                        return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 12,
                        family: 'Plus Jakarta Sans'
                    },
                    padding: 8
                },
                border: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 12,
                        family: 'Plus Jakarta Sans'
                    },
                    padding: 12,
                    callback: function(value: number) {
                        return '$' + value.toLocaleString()
                    }
                },
                border: {
                    display: false
                }
            }
        }
    }

    return (
        <div className="bg-gradient-to-br from-secundary-100 to-secundary-100/50 p-5 md:p-6 rounded-2xl border border-white/5 h-full animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-white font-bold text-lg md:text-xl font-display">Ventas mensuales</h3>
                    <p className="text-gray-500 text-sm mt-1">Comparativa de rendimiento</p>
                </div>
                
                {/* Legend */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-primary/60"></span>
                        <span className="text-gray-400 text-sm font-medium">2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-1 rounded-full bg-indigo-500"></span>
                        <span className="text-gray-400 text-sm font-medium">2024</span>
                    </div>
                </div>
            </div>
            
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-secundary-200/50 rounded-xl p-3 border border-white/5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Total 2025</p>
                    <p className="text-white font-bold text-lg mt-1">$16,600</p>
                    <p className="text-emerald-400 text-xs font-medium mt-1">+12.5% vs 2024</p>
                </div>
                <div className="bg-secundary-200/50 rounded-xl p-3 border border-white/5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Promedio</p>
                    <p className="text-white font-bold text-lg mt-1">$2,767</p>
                    <p className="text-gray-400 text-xs mt-1">por mes</p>
                </div>
                <div className="bg-secundary-200/50 rounded-xl p-3 border border-white/5">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Pico</p>
                    <p className="text-white font-bold text-lg mt-1">$4,200</p>
                    <p className="text-gray-400 text-xs mt-1">Mayo 2025</p>
                </div>
            </div>
            
            {/* Chart */}
            <div className="h-[250px] md:h-[300px] lg:h-[320px]">
                <Line data={data} options={options as never} />
            </div>
        </div>
    )
}

export default SalesChart
