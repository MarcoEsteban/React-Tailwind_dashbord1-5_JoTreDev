import React from 'react'

export interface CardProps {
    children: React.ReactNode
    title?: string
    subtitle?: string
    action?: React.ReactNode
    className?: string
    padding?: boolean
}

const Card: React.FC<CardProps> = ({ 
    children, 
    title,
    subtitle,
    action,
    className = '',
    padding = true,
}) => {
    return (
        <div 
            className={`
                bg-secundary-100 rounded-2xl shadow-xl shadow-black/10 border border-white/5
                ${padding ? 'p-5 md:p-6 lg:p-8' : ''}
                ${className}
            `}
        >
            {(title || subtitle || action) && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                    <div>
                        {title && <h3 className="text-white font-semibold text-base md:text-lg">{title}</h3>}
                        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </div>
    )
}

export default Card
