
import NavbarComponent from "../shared/components/NavbarComponent";
import { useMutation } from '@apollo/client';
import {
    INSERTA_INSCR, UPDT_ESTA_INSC, UPDT_PROY_ESTADO, UPDT_PROY_FASE,
    UPDT_PROY_ADMIN, UPDT_PROY_FASE_ESTADO, DEL_INSC_PROY
} from '../../BdMongoConf/graphql-operations';
import { ListaProyectos, ListaInscEstudiante, ListaProyectosLider, InscriProys } from '../../BdMongoConf/configBD';
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'



export const ListProjects = () => {

    const [seleCurso, setSeleCurso] = useState("");

    const getObj = JSON.parse(sessionStorage.getItem("user"));
    let tipoUsuario = getObj.tipo;
    const { id } = useParams();
    let newData = [];
    let newDataNoIns = [];
    // const [estEstudiante, setEstEstudiante] = useState('')

    //TRAE USUARIOS DE LA BD
    const { loading, data } = ListaProyectos();
    //TRAe LOS PROYECTOS ASOCIADOS A UN LIDER
    const { load9, proyecsLider } = ListaProyectosLider(id);
    //TRAe LAS INSCRIPCIONES A CURSOS DEL LIDER
    const { load3, InsPorProy } = InscriProys(seleCurso);
    // console.log(data.proyectos.length);

    //--------------------------------------ESTUDUANTE-----------------------------------------------
    //LISTA INSCRIPCION DEL ESTUDIANTE
    const { ListInsEstu } = ListaInscEstudiante(id);
    if (tipoUsuario === "Estudiante") {



        if (ListInsEstu) {

            if (ListInsEstu.inscripcions.length > 0 && data) {
                // console.log(data);
                for (let proyectos of data.proyectos) {
                    let swt1 = 0;
                    for (let insc of ListInsEstu.inscripcions) {
                        if (proyectos._id === insc.idProyecto) {
                            // console.log(proyectos+insc.estadoInscrip);
                            // console.log(insc.estadoInscrip);
                            newData.push(proyectos)
                        } else {
                            swt1++;
                        }
                        // console.log(proyectos.estado);
                        if (swt1 === ListInsEstu.inscripcions.length && proyectos.estado !== "Inactivo") {
                            newDataNoIns.push(proyectos)
                        }
                    }
                }
            } else {
                if (data) {
                    for (let proyectos of data.proyectos) {
                        if (proyectos.estado !== "Inactivo") {
                            newDataNoIns.push(proyectos)
                        }
                    }
                }

            }
        }

    }

    //REGISTRA UN ESTUDIANTE A UN PROYECTO
    const [setInscripcion] = useMutation(INSERTA_INSCR)
    const setOneInsc = async (e, idProy) => {
        // e.preventDefault();
        // console.log(idProy);
        await setInscripcion({

            variables: {
                newIdEstu: id,
                newIdProy: idProy,
                newEstadoInsc: 'Pendiente',
                newFechaIng: new Date(),
                newFechaEgr: new Date()
            }
        })
        window.location.reload();
    }

    //--------------------------------------LIDER-----------------------------------------------
    useEffect(() => {
        if (proyecsLider) {
            if (proyecsLider.proyectos.length && tipoUsuario === "Lider") {

                setSeleCurso(proyecsLider.proyectos[0]._id)
            }
        }
    }, [proyecsLider, tipoUsuario])


    //MODIFICA EL ESTADO DEL ESTUDIANTE
    const [modEstadoInsc] = useMutation(UPDT_ESTA_INSC)
    const modOneEstadoInsc = async (e, idEstu) => {

        await modEstadoInsc({

            variables: {
                _id: idEstu,
                newEstado: e.target.value,
                newFechaIni: new Date()
            }
        })
    }




    const refresInscrito = (e) => {

        const tempIdProy = e.target.value.split("/")[1];
        setSeleCurso(tempIdProy)
        // console.log(tempIdProy);  

    }


    //--------------------------------------ADMINISTRADOR-----------------------------------------------
    //MODIFICA EL ESTADO DEL PROYECTO
    const [upEstadoProyecs] = useMutation(UPDT_PROY_ESTADO);
    const [upGenAdmin] = useMutation(UPDT_PROY_ADMIN);
    const [delInscProy] = useMutation(DEL_INSC_PROY);

    const upEstadoProy = async (e, idPr, fasePr) => {

        if (e.target.value === "Activo" && fasePr === "null") {
            // console.log(fasePr);
            await upGenAdmin({
                variables: {
                    _id: idPr,
                    newEstado: e.target.value,
                    newFase: "Iniciado",
                    newFechaIng: new Date()
                }
            })
            // window.location.reload();

        } else if (e.target.value === "Inactivo") {

            await upEstadoProyecs({
                variables: {
                    _id: idPr,
                    newEstado: e.target.value
                }
            })

            //ELIMINA INSCRIPCIONES CUANDO ENVIAN ESTADO INACTIVO
            await delInscProy({
                variables: {
                    newIdProy: idPr
                }
            })


        } else {

            await upEstadoProyecs({
                variables: {
                    _id: idPr,
                    newEstado: e.target.value
                }
            })
            window.location.reload();
        }



        window.location.reload();
    }


    //MODIFICA FASE DEL PROYECTO
    const [upFaseProyecs] = useMutation(UPDT_PROY_FASE)
    const [upFaseEstadoProyecs] = useMutation(UPDT_PROY_FASE_ESTADO)

    const upFaseProy = async (e, idPr) => {

        if (e.target.value === "Terminado") {
            await upFaseEstadoProyecs({
                variables: {
                    _id: idPr,
                    newEstado: "Inactivo",
                    newFase: e.target.value
                }
            })
        } else {
            await upFaseProyecs({

                variables: {
                    _id: idPr,
                    newFase: e.target.value
                }
            })
        }



        window.location.reload();


    }

    return (

        <>
            <NavbarComponent />
            <div className="container mt-3 ">


                <div>{loading ? <span>Loading...</span> :
                    <div>
                        {tipoUsuario === "Lider" ?
                            // LIDER
                            <div>

                                <div>
                                    <h4 >Proyectos</h4>
                                    <span>
                                        {
                                            load9 ? <span>Loading9...</span> :
                                                <div>{proyecsLider.proyectos.length > 0 ?
                                                    <select onChange={refresInscrito} className="form-select text-secondary border-dark" >
                                                        {
                                                            proyecsLider.proyectos.map((prod, index) => (
                                                                <option key={index} value={prod.nombre + "/" + prod._id}>{prod.estado === "Activo" ? prod.nombre + " / IDproyecto:" + prod._id : prod.nombre + " (INACTIVO)"}</option>
                                                            )
                                                            )
                                                        }
                                                    </select>
                                                    :
                                                    <h5 className="text-center">NO TIENE PROYECTOS ACTIVOS</h5>
                                                }
                                                </div>
                                        }
                                    </span>
                                    <hr />
                                    {load3 ? <span>Loading3...</span> :
                                        <div>
                                            {InsPorProy.inscripcions.length !== 0 ?
                                                <div>
                                                    <h4>Inscritos</h4>
                                                    <table className="table table-striped table-bordered 
                                               align-middle border-dark">
                                                        <thead className="table-dark">
                                                            <tr className="text-center">
                                                                {/* <th scope="col">#</th> */}
                                                                <th scope="col">ID Inscipción</th>
                                                                <th scope="col">Id de Estudiante</th>
                                                                <th scope="col">Estado Inscripción</th>
                                                                <th scope="col">Fecha Ingreso</th>
                                                                <th scope="col">Fecha Egreso</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                InsPorProy.inscripcions.map((prod, index) => (

                                                                    <tr key={prod._id} className="text-center">
                                                                        {/* <th scope="row" >{index + 1}</th> */}
                                                                        <th scope="row" >{prod._id}</th>
                                                                        <td>{prod.idEstudiante}</td>
                                                                        <td>
                                                                            <select value={prod.estadoInscrip} onChange={(e) => modOneEstadoInsc(e, prod._id)} className="form-select text-secondary border-dark" >
                                                                                <option value="Aceptada">Aceptada</option>
                                                                                <option value="Rechazada">Rechazada</option>
                                                                                <option value="Pendiente">Pendiente</option>
                                                                            </select>

                                                                        </td>
                                                                        <td>{prod.fechaIng.substring(0, 10)}</td>
                                                                        <td>{prod.fechaEgr.substring(0, 10)}</td>



                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                :
                                                <h5 className="text-center">AUN NO HAY INSCRITOS</h5>
                                            }
                                        </div>

                                    }
                                </div>
                            </div>


                            :
                            <div>
                                {/* ESTUDIANTE */}
                                {tipoUsuario === "Estudiante" ?
                                <div>{data.proyectos.length>0 ?
                                    <div>
                                        <h2>Inscritos</h2>
                                        <table className="table table-striped table-bordered 
                                               align-middle border-dark">

                                            <thead className="table-dark">
                                                <tr className="text-center">
                                                    {/* <th scope="col">#</th> */}
                                                    <th scope="col">#</th>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Id de Proyecto</th>
                                                    <th scope="col">Fecha Inicio</th>
                                                    <th scope="col">Nombre del Lider</th>
                                                    <th scope="col">Agregar Avance</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newData.map((prod, index) => (

                                                        <tr key={prod._id} className="text-center">
                                                            {/* <th scope="row" >{index + 1}</th> */}
                                                            <th scope="row" >{index + 1}</th>
                                                            <td>{prod.nombre}</td>
                                                            <td>{prod._id}</td>
                                                            <td>{prod.fechaIni.substring(0, 10)}</td>
                                                            <td>{prod.nombreLider}</td>
                                                            <td >{ListInsEstu.inscripcions[index].estadoInscrip === "Aceptada" ?

                                                                <Link type="button" className="btn btn-primary border-dark"
                                                                    to={'/RegiAvances/' + id + "-" + prod._id}>
                                                                    Agregar
                                                                </Link>
                                                                :
                                                                <div>{ListInsEstu.inscripcions[index].estadoInscrip === "Rechazada" ?
                                                                    <span>Rechazada</span>
                                                                    :
                                                                    <span>En espera de Aceptación</span>
                                                                }
                                                                </div>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>


                                        <br />
                                        <h2>No Inscritos</h2>
                                        <table className="table table-striped table-bordered 
                                               align-middle border-dark">

                                            <thead className="table-dark">
                                                <tr className="text-center">
                                                    {/* <th scope="col">#</th> */}
                                                    <th scope="col">#</th>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Id de Proyecto</th>
                                                    <th scope="col">Fecha Inicio</th>
                                                    <th scope="col">Nombre del Lider</th>
                                                    <th scope="col">Registrarse</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newDataNoIns.map((prod, index) => (

                                                        <tr key={prod._id} className="text-center">
                                                            {/* <th scope="row" >{index + 1}</th> */}
                                                            <th scope="row" >{index + 1}</th>
                                                            <td>{prod.nombre}</td>
                                                            <td>{prod._id}</td>
                                                            <td>{prod.fechaIni.substring(0, 10)}</td>
                                                            <td>{prod.nombreLider}</td>
                                                            <td >
                                                                <div className="btn-group" role="group" aria-label="Borrar-Modificar">

                                                                    <button type="button" className="btn btn-primary border-dark"

                                                                        onClick={(e) => setOneInsc(e, prod._id)}
                                                                    >Inscribir

                                                                    </button>


                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <h5 className="text-center">AUN NO HAY PROYECTOS</h5>
                                         }
                                    </div>
                                    :
                                    // ADMINISTRADOR
                                    <div>{data.proyectos.length>0 ?

                                        <div>
                                            <h4>Proyectos</h4>
                                            <hr />
                                            <table className="table table-striped table-bordered 
                                               align-middle border-dark">
                                                <thead className="table-dark">
                                                    <tr className="text-center">
                                                        {/* <th scope="col">#</th> */}
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Id Proyecto</th>
                                                        <th scope="col">Lider</th>
                                                        <th scope="col">Fase</th>
                                                        <th scope="col">Estado</th>
                                                        <th scope="col">Fecha de Inicio</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        data.proyectos.map((prod, index) => (

                                                            <tr key={prod._id} className="text-center">
                                                                {/* <th scope="row" >{index + 1}</th> */}
                                                                <th scope="row" >{prod.nombre}</th>
                                                                <td>{prod._id}</td>
                                                                <td>{prod.nombreLider}</td>
                                                                <td>{prod.fase === "Terminado" ?
                                                                    <select disabled value={prod.fase} onChange={(e) => upFaseProy(e, prod._id)} className="form-select text-secondary border-dark" >
                                                                        <option value="null">null</option>
                                                                        <option value="Iniciado">Iniciado</option>
                                                                        <option value="Desarrollo">Desarrollo</option>
                                                                        <option value="Terminado">Terminado</option>
                                                                    </select>
                                                                    :
                                                                    <select value={prod.fase} onChange={(e) => upFaseProy(e, prod._id)} className="form-select text-secondary border-dark" >
                                                                        <option value="null">null</option>
                                                                        <option value="Iniciado">Iniciado</option>
                                                                        <option value="Desarrollo">Desarrollo</option>
                                                                        <option value="Terminado">Terminado</option>
                                                                    </select>
                                                                }
                                                                </td>
                                                                <td>{prod.fase === "Terminado" ?
                                                                    <select disabled value={prod.estado} onChange={(e) => upEstadoProy(e, prod._id, prod.fase)} className="form-select text-secondary border-dark" >
                                                                        <option value="Activo">Activo</option>
                                                                        <option value="Inactivo">Inactivo</option>
                                                                    </select>
                                                                    :
                                                                    <select value={prod.estado} onChange={(e) => upEstadoProy(e, prod._id, prod.fase)} className="form-select text-secondary border-dark" >
                                                                        <option value="Activo">Activo</option>
                                                                        <option value="Inactivo">Inactivo</option>
                                                                    </select>
                                                                }
                                                                </td>
                                                                <td>{prod.fechaIni.substring(0, 10)}</td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                         :
                                         <h5 className="text-center">AUN NO HAY PROYECTOS INSCRITOS</h5>
                                        }
                                    </div>
                                   
                                }
                            </div>
                        }
                    </div>
                }
                </div>
            </div>
        </>
    )
}


