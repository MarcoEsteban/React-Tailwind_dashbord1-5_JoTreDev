import { Link } from "react-router-dom";
import { RiMailLine, RiArrowLeftSLine, RiCheckLine } from "react-icons/ri";

const ForgePassword = () => {
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
            Recuperar <span className="text-primary">Contraseña</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Ingresa tu correo para restablecer tu contraseña</p>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-3 text-primary" />
            <input
              type="email"
              className="w-full py-3 pl-10 pr-4 bg-secundary-900 outline-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Correo electrónico" />
          </div>

          <button type="submit" className="w-full bg-primary text-black font-bold text-sm uppercase py-3 md:py-4 rounded-xl hover:bg-primary/90 transition-colors">
            Enviar Instrucciones
          </button>
        </form>

        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <RiCheckLine className="text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">¿No recibiste el correo?</p>
              <p className="text-gray-500 text-xs mt-1">Revisa tu carpeta de spam o intenta con otro correo electrónico.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <span className="text-gray-500">¿Ya tienes cuenta?</span>
          <Link to="/auth" className="text-primary font-semibold hover:text-gray-100 transition-colors">
            Inicia sesión
          </Link>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="text-gray-500">¿No tienes cuenta?</span>
          <Link to="/auth/registro" className="text-primary font-semibold hover:text-gray-100 transition-colors">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgePassword
