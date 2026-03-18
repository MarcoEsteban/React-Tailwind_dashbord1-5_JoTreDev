import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    loading?: boolean
    fullWidth?: boolean
    icon?: React.ComponentType<{ className?: string }>
    size?: 'sm' | 'md' | 'lg'
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon: Icon,
    size = 'md',
    onClick,
    ...props 
}) => {
    const baseStyles = 'font-bold uppercase text-sm tracking-wider transition-all duration-200 flex items-center justify-center gap-2 rounded-xl'
    
    const sizes: Record<string, string> = {
        sm: 'py-2 px-4 text-xs',
        md: 'py-3 px-5',
        lg: 'py-4 px-6 text-base'
    }

    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-primary text-black hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/25',
        secondary: 'bg-secundary-900 text-gray-100 hover:bg-secundary-800 active:scale-[0.98]',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10 active:scale-[0.98]',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]',
        ghost: 'bg-transparent text-gray-300 hover:bg-white/5'
    }

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
                ${baseStyles}
                ${sizes[size]}
                ${variants[variant]}
                ${fullWidth ? 'w-full' : ''}
                ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <>
                    {Icon && <Icon className="text-lg" />}
                    {children}
                </>
            )}
        </button>
    )
}

export default Button
