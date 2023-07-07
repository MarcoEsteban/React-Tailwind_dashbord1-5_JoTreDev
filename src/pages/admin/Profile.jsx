import React from 'react'
import { RiEdit2Line } from 'react-icons/ri'

const Profile = () => {
    return (
        <div className="bg-secundary-100 p-8 rounded-lg">
            {/************************ TITULO ********************************/}
            <h1 className="text-xl text-gray-100">Profile</h1>
            <hr className="border-gray-500 my-8" />

            {/********************** FORMULARIO ******************************/}
            <form>
                {/******************** INPUT IMAGE ***************************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Avata</p>
                    </div>
                    <div className="flex-1">
                        <div className="relative mb-2">
                            <img src="https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380" className="w-28 h-28 object-cover rounded-lg" />
                            <label htmlFor="avatar" className="p-2 absolute -top-2 left-24 hover:cursor-pointer  bg-secundary-100 rounded-full hover:bg-secundary-900">
                                <RiEdit2Line />
                            </label>
                            <input type="file" id="avatar" className="hidden" />
                        </div>
                        <p className="text-gray-500 text-sm">
                            Allowed file types: png, jpg, jpeg.
                        </p>
                    </div>
                </div>
                {/*************** INPUT NOMBRE Y APELLIDO ********************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Nombre Completo
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                        <div className="w-full">
                            <input type="text" className="w-full rounded-lg bg-secundary-900 py-2 px-4 outline-none" placeholder='Nombre(s)' />
                        </div>
                        <div className="w-full">
                            <input type="text" className="w-full rounded-lg bg-secundary-900 py-2 px-4 outline-none" placeholder='Apellido(s)' />
                        </div>
                    </div>
                </div>
                {/*************** INPUT NOMBRE EMPRESA *********************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Nombre Empresa
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <input type="text" className="w-full rounded-lg bg-secundary-900 py-2 px-4 outline-none" placeholder='Nombre' />
                    </div>
                </div>
                {/*************** INPUT NUMERO CONTACTO *********************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Numero Contacto
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <input type="text" className="w-full rounded-lg bg-secundary-900 py-2 px-4 outline-none" placeholder='Telefono' />
                    </div>
                </div>
                {/******************** INPUT PAIS ****************************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Pais
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <select name="" id="" className="w-full outline-none bg-secundary-900 py-2 px-4 rounded-lg">
                            <option value="Colombia">Colombia</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Bolivia" selected>Bolivia</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Venezuela">Venezuela</option>
                        </select>
                    </div>
                </div>
                {/******************** INPUT CIUDAD **************************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Ciudad
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <select name="" id="" className="w-full outline-none bg-secundary-900 py-2 px-4 rounded-lg">
                            <option value="Tarija" selected>Tarija</option>
                            <option value="Beni">Beni</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Potosí">Potosí</option>
                            <option value="Chuquisaca">Chuquisaca</option>
                            <option value="Pando">Pando</option>
                            <option value="Santa-Cruz">Santa Cruz</option>
                        </select>
                    </div>
                </div>
                {/******************** INPUT CIUDAD **************************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Ciudad
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <select name="" id="" className="w-full outline-none bg-secundary-900 py-2 px-4 rounded-lg">
                            <option value="Tarija" selected>Tarija</option>
                            <option value="Beni">Beni</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Potosí">Potosí</option>
                            <option value="Chuquisaca">Chuquisaca</option>
                            <option value="Pando">Pando</option>
                            <option value="Santa-Cruz">Santa Cruz</option>
                        </select>
                    </div>
                </div>
                {/******************** INPUT CIUDAD **************************/}
                <div className="flex items-center mb-8">
                    <div className="w-1/4">
                        <p>Ciudad
                            <span className="text-red-500 px-1">*</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <select name="" id="" className="w-full outline-none bg-secundary-900 py-2 px-4 rounded-lg">
                            <option value="Tarija" selected>Tarija</option>
                            <option value="Beni">Beni</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Potosí">Potosí</option>
                            <option value="Chuquisaca">Chuquisaca</option>
                            <option value="Pando">Pando</option>
                            <option value="Santa-Cruz">Santa Cruz</option>
                        </select>
                    </div>
                </div>
            </form>
            <hr className="border-gray-500 my-8" />
            <div className="flex justify-end">
                <button className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">Guardar</button>
            </div>
        </div>
    )
}

export default Profile
