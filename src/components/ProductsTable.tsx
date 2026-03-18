import { memo, useState } from 'react'
import { RiEditLine, RiDeleteBinLine, RiEyeLine, RiMoreLine, RiTableLine, RiAddLine, RiSearchLine } from "react-icons/ri"

type ProductStatus = 'active' | 'out' | 'low'

interface Product {
    id: number
    name: string
    category: string
    stock: number
    price: string
    status: ProductStatus
}

const getStatusBadge = (status: ProductStatus) => {
    const styles: Record<ProductStatus, { bg: string; text: string; label: string; dot: string }> = {
        active: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', label: 'Activo', dot: 'bg-emerald-400' },
        out: { bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-400', label: 'Agotado', dot: 'bg-rose-400' },
        low: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', label: 'Bajo stock', dot: 'bg-amber-400' }
    }
    const style = styles[status]
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold border ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
            {style.label}
        </span>
    )
}

const ProductCard = memo<Product>(({ name, category, stock, price, status }) => {
    const [showActions, setShowActions] = useState(false)

    const getStockColor = (stock: number) => {
        if (stock === 0) return 'text-rose-400'
        if (stock < 50) return 'text-amber-400'
        return 'text-emerald-400'
    }

    return (
        <div 
            className="group relative bg-gradient-to-br from-secundary-100/80 to-secundary-100/40 rounded-xl p-4 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate pr-2 group-hover:text-primary transition-colors">{name}</h4>
                    <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        {category}
                    </p>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
                    >
                        <RiMoreLine className="text-lg" />
                    </button>
                    {showActions && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-secundary-200 rounded-xl shadow-2xl border border-white/10 overflow-hidden z-20 animate-scale-in">
                            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                                <RiEyeLine className="text-primary" /> Ver details
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                                <RiEditLine className="text-blue-400" /> Editar
                            </button>
                            <button className="w-full px-4 py-2.5 text-left text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors">
                                <RiDeleteBinLine /> Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-medium">Precio</p>
                    <p className="text-primary font-bold text-xl mt-0.5">{price}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider font-medium">Stock</p>
                    <p className={`font-bold text-lg mt-0.5 ${getStockColor(stock)}`}>{stock}</p>
                </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5">
                {getStatusBadge(status)}
            </div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
        </div>
    )
})

ProductCard.displayName = 'ProductCard'

const ProductsTable = memo(() => {
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
    const [searchQuery, setSearchQuery] = useState('')

    const products: Product[] = [
        { id: 1, name: "Paracetamol 500mg", category: "Analgésicos", stock: 150, price: "$5.99", status: "active" },
        { id: 2, name: "Ibuprofeno 400mg", category: "Antiinflamatorios", stock: 85, price: "$7.50", status: "active" },
        { id: 3, name: "Amoxicilina 250mg", category: "Antibióticos", stock: 0, price: "$12.99", status: "out" },
        { id: 4, name: "Vitamina C 1000mg", category: "Vitaminas", stock: 200, price: "$8.99", status: "active" },
        { id: 5, name: "Omeprazol 20mg", category: "Gástricos", stock: 45, price: "$9.99", status: "low" },
    ]

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="bg-gradient-to-br from-secundary-100 to-secundary-100/50 rounded-2xl overflow-hidden border border-white/5 animate-fade-in">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-white font-bold text-lg md:text-xl font-display">Productos recientes</h3>
                        <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} productos encontrados</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-secundary-200 rounded-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                            />
                        </div>
                        
                        {/* View Toggle */}
                        <div className="flex bg-secundary-200 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                aria-label="Table view"
                            >
                                <RiTableLine className="text-lg" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                aria-label="Grid view"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                        </div>
                        
                        <button className="px-4 py-2.5 bg-primary text-black text-sm font-bold rounded-xl hover:bg-primary-400 transition-all flex items-center gap-2 shadow-lg shadow-primary/25">
                            <RiAddLine className="text-lg" />
                            <span className="hidden sm:inline">Agregar</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' ? (
                <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                /* Table View */
                <div className="overflow-x-auto">
                    <table className="w-full hidden md:table">
                        <thead>
                            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                                <th className="px-6 py-4 font-semibold">Producto</th>
                                <th className="px-6 py-4 font-semibold">Categoría</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Precio</th>
                                <th className="px-6 py-4 font-semibold">Estado</th>
                                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, idx) => (
                                <tr 
                                    key={product.id} 
                                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-white font-medium group-hover:text-primary transition-colors">{product.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{product.category}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold ${
                                            product.stock === 0 ? 'text-rose-400' : 
                                            product.stock < 50 ? 'text-amber-400' : 'text-emerald-400'
                                        }`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-primary font-bold">{product.price}</span>
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                                                <RiEyeLine />
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all">
                                                <RiEditLine />
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-all">
                                                <RiDeleteBinLine />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile Card View */}
                    <div className="md:hidden divide-y divide-white/5">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-semibold truncate">{product.name}</p>
                                        <p className="text-gray-500 text-xs mt-0.5">{product.category}</p>
                                    </div>
                                    {getStatusBadge(product.status)}
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div>
                                            <p className="text-gray-600 text-[10px] uppercase">Precio</p>
                                            <p className="text-primary font-bold">{product.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 text-[10px] uppercase">Stock</p>
                                            <p className={`font-bold ${product.stock === 0 ? 'text-rose-400' : product.stock < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                {product.stock}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                                            <RiEyeLine />
                                        </button>
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 transition-all">
                                            <RiEditLine />
                                        </button>
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 transition-all">
                                            <RiDeleteBinLine />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
})

ProductsTable.displayName = 'ProductsTable'

export default ProductsTable
