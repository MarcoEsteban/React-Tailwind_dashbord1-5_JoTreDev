import React, { forwardRef, useState } from 'react'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ComponentType<{ className?: string }>
    error?: string
    helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
    type = 'text', 
    placeholder, 
    icon: Icon, 
    error, 
    helperText,
    className = '',
    ...props 
}, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    return (
        <div className="relative">
            <div className="relative">
                {Icon && (
                    <Icon className="absolute top-1/2 -translate-y-1/2 left-3 md:left-4 text-primary/70" />
                )}
                <input
                    ref={ref}
                    type={isPassword && showPassword ? 'text' : type}
                    placeholder={placeholder}
                    className={`
                        w-full py-3 md:py-4 px-4 md:px-5 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500
                        transition-all duration-200
                        ${Icon ? 'pl-10 md:pl-12' : ''} 
                        ${isPassword ? 'pr-12' : ''}
                        ${error 
                            ? 'ring-2 ring-rose-500/50 focus:ring-rose-500' 
                            : 'focus:ring-2 focus:ring-primary/50'
                        }
                        ${className}
                    `}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 right-3 md:right-4 hover:text-primary transition-colors text-gray-400"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {showPassword ? (
                            <RiEyeOffLine className="w-5 h-5" />
                        ) : (
                            <RiEyeLine className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-rose-400 text-xs md:text-sm mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p className="text-gray-500 text-xs md:text-sm mt-1.5">{helperText}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export default Input
