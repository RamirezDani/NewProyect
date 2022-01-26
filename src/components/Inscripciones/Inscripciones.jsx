import React, { useState, useEffect } from 'react'
import NavbarComponent from "../shared/components/NavbarComponent";
import { useMutation } from '@apollo/client';
import { UPDT_ESTA_INSC } from '../../BdMongoConf/graphql-operations';
import { NumProys, InscriProys } from '../../BdMongoConf/configBD';


export const Inscripciones = () => {

    const [idCode, setIdCode] = useState([])
    // const [nuevaFechaIns, setnuevaFechaIns] = useState(Date)
    
    // CARGA LA BD de las inscripciones
    // const { loading, data } = ListaInscripci();

    //TRAE LOS ID DE LOS PROYECTOS DEL USUARIO ASOCIADO
    const { temporal, load2 } = NumProys('Kata Gomez')//SE DEBE TRAER ESTE USUARIO DE LA URL O ALGO

    //INICIALIZA LA TABALA CON LOS INSCRITOS POR MATERIA
    useEffect(() => {
        if (temporal) {
            setIdCode(temporal.proyectos[0]._id);
        }
    }, [temporal])

    // TRAE DE LA BD LOS USUARIOS INCRITOS AL CODIGO DEL CURSO
    const { InsPorProy, load3 } = InscriProys(idCode);
    


    // ACTUALIZA EL ESTADO AL DE LA SELECCION DEL USUARIO
    const selectProyect = (ent) => {
        setIdCode(ent)
    }

    // if(data){

    //     let firstValue = data.inscripcions[0].idProyecto;
    //     let numProy = [];
    //     numProy.push(firstValue);
    //     console.log(firstValue);

    //     for (let datos of data.inscripcions)  {
    //         console.log(datos.idProyecto.indexOf(firstValue));
    //         const idTemp = "61c0ed94d42f78a900a48e62"
    //         if(datos.idProyecto.indexOf(idTemp)===-1){

    //             console.log(datos.idProyecto);
    //             numProy.push(datos.idProyecto);
    //             console.log(numProy);
    //         }
    //     }
    // }




    //  SOBRESCRIBE LA BD
    const [modEstInsc] = useMutation(UPDT_ESTA_INSC)
    const modOneEstGenInsc = async (id, e, fechIng) => {
        
        
        if(e!=='Aceptada'){                                      
        // console.log("NO ACEPTADA");
        await modEstInsc({
            
            variables: {
                _id: id,
                newEstado: e,
                newFechaIni: new Date(fechIng)
            }
        });
        }else{
            // console.log("ACEPTADA");
            await modEstInsc({
            
                variables: {
                    _id: id,
                    newEstado: e,
                    newFechaIni: new Date()
                }
            });
        }
    }


    return (

        <>
            <NavbarComponent />
            <div className="container mt-3 ">
                <div>


                    <form>
                        <span>
                            {load2 ? <span>Loading2...</span> :
                                <select onChange={(e) => {selectProyect(e.target.value) }} className="form-select text-secondary border-dark" >

                                    {
                                        temporal.proyectos.map((prod, index) => (
                                            <option key={index} value={prod._id}>Proyecto: {prod.nombre} / ID del Proyecto: {prod._id}</option>
                                        )
                                        )

                                    }

                                </select>}
                        </span>
                        <hr />
                        {load3 ? <span>Loading3...</span> :
                            <table className="table table-striped table-bordered 
                                           align-middle border-dark">

                                <thead className="table-dark">
                                    <tr className="text-center">
                                        {/* <th scope="col">#</th> */}
                                        <th scope="col">ID Inscripció</th>
                                        <th scope="col">ID Estudiante</th>
                                        <th scope="col">Estado Inscripción</th>
                                        <th scope="col">Fecha de Ingreso</th>
                                        <th scope="col">Fecha de Egreso</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        InsPorProy.inscripcions.map((prod, index) => (

                                            <tr key={prod._id} className="text-center">
                                                {/* <th scope="row" >{index + 1}</th> */}
                                                <th scope="row" >{prod._id}</th>
                                                <td >{prod.idEstudiante}</td>
                                                <td>
                                                    <select value={prod.estadoInscrip} onChange={(e) => modOneEstGenInsc(prod._id, e.target.value,prod.fechaIng)}
                                                        className="form-select text-secondary border-dark" >
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Aceptada">Aceptada</option>
                                                        <option value="Rechazada">Rechazada</option>
                                                    </select>
                                                </td>
                                                <td >{prod.fechaIng.substring(0, 10)}</td>
                                                <td >{prod.fechaEgr.substring(0, 10)}</td>

                                            </tr>
                                        ))

                                    }
                                </tbody>



                            </table>}

                    </form>
                
                </div>
            </div>
        </>
    )
}
