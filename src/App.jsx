// LIBRERIA DE LA RUTAS:
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout:
import LayoutAuth from './layouts/LayoutAuth';
import LayoutAdmin from './layouts/LayoutAdmin';
// Pages auth:
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgePassword from "./pages/auth/ForgePassword";
// Pages admin:
import Home from './pages/admin/Home';
import Chat from "./pages/admin/Chat";
import Profile from "./pages/admin/Profile";
import Error404 from './pages/Error404';

function App() {
  // CREAMOS LAS RUTAS:
  return (
    <BrowserRouter>
      <Routes>
        {/* path="name-ruta" element={<name-component/>} */}
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="olvide-password" element={<ForgePassword />} />

        {/*
          Indico una serie de Ruta que contiene un layout, y que siempre quiero
          que se Cargue este Layout, Cuando vaya a la ruta "/".
        */}
        <Route path="/" element={<LayoutAdmin />}>
          {/* 
            index --> Indico que su principal o su primer elemento index que se carge va a ser este. 
          */}
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 
          path="*" --> Indico que cualquira ruta que no se encuentre dentro de los Routes me lance esta pagina de Error. 
        */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
