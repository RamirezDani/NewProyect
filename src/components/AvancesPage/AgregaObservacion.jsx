import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavbarComponent from '../shared/components/NavbarComponent'
import { UPDT_OBSERVACION } from '../../BdMongoConf/graphql-operations'
import { useMutation } from '@apollo/client'
import { ListaUnProy,UnAvancesUser } from '../../BdMongoConf/configBD';


export const AgregaObservacion = () => {

    const [nombreProy, setNombreProy] = useState('')
    const [idProy, setIdProy] = useState('')
    const [nombreTuto, setNombreTuto] = useState('')
    const [fechaAvan, setFechaAvan] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [aportes, setAportes] = useState('')
    const getObj = JSON.parse(sessionStorage.getItem("user"));
    
    const { id } = useParams()

    const idTempAvan = id.split('-')[0];
    const idTempProy = id.split('-')[1];    

    const history = useHistory() 

    //TRAE AVANCES DE UN PROYECTO
    const {unAvanUser} =UnAvancesUser(idTempAvan) ;    

    //TRAE INFO DE UN PROYECTO
    const { unProys} =ListaUnProy(idTempProy);

    const rolUsuario = getObj.tipo;
    if(rolUsuario!=="Lider"){
        history.push('/' )
    }

    //TRAE FECHA ACTUAL
    const getFechaAct = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            // console.log(`${day}-0${month}-${year}`)
            return (`${year}-0${month}-${day}`)
        } else {
            // console.log(`${day}-${month}-${year}`)
            return (`${year}-${month}-${day}`)
        }
    }

    useEffect(() => {

        if (unAvanUser && unProys) {
            
            setAportes(unAvanUser.avances[0].descripcion)
            setObservaciones(unAvanUser.avances[0].observacion)
            setNombreProy(unProys.proyecto.nombre)
            setIdProy(unAvanUser.avances[0].idProy)
            setNombreTuto(unProys.proyecto.nombreLider)
            setFechaAvan(getFechaAct())
        }
    }, [unAvanUser,unProys])


    
    // AGREGA OBSERVACION A UN AVANCE 
    const [obsAvance] = useMutation(UPDT_OBSERVACION);
    const insObsAvance = async (e) => {
        e.preventDefault();
        
        await obsAvance({
            variables: {
                _id: idTempAvan,
                newObservacion: observaciones,
                
            }
        });
        history.push('/ListAvances/'+getObj._id)
        window.location.reload(); 
    };


   

    return (

        <>
            <NavbarComponent />
            <div className="container">
               
                <div className="row">
                    <div className="col-lg-12">
                        <form>
                            <hr />
                            <div className="card border-dark">
                                <div className="card-header text-white text-center bg-info border-dark">
                                    <h3>Registro de Avance</h3>
                                </div>


                                <div className="card-body text-primary">

                                    <div className="container row text-center">

                                        <h6 className="col card-title ">Nombre del Proyecto</h6>
                                        <h6 className="col card-title ">ID del Proyecto</h6>
                                        <h6 className="col card-title ">Nombre del Tutor</h6>
                                        <h6 className="col card-title ">Fecha de Modificación</h6>

                                    </div>

                                    <div className="container row justify-content-around ">

                                        {/* <h6 className="card-title ">Nombre del Proyecto</h6> */}
                                        <input className="col form-control border-white text-center"
                                            type="text"
                                            placeholder="Nombre del Proyecto"
                                            value={nombreProy}
                                            readOnly
                                        // onChange={(event) => setNombre(event.target.value)}
                                        ></input>

                                        {/* <h6 className="card-title pt-2">ID Proyecto</h6> */}
                                        <input className="col mr-3 form-control border-white text-center"
                                            type="text"
                                            placeholder="ID del Proyecto"
                                            value={idProy}
                                            readOnly
                                        ></input>

                                        {/* <h6 className="card-title pt-2">Nombre del Tutor</h6> */}
                                        <input className="col form-control border-white text-center"
                                            type="text"
                                            placeholder="Nombre del Tutor"
                                            value={nombreTuto}
                                            readOnly
                                        ></input>

                                        {/* <h6 className="card-title pt-2">Fecha de Avance</h6> */}
                                        <input className="col form-control border-white text-center"
                                            type="text"
                                            placeholder="Fecha de Avance"
                                            value={fechaAvan}
                                            readOnly
                                        ></input>


                                    </div>
                                </div>


                            </div>

                        </form>
                    </div>
                </div>
                <hr />

                {/* //SECCION PARA REGISTRAR AVACES Y OBSERVACIONES */}
                <div className="row">
                    <div className="col-lg-12 ">
                        <form>
                            <div className="card border-dark">



                                <div className="card-body text-primary">

                                    <h6 className="card-title ">Aportes:</h6>
                                    <textarea className="form-control border-dark "
                                        rows="8"
                                        type="text"
                                        placeholder="Aportes del Estudiante"
                                        value={aportes}
                                        readOnly
                                    ></textarea>

                                    <h6 className="card-title pt-2">Observaciones:</h6>
                                    <textarea className="form-control border-dark"
                                        rows="3"
                                        type="text"
                                        placeholder="Observaciones del Tutor"
                                        value={observaciones}
                                        onChange={(event) => setObservaciones(event.target.value)}
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-between">

                                    <div className="card-body">
                                        <Link type="button" className="btn btn-secondary border-dark"
                                            to={"/ListAvances/"+getObj._id} >Atras</Link>
                                    </div>

                                    <div className="card-body text-end">
                                        <button type="submit"
                                            className="btn btn-info border-dark text-white"
                                            onClick={insObsAvance}>
                                            Agregar
                                        </button>

                                    </div>


                                </div>

                            </div>

                        </form>
                        <hr />
                    </div>

                </div>
            </div>
        </>
    )
}






