import { Component, ReactNode } from 'react'
import { RiErrorWarningLine, RiHome4Line } from 'react-icons/ri'

interface Props {
  children: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-secundary-100 flex items-center justify-center p-4">
          <div className="bg-secundary-900 p-8 rounded-xl max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-500/20 rounded-full">
                <RiErrorWarningLine className="text-5xl text-red-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Algo salió mal
            </h1>
            
            <p className="text-gray-400 mb-6">
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </p>
            
            {this.state.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-left">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-primary/80 transition-colors"
              >
                Reintentar
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 bg-secundary-100 text-white font-bold py-3 px-6 rounded-xl hover:bg-secundary-800 transition-colors"
              >
                <RiHome4Line />
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
