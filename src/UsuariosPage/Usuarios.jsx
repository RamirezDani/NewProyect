import React, { useState, useEffect } from 'react'
import { actualizarDocDataBase, consultaDb, consultaUnElementoDb } from '../config/firebase';
import NavbarComponent from "../shared/components/NavbarComponent";


export const Usuarios = () => {



    const [listaUsuarios, setListaUsuarios] = useState([])



    const cargarUsuarios = async () => {

        const listaTemporal = await consultaDb('lista-usuarios')
        // console.log(listaTemporal[0].rol);

        setListaUsuarios(listaTemporal)

    }



    useEffect(() => {

        cargarUsuarios()
    }, [])



    const handleSelectRol = async (e, id) => {

        const elemTemp = await consultaUnElementoDb('lista-usuarios', id)

        const email = elemTemp.email;
        const estado = elemTemp.estado;
        const rol = e;

        const producto = {
            email,
            estado,
            rol
        }

        actualizarDocDataBase('lista-usuarios', id, producto)

    }


    const handleSelectEstado = async (e, id) => {

        const elemTemp = await consultaUnElementoDb('lista-usuarios', id)
        const email = elemTemp.email;
        const estado = e;
        const rol = elemTemp.rol;

        const producto = {
            email,
            estado,
            rol
        }

        actualizarDocDataBase('lista-usuarios', id, producto)

    }


    return (
        <div className="container mt-3 ">
            <NavbarComponent />
            <table className="table table-striped table-bordered 
            align-middle border-dark mt-4" >

                <thead className="table-dark">
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Estado</th>

                    </tr>
                </thead>

                <tbody>

                    {
                        listaUsuarios.map((prod, index) => (

                            <tr key={prod.id} className="text-center">
                                <th scope="row" >{index + 1}</th>
                                <td >{prod.email}</td>
                                <td>

                                    <select id="mySelectUsuariosRol"
                                        className="form-select text-secondary border-dark"
                                        onChange={(e, a) => handleSelectRol(e.target.value, prod.id)}>

                                        {prod.rol === 'Vendedor' ?

                                            <>

                                                <option value="Vendedor">Vendedor</option>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Sin Rol">Sin Rol</option>
                                            </> :
                                            'No hay'}


                                        {prod.rol === 'Administrador' ?

                                            <>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Vendedor">Vendedor</option>
                                                <option value="Sin Rol">Sin Rol</option>

                                            </> :
                                            'No hay'}


                                        {prod.rol === 'Sin Rol' ?

                                            <>
                                                <option value="Sin Rol">Sin Rol</option>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Vendedor">Vendedor</option>
                                                

                                            </> :
                                            'No hay'}


                                    </select>

                                </td>
                                <td>

                                    <select id="mySelectUsuariosEstado"
                                        className="form-select text-secondary border-dark"
                                        onChange={(e, a) => handleSelectEstado(e.target.value, prod.id)}>

                                        {prod.estado === 'No Autorizado' ?
                                            <>
                                                <option value="No Autorizado">No Autorizado</option>
                                                <option value="Autorizado">Autorizado</option>
                                                <option value="Pendiente">Pendiente</option>
                                            </>

                                            : 'No hay'}

                                        {prod.estado === 'Autorizado' ?
                                            <>
                                                <option value="Autorizado">Autorizado</option>
                                                <option value="No Autorizado">No Autorizado</option>
                                                <option value="Pendiente">Pendiente</option>
                                            </>

                                            : 'No hay'}

                                        {prod.estado === 'Pendiente' ?
                                            <>
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="No Autorizado">No Autorizado</option>
                                                <option value="Autorizado">Autorizado</option>
                                            </>

                                            : 'No hay'}


                                    </select>


                                </td>

                            </tr>
                        ))

                    }
                </tbody>



            </table>
        </div>
    )
}
