import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavbarComponent from '../shared/components/NavbarComponent'
import { useMutation } from '@apollo/client'
import { ListaUno } from '../../BdMongoConf/configBD'
import { UPDT_INFO_USUR } from '../../BdMongoConf/graphql-operations'



export const UpGenUsers = () => {

    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [estado, setEstado] = useState('')
    const history = useHistory()
    const { id } = useParams()

    //MODIFICA INFO DE UN USUARIO
    const { data, loading } = ListaUno(id)
    
    useEffect(() => {
        if (data){
            setNombre(data.listaUsuariosBD.nombre)
            setTipo(data.listaUsuariosBD.tipo)
            setEstado(data.listaUsuariosBD.estado)
        }
        
    }, [data])
    
    const [modGenUser] =  useMutation(UPDT_INFO_USUR)
    const modOneUserGen = async (e) => {
        e.preventDefault();
        await modGenUser({
            variables: {
                _id:id,
                newNombre: nombre,
                newTipo: tipo,
                newEstado: estado

            }
        });
        history.push('/HomePage/'+tipo)
    }

    return (
        <>
            <NavbarComponent />
            <div>{loading ? <span>Loading...</span> :
                <form>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="card border-dark">
                            <div className="card-header text-white bg-info border-dark">
                                
                                <h3>Editar Usuario</h3>
                            </div>


                            <div className="card-body text-primary">
                                <h6 className="card-title ">Nombre</h6>
                                <input className="form-control border-dark"
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)}
                                ></input>

                                <h6 className="card-title mt-3">Tipo</h6>
                                <select value={tipo} onChange={(event) => setTipo(event.target.value)} className="form-select text-secondary border-dark" >
                                    <option value="Estudiante">Estudiante</option>
                                    <option value="Lider">Lider</option>
                                    <option value="Administrador">Administrador</option>
                                </select>

                                <h6 className="card-title mt-3">Estado</h6>
                                <select value={estado} onChange={(event) => setEstado(event.target.value)} className="form-select text-secondary border-dark" >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="No Autorizado">No Autorizado</option>
                                    <option value="Autorizado">Autorizado</option>
                                </select>


                            </div>

                            <div className="d-flex justify-content-between">

                                <div className="card-body">
                                    <Link type="button" className="btn btn-secondary border-dark"
                                        to={"/HomePage/"+tipo} >Atras</Link>
                                </div>

                                <div className="card-body text-end">
                                    <button type="submit"
                                        className="btn btn-info border-dark text-white"
                                    onClick={modOneUserGen}
                                    >
                                        Cambiar
                                    </button>

                                </div>


                            </div>

                        </div>
                    </div>
                </form>
            }</div>
        </>
    )
}
