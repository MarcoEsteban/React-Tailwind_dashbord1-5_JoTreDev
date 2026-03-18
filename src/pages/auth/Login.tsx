import { Link, useNavigate } from "react-router-dom"
import { RiMailLine, RiLockLine, RiGoogleLine, RiArrowLeftSLine } from "react-icons/ri"
import { Input, Button, Card } from '../../components/ui'
import { useForm } from '../../hooks'
import { useAuthStore } from '../../store'
import { loginSchema, sanitizeObject } from '../../utils'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading: authLoading } = useAuthStore()
  
  const { 
    values, 
    errors, 
    handleChange, 
    validate 
  } = useForm({
    initialValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const sanitizedValues = sanitizeObject(values)
    const isValid = validate(loginSchema)
    
    if (!isValid) return
    
    const result = await login(sanitizedValues)
    
    if (result.success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <span className="text-primary font-bold text-2xl">FB</span>
          </div>
          <h1 className="text-3xl md:text-4xl text-center uppercase font-bold tracking-wider text-white">
            Iniciar <span className="text-primary">Sesión</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Accede a tu cuenta de Farmacia Bótica</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <Button 
            type="button"
            variant="secondary"
            className="w-full"
          >
            <RiGoogleLine className="text-xl" />
            <span className="hidden sm:inline">Continuar con</span> Google
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-700 w-full"></div>
            <span className="absolute px-4 bg-secundary-100 text-gray-500 text-sm">o</span>
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            icon={RiMailLine}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            icon={RiLockLine}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />

          <div className="flex justify-end">
            <Link to="/auth/olvide-password" className="text-sm text-gray-400 hover:text-primary transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button 
            type="submit" 
            fullWidth
            loading={authLoading}
            className="py-3.5 md:py-4"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 md:mt-8 text-center">
          <span className="text-gray-500 text-sm">¿No tienes cuenta?</span>
          <Link to="/auth/registro" className="block mt-2">
            <span className="text-primary font-semibold hover:text-gray-100 transition-colors">
              Crear cuenta nueva
            </span>
          </Link>
        </div>

        <Link 
          to="/" 
          className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <RiArrowLeftSLine className="text-xl" />
          <span className="text-sm hidden sm:inline">Volver al inicio</span>
        </Link>
      </Card>
    </div>
  )
}

export default Login
