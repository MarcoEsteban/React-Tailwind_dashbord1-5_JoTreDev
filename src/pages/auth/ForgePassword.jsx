import React, { useState } from 'react'
// LINK PARA LA RUTA:
import { Link } from "react-router-dom";
// ICONS:
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const ForgePassword = () => {
  /*
    ESTADO PARA CAMBIAR LOS ICONS DE LOS OJOS:
    showPassword ==> Constante que contiene el valor del Estado.
    setShowPassword ==> Funcion que se ocupa de actualizar el 
                        Estado (True | False) del useState(false).
  */
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-secundary-100 p-8 rounded-xl m-2 w-auto lg:w-[470px]">
      <h1 className="text-4xl text-center uppercase font-bold tracking-[5px] text-white m-8">
        Recuperar <span className="text-primary">Contraseña</span>
      </h1>
      <form className="bg-secundary-100 mb-4">
        {/************************ Input Email ******************************/}
        <div className="relative mb-4">
          {/*Icon Email*/}
          <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input
            type="email"
            className="py-3 pl-8 px-4 bg-secundary-900 w-full outline-none rounded-xl"
            placeholder="Correo electrónico" />
        </div>

        {/*********************** Button Submit ******************************/}
        <div>
          <button type="submit" className="bg-primary text-black font-bold text-sm uppercase w-full px-4 py-3 rounded-xl transition-colors">
            Recuperar Contraseña
          </button>
        </div>
      </form>

      {/*************************** Link *************************************/}
      <div className="flex flex-col items-center gap-4">
        {/* Los {Link} son como las etiquetas <a href=""></a> */}
        <span className="flex items-center gap-3">
          ¿Ya tienes cuenta? <Link to="/auth" className="text-primary font-bold hover:text-gray-100 transition-colors"> Ingresa</Link>
        </span>
        <span className="flex items-center gap-3">
          ¿No tienes cuenta? <Link to="/auth/registro" className="text-primary font-bold hover:text-gray-100 transition-colors"> Registrate</Link>
        </span>
      </div>
    </div>
  )
}

export default ForgePassword