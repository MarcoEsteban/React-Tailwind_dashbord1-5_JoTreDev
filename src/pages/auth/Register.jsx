import React, {useState} from 'react'
// LINK PARA LA RUTA:
import {Link} from "react-router-dom";
// ICONS:
import {
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine,
    RiUserLine
} from "react-icons/ri";

const Register = () => { /*
    ESTADO PARA CAMBIAR LOS ICONS DE LOS OJOS:
    showPassword ==> Constante que contiene el valor del Estado.
    setShowPassword ==> Funcion que se ocupa de actualizar el 
                        Estado (True | False) del useState(false).
  */
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-secundary-100 p-8 rounded-xl m-2 w-auto lg:w-[470px]">
                <h1 className="text-4xl text-center uppercase font-bold tracking-[5px] text-white m-8">
                    Crear
                    <span className="text-primary">Cuenta</span>
                </h1>
                <form className="bg-secundary-100 mb-4">
                    {/***************** Button Google ************************/}
                    <button className="flex items-center justify-center gap-4 bg-secundary-900 font-bold w-full py-3 px-4 rounded-xl mb-4 text-gray-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-4 h-4"/>
                        Registrate con google
                    </button>

                    {/****************** Input Nombre ************************/}
                    <div className="relative mb-4">
                        {/*Icon User*/}
                        <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary"/>
                        <input type="text" className="py-3 pl-8 px-4 bg-secundary-900 w-full outline-none rounded-xl" placeholder="Nombre(s)"/>
                    </div>

                    {/******************* Input Apellido *********************/}
                    <div className="relative mb-4">
                        {/*Icon User*/}
                        <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary"/>
                        <input type="text" className="py-3 pl-8 px-4 bg-secundary-900 w-full outline-none rounded-xl" placeholder="Apellidos"/>
                    </div>

                    {/******************* Input Email ************************/}
                    <div className="relative mb-4">
                        {/*Icon Email*/}
                        <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary"/>
                        <input type="email" className="py-3 pl-8 px-4 bg-secundary-900 w-full outline-none rounded-xl" placeholder="Correo electrónico"/>
                    </div>

                    {/******************** Input Password ********************/}
                    <div className="relative mb-4">
                        {/*Icon Password*/}
                        <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary"/>
                        <input type={
                                showPassword ? "text" : "password"
                            }
                            className="py-3  px-8 bg-secundary-900 w-full outline-none rounded-xl"
                            placeholder="Contraseña"/> {/* CONDICION PARA QUE SE MUESTRE EL ICON DE ACUERDO A SU ESTADO */}
                        {
                        showPassword ? (< RiEyeOffLine onClick =
                            {() => setShowPassword(!showPassword)
                        }
                        className = "absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary" />) : (
                            <RiEyeLine onClick={
                                    () => setShowPassword(!showPassword)
                                }
                                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"/>
                        )
                    } </div>

                    {/************** Input Confirmar Password ****************/}
                    <div className="relative mb-8">
                        {/*Icon Password*/}
                        <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary"/>
                        <input type={
                                showPassword ? "text" : "password"
                            }
                            className="py-3  px-8 bg-secundary-900 w-full outline-none rounded-xl"
                            placeholder="Confirmar Contraseña"/> {/* CONDICION PARA QUE SE MUESTRE EL ICON DE ACUERDO A SU ESTADO */}
                        {
                        showPassword ? (< RiEyeOffLine onClick =
                            {() => setShowPassword(!showPassword)
                        }
                        className = "absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary" />) : (
                            <RiEyeLine onClick={
                                    () => setShowPassword(!showPassword)
                                }
                                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"/>
                        )
                    } </div>

                    {/****************** Button Submit ***********************/}
                    <div>
                        <Link to="/login">
                            <button type="submit" className="bg-primary text-black font-bold text-sm uppercase w-full px-4 py-3 rounded-xl transition-colors">
                                Registrar
                            </button>
                        </Link>
                    </div>
                </form>

                {/************************ Link ******************************/}
                {/* <div className="flex flex-col items-center gap-4"> */}
                {/* Los {Link} son como las etiquetas <a href=""></a> */}
                {/* <span className="flex items-center gap-3">
                    ¿Ya tienes cuenta? <Link to="/auth" className="text-primary font-bold hover:text-gray-100 transition-colors"> Ingresa</Link>
                    </span>
                </div> */} 
            </div>
        </div>
    )
}

export default Register
