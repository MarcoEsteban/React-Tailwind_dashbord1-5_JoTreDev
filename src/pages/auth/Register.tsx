import { useState } from 'react'
import { Link } from "react-router-dom";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiUserLine, RiGoogleLine, RiArrowLeftSLine } from "react-icons/ri";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="bg-secundary-100 p-6 md:p-8 lg:p-10 rounded-2xl w-full max-w-md mx-auto relative">
        
        <Link 
          to="/auth" 
          className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <RiArrowLeftSLine className="text-xl" />
          <span className="text-sm hidden sm:inline">Volver</span>
        </Link>

        <div className="text-center mb-6 md:mb-8 mt-8 md:mt-0">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <span className="text-primary font-bold text-2xl">FB</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center uppercase font-bold tracking-wider text-white">
            Crear <span className="text-primary">Cuenta</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Regístrate en Farmacia Bótica</p>
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-secundary-900 font-semibold py-3 md:py-4 px-4 rounded-xl mb-6 text-gray-100 hover:bg-secundary-800 transition-colors">
          <RiGoogleLine className="text-xl" />
          <span className="hidden sm:inline">Registrarse con</span> Google
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-700 w-full"></div>
          <span className="absolute px-4 bg-secundary-100 text-gray-500 text-sm">o</span>
        </div>

        <form className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-3 text-primary" />
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Nombre" />
            </div>
            <div className="relative">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-3 text-primary" />
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Apellido" />
            </div>
          </div>

          <div className="relative">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-3 text-primary" />
            <input
              type="email"
              className="w-full py-3 pl-10 pr-4 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Correo electrónico" />
          </div>

          <div className="relative">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-3 text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-3 pl-10 pr-12 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Contraseña" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-3 hover:text-primary transition-colors text-gray-400"
            >
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          </div>

          <div className="relative">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-3 text-primary" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full py-3 pl-10 pr-12 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Confirmar contraseña" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-3 hover:text-primary transition-colors text-gray-400"
            >
              {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          </div>

          <button type="submit" className="w-full bg-primary text-black font-bold text-sm uppercase py-3 md:py-4 rounded-xl hover:bg-primary/90 transition-colors">
            Crear Cuenta
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth" className="text-primary font-semibold hover:text-gray-100 transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
