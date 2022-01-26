import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavbarComponent from '../shared/components/NavbarComponent'
import { ListaUnProy } from '../../BdMongoConf/configBD'
import { useMutation } from '@apollo/client';
import { UPDT_INFO_PROY_LIDER } from '../../BdMongoConf/graphql-operations';


export const UpGenProjLider = () => {

    const [nombre, setNombre] = useState('')
    const [laFecha, setLaFecha] = useState('');   

    const history = useHistory()
    const { id } = useParams()

    const { unProys, load6 } = ListaUnProy(id) 
  

    useEffect(() => {

        if (unProys) {

            setNombre(unProys.proyecto.nombre)
            setLaFecha(unProys.proyecto.fechaIni.substring(0, 10))           
        }
    }, [unProys])


    // ESCRIBE LOS CAMBIOS EN LA BD  
    const [modGenProy] = useMutation(UPDT_INFO_PROY_LIDER)
    const modOneProyGen = async (e) => {
        e.preventDefault();
        await modGenProy({
            variables: {
                _id: id,
                newNombre: nombre,
                newFechaIni: new Date(laFecha)               
            }
        });
        history.push('/ListProjects')
    }

    return (
        <>
            <NavbarComponent />
            <div>{load6 ? <span>Loading...</span> :
                <form>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="card border-dark">
                            <div className="card-header text-white bg-info border-dark">

                                <h3>Editar Proyecto</h3>
                            </div>


                            <div className="card-body text-primary">
                                <h6 className="card-title ">Nombre del Proyecto</h6>
                                <input className="form-control border-dark"
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)}
                                ></input>

                                <h6 className="card-title mt-3">Fecha de Inscripción</h6>
                                <input className="form-control border-dark"
                                    type="date"
                                    value={laFecha}
                                    onChange={(e) => setLaFecha(e.target.value)}
                                ></input>

                               

                            </div>

                            <div className="d-flex justify-content-between">

                                <div className="card-body">
                                    <Link type="button" className="btn btn-secondary border-dark"
                                        to="/ListProjects" >Atras</Link>
                                </div>

                                <div className="card-body text-end">
                                    <button type="submit"
                                        className="btn btn-info border-dark text-white"
                                        onClick={modOneProyGen}
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
