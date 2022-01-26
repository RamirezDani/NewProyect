import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavbarComponent from '../shared/components/NavbarComponent'
import { ListaUsersLider, ListaUnProy } from '../../BdMongoConf/configBD'
import { useMutation } from '@apollo/client';
import { UPDT_INFO_PROY } from '../../BdMongoConf/graphql-operations';


export const UpGenProjects = () => {

    const [nombre, setNombre] = useState('')
    const [laFecha, setLaFecha] = useState('');
    const [nomLider, setNomLider] = useState('');
    const [estado, setEstado] = useState('');
    const [fase, setFase] = useState('');

    const history = useHistory()
    const { id } = useParams()

    const { unProys, load6 } = ListaUnProy(id)


    //CARGA LA BD CON LOS ROLES DE USURIO TIPO LIDER
    const { listaLideres, load8 } = ListaUsersLider();
    // console.log(listaLideres);

    useEffect(() => {

        if (unProys) {

            setNombre(unProys.proyecto.nombre)
            setLaFecha(unProys.proyecto.fechaIni.substring(0, 10))
            setNomLider(unProys.proyecto.nombreLider)
            setEstado(unProys.proyecto.estado)
            setFase(unProys.proyecto.fase)
        }
    }, [unProys])


    // ESCRIBE LOS CAMBIOS EN LA BD  
    const [modGenProy] = useMutation(UPDT_INFO_PROY)
    const modOneProyGen = async (e) => {
        e.preventDefault();
        await modGenProy({
            variables: {
                _id: id,
                newNombre: nombre,
                newFechaIni: new Date(laFecha),
                newNombreLider: nomLider,
                newEstado:estado,
                newFase:fase
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

                                <h6 className="card-title mt-3">Nombre del Líder</h6>
                                {load8 ? <span>Loading8...</span> :
                                    <select value={nomLider} onChange={(event) => setNomLider(event.target.value)} className="form-select text-secondary border-dark" >

                                        {listaLideres.listaUsuariosBDS.map((proy, index) => (
                                            <option key={index} value={proy.nombre}>{proy.nombre}</option>
                                        ))
                                        }
                                    </select>}


                                <h6 className="card-title mt-3">Estado</h6>
                                <select value={estado} onChange={(event) => setEstado(event.target.value)} className="form-select text-secondary border-dark" >
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Activo">Activo</option>
                                </select>

                                <h6 className="card-title mt-3">Fase</h6>
                                <select value={fase} onChange={(event) => setFase(event.target.value)} className="form-select text-secondary border-dark" >
                                    <option value="Sin-Fase">Sin-Fase</option>
                                    <option value="Iniciado">Iniciado</option>
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Terminado">Terminado</option>
                                </select>




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
