import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ClipLoader } from 'react-spinners'

import LayoutAuth from './layouts/LayoutAuth'
import LayoutAdmin from './layouts/LayoutAdmin'

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgePassword = lazy(() => import('./pages/auth/ForgePassword'))
const Home = lazy(() => import('./pages/admin/Home'))
const Chat = lazy(() => import('./pages/admin/Chat'))
const Error404 = lazy(() => import('./pages/Error404'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-secundary-100">
    <ClipLoader color="#00e09e" size={50} />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path='/auth' element={<LayoutAuth />}>
            <Route index element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="olvide-password" element={<ForgePassword />} />
          </Route>

          <Route path="/" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
